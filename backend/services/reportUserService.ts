import ReportPhone, { IReportPhone } from "../models/ReportPhone";
import User, { IUser } from "../models/User";
import { AppError } from "../utils/appError";
import { HTTP_STATUS, REPORT_PHONE_STATUS, ROLES } from "../utils/constants";

export const reportPhone = async (data: IReportPhone) => {
    const checker = new ReportPhone(data)
    const report = await checker.save();
    return { data: report }
};

export const updatePhoneReport = async (id: string, status: typeof REPORT_PHONE_STATUS, user: IUser) => {
    if (user.role != ROLES.ADMIN) {
        throw new AppError("You don't have the permission to perform the Action", HTTP_STATUS.UNAUTHORIZED)
    }
    const data = await ReportPhone.findByIdAndUpdate(id, status);
    return { data }
}

export const getAllReports = async (phone: string, user: string) => {
    const userData = await User.findById(user);
    if (userData?.role == ROLES.ADMIN) {
        const data = await ReportPhone.find({ phone }).populate('user');
        return { data }
    }
    const data = await ReportPhone.find({
        phone,
        user
    }).populate('user');
    return { data }
};



