import Phone, { IPhone } from '../models/Phone';
import User from '../models/User';
import { AppError } from '../utils/appError';
import { HTTP_STATUS, ROLES } from '../utils/constants';

export const fetchAllPhones = async () => {
    const phones = await Phone.find({});
    return { data: phones }
}

export const getPhone = async (phoneId: string) => {
    const device = await Phone.findById(phoneId);
    if (!device) {
        throw new AppError("Device Deleted or Not Found", HTTP_STATUS.NOT_FOUND)
    }
    return { data: device }
};

export const createPhone = async (userId: string, data: IPhone) => {
    const device = await Phone.findOne({ name: data.name });
    if (device) {
        throw new AppError("Name is taken !", HTTP_STATUS.FORBIDDEN)
    }
    else {
        const newPhone = new Phone({ ...data, createdBy: userId });
        const result = await newPhone.save();
        return { data: result }
    }
};

export const updatePhone = async (_id: string, data: IPhone) => {
    const doc = await Phone.findOneAndUpdate({ _id }, data, { new: true });
    return { data: doc }
};

export const deletePhone = async (userId: string, phoneId: string) => {
    const user = await User.findById(userId);
    if (user?.role == ROLES.ADMIN) {
        await Phone.findByIdAndDelete(phoneId);
        return { data: true }
    }
    throw new AppError("You don't have the permission to perform the Action", HTTP_STATUS.UNAUTHORIZED)
};