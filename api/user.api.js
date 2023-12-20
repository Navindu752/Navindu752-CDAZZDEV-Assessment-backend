const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PLEASE_INSERT_EMAIL_AND_PASSWORD, EMAIL_NOT_FOUND, LOGIN_SUCCESS, INVALID_PASSWORD, USER_DETAILS_FETCH_SUCCESS, EMAIL_ALREADY_EXISTS, PASSWORD_IS_REQUIRED, USER_CREATED_SUCCESSFULLY } = require('../utils/constants');
const mongoose = require("mongoose");
require('dotenv').config(); // to load .env file content

async function loginUser(payload) {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { email, password } = payload;
        // Check if email and password are provided
        if (!email || !password) {
            return { message: PLEASE_INSERT_EMAIL_AND_PASSWORD, status: 400 };
        }
        // Find the user with the provided email
        const savedUser = await User.findOne({ email: email }).session(session);
        // Check if the user exists
        if (!savedUser) {
            return { message: EMAIL_NOT_FOUND, status: 404 };
        }
        // Compare the provided password with the saved user's password
        const doMatch = await bcrypt.compare(password, savedUser.password);
        if (doMatch) {
            // Generate an access token with user information
            const accessToken = jwt.sign({
                id: savedUser._id,
            }, process.env.JWT_KEY, { expiresIn: '1d' });
            // Update the user's token in the database
            await User.updateOne({ _id: savedUser._id }, { accessToken: accessToken }).session(session);
            const returnUser = await User.findOne({ _id: savedUser._id }).session(session);
            // Return the login success message and user data
            await session.commitTransaction();
            return ({
                message: LOGIN_SUCCESS,
                data: {
                    user: returnUser,
                    token: returnUser.accessToken,
                },
                status: 200
            });
        } else {
            return { message: INVALID_PASSWORD, status: 403 };
        }
    } catch (error) {
        console.log(error); // do-not remove
        await session.abortTransaction();
        return { status: 400, message: err };
    } finally {
        await session.endSession();
    }
}

async function createNewUser(payload) {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // Check if the user already exists
        const result = await User.findOne({ email: { $regex: payload.email, $options: 'i' } }).session(session);
        if (result) {
            return { message: EMAIL_ALREADY_EXISTS, status: 400 };
        } else {
            if (payload.password) {
                // Hash the password
                const hashedPassword = await bcrypt.hash(payload.password, 12)
                const data = { ...payload, password: hashedPassword }

                // Create a new user instance
                const newUser = new User(data);

                // Save the new user to the database
                await newUser.save({ session });
                await session.commitTransaction();
                return { message: USER_CREATED_SUCCESSFULLY, status: 200 };
            }
            else {
                return { message: PASSWORD_IS_REQUIRED, status: 400 };
            }
        }
    } catch (error) {
        console.log(error); // do-not remove

        // If there is an error, abort the transaction
        await session.abortTransaction();
        return { status: 400, message: err };
    } finally {
        // End the session
        await session.endSession();
    }
}

async function logoutUser(id) {
    try {
        // Update the user document by setting the access token to null
        const doc = await User.updateOne({ _id: id }, { accessToken: null });
        return doc;
    } catch (error) {
        return error;
    }
}

async function getUserDetails(user) {
    try {
        // Find the user by id and retrieve only the email and userName fields
        const getUser = await User.findOne({ _id: user.id }, 'email userName');
        
        // Return the success response with the user details
        return { message: USER_DETAILS_FETCH_SUCCESS, data: getUser, status: 200 };
    } catch (error) {
        // Log the error
        console.log(error);

        // Return the error response
        return { status: 400, message: err };
    }
}


module.exports = { loginUser, createNewUser, logoutUser, getUserDetails }
