import User, { IUser } from "../models/User";
import { ROLES } from "../utils/constants";

export const getAllUsers = async () => {
    const allUsers = await User.find({ role: ROLES.CLIENT });
    return { data: allUsers }
};

export const addUser = async (data: IUser) => {
    const allUsers = await User.find({ role: ROLES.CLIENT });
    return { data: allUsers }
};
