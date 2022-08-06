const {
    body,
    validationResult
} = require('express-validator')

const helper = require('../../helpers/helper')
const winston = require("../../helpers/winston.logger")

// VALIDATION
const rules = (method) => {
    switch (method) {
        case "login":
            return [
                body('email').notEmpty().withMessage('email is required!').isEmail().withMessage("Invalid Email format").escape().trim(),
                body('password').notEmpty().withMessage('password is required').escape().trim()
            ]

        case "refreshToken":
            return [
                body("refresh_token").notEmpty().withMessage('refresh_token is required!')
            ]
        default:
            break;
    }
};

const validate = (req, res, next) => {

    req.requestCode = helper.getUniqueCode()

    // log info
    winston.logger.info(
        `${req.requestCode} REQUEST : ${JSON.stringify(req.body)}`
    );
      
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let result = {
            status: '98',
            message: "Bad Request",
            data: errors.array()
        }

        winston.logger.info(
            `${req.requestCode} RESPONSE : ${JSON.stringify(result)}`
        );

        return res.status(400).json(result);
    }

    req = req.body
    next()

}

module.exports = {
    rules,
    validate
}