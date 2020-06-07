type DefaultStatusType = {
    [key: string]: {
        status: number,
        code?: number,
        name?: string
    }
}

export default class RequestStatus {
    public static readonly errors: DefaultStatusType = {
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

    public static readonly successes: DefaultStatusType = {
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