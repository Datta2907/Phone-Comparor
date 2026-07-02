import User, { IUser } from "../models/User";
import { AppError } from "../utils/appError";
import { HTTP_STATUS, ROLES } from "../utils/constants";

export const getAllUsers = async () => {
    const allUsers = await User.find({ role: ROLES.CLIENT });
    return { data: allUsers }
};

export const addUser = async (data: IUser) => {
    const newUser = new User(data);
    const savedUser = await newUser.save();
    return { data: savedUser }
};

export const getUserById = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return { data: user }
}

export const updateUser = async (id: string, data: Partial<IUser>) => {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
        throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return { data: updatedUser }
}

export const deleteUser = async (id: string) => {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return { data: deletedUser }
}

export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return { data: user }
}

export const getUsersByRole = async (role: string) => {
    const users = await User.find({ role });
    return { data: users }
}

export const getUsersByStatus = async (status: string) => {
    const users = await User.find({ status });
    return { data: users }
}

export const getUsersByFilter = async (filter: Partial<IUser>) => {
    const users = await User.aggregate([
        { $match: filter }
    ]);
    return { data: users }
}