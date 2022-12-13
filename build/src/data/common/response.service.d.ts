import { Response } from "express";
export declare function successResponse(message: string, data: any, res: Response): void;
export declare function createdResponse(message: string, data: any | null, res: Response): void;
export declare function unauthorizedResponse(message: string, res: Response): void;
export declare function failureResponse(message: string, data: any, res: Response): void;
export declare function badRequest(message: string, res: Response): void;
export declare function mongoError(err: any, res: Response): void;
export declare function somethingWrong(err: any, res: Response): void;
