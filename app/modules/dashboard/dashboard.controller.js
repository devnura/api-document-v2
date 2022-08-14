const db = require("../../../infrastructure/database/knex");

const helper = require("../../helpers/helper");
const winston = require("../../helpers/winston.logger");
const model = require("./dashboard.model");
const moment = require("moment");
moment.locale("id");

var result = {};
var uniqueCode;

exports.findAll = async (req, res) => {
    try {

        uniqueCode = helper.getUniqueCode()

        // log info
        winston.logger.info(
            `${uniqueCode} REQUEST get all data : ${JSON.stringify(req.body)}`
        );
        // log debug
        winston.logger.debug(`${uniqueCode} getting data...`);

        // check data login
        let user = await model.getUsers(db)
        let document = await model.findAllDocument(db)
        let documentDetail = await model.findAllDocumentDetail(db)
        let group = await model.getGroupList(db)
        // log debug
        // winston.logger.debug(`${uniqueCode} result users : ${JSON.stringify(getUsers)}`);

        result = {
            code: "00",
            message: "Success.",
            data: {
                user,
                document,
                documentDetail,
                group
            }
        };

        // log info
        winston.logger.info(
            `${uniqueCode} RESPONSE get users : ${JSON.stringify(result)}`
        );

        return res.status(200).json(result);

    } catch (error) {
        // create log
        winston.logger.error(
            `500 internal server error - backend server | ${error.message}`
        );

        return res.status(200).json({
            code: "500",
            message: process.env.NODE_ENV != "production" ?
                error.message : "500 internal server error - backend server.",
            data: {},
        });
    }
}
