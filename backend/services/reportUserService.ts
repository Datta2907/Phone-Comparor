import ReportUser, { IReportUser } from "../models/ReportUser";
import User, { IUser } from "../models/User";
import { AppError } from "../utils/appError";
import { HTTP_STATUS, REPORT_PHONE_STATUS, ROLES } from "../utils/constants";

export const reportPhone = async (data: IReportUser) => {
    const checker = new ReportUser(data)
    const report = await checker.save();
    return { data: report }
};

export const updateUserReport = async (id: string, status: typeof REPORT_PHONE_STATUS, user: IUser) => {
    if (user.role != ROLES.ADMIN) {
        throw new AppError("You don't have the permission to perform the Action", HTTP_STATUS.UNAUTHORIZED)
    }
    const data = await ReportUser.findByIdAndUpdate(id, status, { new: true });
    if (!data) {
        throw new AppError("Report not found", HTTP_STATUS.NOT_FOUND);
    }
    return { data }
}

export const getAllReports = async (phone: string, user: string) => {
    const userData = await User.findById(user);
    if (userData?.role == ROLES.ADMIN) {
        const data = await ReportUser.find({ phone }).populate('user');
        return { data }
    }
    const data = await ReportUser.find({
        phone,
        user
    }).populate('user');
    return { data }
};



