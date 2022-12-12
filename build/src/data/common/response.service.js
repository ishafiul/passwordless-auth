"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.somethingWrong = exports.mongoError = exports.badRequest = exports.failureResponse = exports.createdResponse = exports.successResponse = void 0;
const models_1 = require("./models");
function successResponse(message, DATA, res) {
    res.status(models_1.HttpStatusCode.SUCCESS).json({
        STATUS: "SUCCESS",
        MESSAGE: message,
        DATA
    });
}
exports.successResponse = successResponse;
function createdResponse(message, DATA, res) {
    res.status(models_1.HttpStatusCode.CREATED).json({
        STATUS: "CREATED",
        MESSAGE: message,
        DATA
    });
}
exports.createdResponse = createdResponse;
function failureResponse(message, DATA, res) {
    res.status(models_1.HttpStatusCode.SUCCESS).json({
        STATUS: "FAILURE",
        MESSAGE: message,
        DATA
    });
}
exports.failureResponse = failureResponse;
function badRequest(message, res) {
    res.status(models_1.HttpStatusCode.BAD_REQUEST).json({
        STATUS: "FAILURE",
        MESSAGE: message,
        DATA: {}
    });
}
exports.badRequest = badRequest;
function mongoError(err, res) {
    res.status(models_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        STATUS: "FAILURE",
        MESSAGE: 'MongoDB error',
        DATA: err
    });
}
exports.mongoError = mongoError;
function somethingWrong(err, res) {
    res.status(models_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        STATUS: "ERROR",
        MESSAGE: `Something Wrong! ${err.message}`,
        DATA: err
    });
}
exports.somethingWrong = somethingWrong;
//# sourceMappingURL=response.service.js.map