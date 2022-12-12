export type UserData = {
    _id?: string,
    email: string,
    userName: string,
    password: string,
}

export const enum UserType {
    ADMIN = "ADMIN",
    USER = "USER",
}