import { CallbackError } from "mongoose";
export default class UserService {
    findUserByEmail(email: string, callback: (error: CallbackError, result: any) => any): void;
    createUser(email: string, callback: (error: CallbackError, result: any) => any): Promise<void>;
}
