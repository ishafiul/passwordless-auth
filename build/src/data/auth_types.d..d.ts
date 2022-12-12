import { UserType } from "./auth_enums";
export type AppInfo = {
    versionName: string;
    versionCode: string;
};
export type UserLocation = {
    coordinates: [];
};
export type Device = {
    userType: UserType;
    deviceType: string;
    osVersionCode?: string;
    osVersionRelease?: string;
    deviceBrand?: string;
    deviceModel?: string;
    deviceManufacturer?: string;
    appInfo: AppInfo;
    location?: UserLocation;
    ipAddress: string;
};
export type OtpReq = {
    email: string;
    deviceUuid: string;
};
