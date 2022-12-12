import { Response } from "express";
export declare function successResponse(message: string, DATA: any, res: Response): void;
export declare function createdResponse(message: string, DATA: any | null, res: Response): void;
export declare function failureResponse(message: string, DATA: any, res: Response): void;
export declare function badRequest(message: string, res: Response): void;
export declare function mongoError(err: any, res: Response): void;
export declare function somethingWrong(err: any, res: Response): void;
