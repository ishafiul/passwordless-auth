import {UserType} from "../user/models";


export type AppInfo = {
    versionName: string,
    versionCode: string,
}

export type UserLocation = {
    coordinates: [],
}

export type Device = {
    userType: UserType,
    deviceType: string,
    osVersionCode?: string,
    osVersionRelease?: string,
    deviceBrand?: string,
    deviceModel?: string,
    deviceManufacturer?: string,
    appInfo: AppInfo,
    location?: UserLocation,
    ipAddress: string
};

export type IsoDateString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;


export const enum HttpStatus {
    SUCCESS = "SUCCESS",
    CREATED = "CREATED",
    ERROR = "ERROR",
    FAILURE = "FAILURE"
}

export enum HttpStatusCode {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500
}


