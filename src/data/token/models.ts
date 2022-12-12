export type TokenData = {
    userId: string,
    email: string,
    deviceUuId: string,
}

export type SaveToken = {
    userId: string,
    email: string,
    deviceUuId: string,
    accessToken: string,
    refreshToken: string,
}

export type RefreshToken = {
    refreshToken: string,
    deviceUuId: string,
}