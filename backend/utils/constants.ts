export const ENVIRONMENTS = Object.freeze({
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TESTING: 'testing'
});

export const HTTP_STATUS = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
});

export const ROLES = Object.freeze({
    ADMIN: 'admin',
    PREMIUM: 'premium',
    CLIENT: 'client'
});

export const REPORT_PHONE_STATUS = Object.freeze({
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REVIEWED: 'reviewed'
});

export const REPORT_USER_STATUS = Object.freeze({
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REVIEWED: 'reviewed'
});

export const USER_LOGIN_METHODS = Object.freeze({
    LOCAL: 'local',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    APPLE: 'apple'
});
