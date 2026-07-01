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

export interface IApiResponse<T = any> {
    status: 'success' | 'fail' | 'error';
    statusCode: number;
    message: string;
    results?: number;
    data: T;
}