import UserSchema from "./schema";
import User from "./schema";
import {CallbackError} from "mongoose";
import {getUsername} from "../../utils/utils";
import {UserType} from "./models";

export default class UserService {
    public findUserByEmail(email: string, callback?: (error: CallbackError, result: any) => any) {
        const gg = UserSchema.findOne({
            email
        }, callback).clone();
        return gg
    }

    public async createUser(email: string, callback?: (error: CallbackError, result: any) => any) {
        const newUser = new User({
            userName: getUsername(email),
            email,
            userType: UserType.USER,
        })
        await newUser.save(callback!);
    }
}