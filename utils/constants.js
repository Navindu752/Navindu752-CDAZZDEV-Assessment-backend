

//error messages
const EMAIL_ALREADY_EXISTS = 'This email already has an account!';
const PASSWORD_IS_REQUIRED = 'Password is required!';
const YOU_ARE_NOT_AUTHORIZED = "You are not authorized!"
const JWT_EXPIRED = "jwt expired!";
const PLEASE_INSERT_EMAIL_AND_PASSWORD = 'Please enter email and password!';
const EMAIL_NOT_FOUND = 'Email not found!';
const LOGIN_SUCCESS = "Login successful"
const INVALID_PASSWORD = 'Invalid password!';

// success messages
const USER_DETAILS_FETCH_SUCCESS = "User details fetched successfully";
const USER_CREATED_SUCCESSFULLY = "User created successfully!";

// Regex validation
const EMAIL_REGEX_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_VALIDATION = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/

module.exports = {
    EMAIL_ALREADY_EXISTS,
    PASSWORD_IS_REQUIRED,
    YOU_ARE_NOT_AUTHORIZED,
    JWT_EXPIRED,
    PLEASE_INSERT_EMAIL_AND_PASSWORD,
    EMAIL_NOT_FOUND,
    LOGIN_SUCCESS,
    INVALID_PASSWORD,
    USER_DETAILS_FETCH_SUCCESS,
    USER_CREATED_SUCCESSFULLY,
    EMAIL_REGEX_VALIDATION,
    PASSWORD_VALIDATION
}
