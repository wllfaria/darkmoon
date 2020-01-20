export default class RequestStatus {
    public static readonly errors = {
        badRequest: {
            status: 400,
            code: 2001,
            name: "ER_BADREQUEST_ERROR"
        },
        internal: {
            status: 500,
            code: 1001,
            name: "ER_INTERNAL_ERROR"
        }
    }

    public static readonly successes: {
        ok: {
            status: 200
        },
        create: {
            status: 201
        }
    }
} 