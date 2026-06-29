import User from '../models/User';
import bcrypt from 'bcryptjs';
import { IRegisterRequest } from '../interfaces/common';
import { AppError } from '../utils/appError';
import { HTTP_STATUS } from '../utils/constants';
import { generateAuthTokens } from '../utils/tokenUtils';

export const registerUser = async (userData: IRegisterRequest) => {
    const { name, username, email, password } = userData;

    const existingUser = await User.findOne({ $or: [{ email, username }] });
    if (existingUser) {
        throw new AppError(
            'Email address has been taken.',
            HTTP_STATUS.UNAUTHORIZED,
            { emailAttempted: email }
        );
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
    });

    newUser.password = undefined;
    const { accessToken, refreshToken } = generateAuthTokens(newUser._id)
    return { user: newUser, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new AppError(
            'Invalid credentials',
            HTTP_STATUS.UNAUTHORIZED,
            { emailAttempted: email }
        );
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
        throw new AppError(
            'Invalid credentials',
            HTTP_STATUS.UNAUTHORIZED,
            { emailAttempted: email }
        );
    }

    user.password = undefined;
    const { accessToken, refreshToken } = generateAuthTokens(user._id)
    return { user, accessToken, refreshToken };
};


export const updatePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    const user = await User.findById(userId).select('+password');
    if (!user) {
        throw new AppError(
            'User not found',
            HTTP_STATUS.UNAUTHORIZED,
        );
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password as string);
    if (!isMatch) {
        throw new AppError(
            'Invalid Credentials',
            HTTP_STATUS.UNAUTHORIZED
        );
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
};