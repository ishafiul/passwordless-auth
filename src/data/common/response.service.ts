import {Response} from "express";
import {HttpStatus, HttpStatusCode} from "./models";

export function successResponse(message: string, data: any, res: Response) {
    res.status(HttpStatusCode.SUCCESS).json({
        status: HttpStatus.SUCCESS,
        message,
        data
    });
}

export function createdResponse(message: string, data: any | null, res: Response) {
    res.status(HttpStatusCode.CREATED).json({
        status: HttpStatus.CREATED,
        message,
        data
    });
}

export function unauthorizedResponse(message: string,res: Response) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
        status: HttpStatus.FAILURE,
        message,
    });
}
export function failureResponse(message: string, data: any, res: Response) {
    res.status(HttpStatusCode.SUCCESS).json({
        status: HttpStatus.FAILURE,
        message,
        data
    });
}

export function badRequest(message: string, res: Response) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
        status: HttpStatus.FAILURE,
        message,
        data: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.FAILURE,
        message: 'MongoDB error',
        data: err
    });
}

export function somethingWrong(err: any, res: Response) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.ERROR,
        message: `Something Wrong! ${err.message}`,
        data: err
    });
}