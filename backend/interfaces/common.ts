export interface IRegisterRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface IErrorResponse {
    status: 'fail' | 'error';
    message: string;
    statusCode: number;
    data?: any;
    stack?: string;
}