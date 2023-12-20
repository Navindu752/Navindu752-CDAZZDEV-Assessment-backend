const Joi = require('joi');
const { EMAIL_REGEX_VALIDATION, PASSWORD_VALIDATION } = require('../constants');

const userSchema = (data) => {
    Schema = Joi.object({
        userName : Joi.string().required(),
        email: Joi.string().trim().lowercase().pattern(EMAIL_REGEX_VALIDATION).required(),
        password: Joi.string().pattern(PASSWORD_VALIDATION).required(),
    }).unknown();

    return Schema.validate(data);
};

module.exports = { userSchema };