"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.somethingWrong = exports.mongoError = exports.badRequest = exports.failureResponse = exports.unauthorizedResponse = exports.createdResponse = exports.successResponse = void 0;
const models_1 = require("./models");
function successResponse(message, data, res) {
    res.status(models_1.HttpStatusCode.SUCCESS).json({
        status: "SUCCESS",
        message,
        data
    });
}
exports.successResponse = successResponse;
function createdResponse(message, data, res) {
    res.status(models_1.HttpStatusCode.CREATED).json({
        status: "CREATED",
        message,
        data
    });
}
exports.createdResponse = createdResponse;
function unauthorizedResponse(message, res) {
    res.status(models_1.HttpStatusCode.UNAUTHORIZED).json({
        status: "FAILURE",
        message,
    });
}
exports.unauthorizedResponse = unauthorizedResponse;
function failureResponse(message, data, res) {
    res.status(models_1.HttpStatusCode.SUCCESS).json({
        status: "FAILURE",
        message,
        data
    });
}
exports.failureResponse = failureResponse;
function badRequest(message, res) {
    res.status(models_1.HttpStatusCode.BAD_REQUEST).json({
        status: "FAILURE",
        message,
        data: {}
    });
}
exports.badRequest = badRequest;
function mongoError(err, res) {
    res.status(models_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        status: "FAILURE",
        message: 'MongoDB error',
        data: err
    });
}
exports.mongoError = mongoError;
function somethingWrong(err, res) {
    res.status(models_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        status: "ERROR",
        message: `Something Wrong! ${err.message}`,
        data: err
    });
}
exports.somethingWrong = somethingWrong;
//# sourceMappingURL=response.service.js.map