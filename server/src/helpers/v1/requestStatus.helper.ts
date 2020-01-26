export default class RequestStatus {
    public static readonly errors = {
        BAD_REQUEST: {
            status: 400,
            code: 2001,
            name: "ER_BADREQUEST_ERROR"
        },
        INTERNAL: {
            status: 500,
            code: 1001,
            name: "ER_INTERNAL_ERROR"
        }
    }

    public static readonly successes = {
        OK: {
            status: 200
        },
        CREATE: {
            status: 201
        },
        ACCEPTED: {
            status: 202
        }
    }
} 