export default class RequestStatus {
    public static errors = () => {
        const errors: any = {
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
        return errors;
    }

    public static successes = () => {
        const successes: any = {
            ok: {
                status: 200
            },
            create: {
                status: 201
            }
        }
        return successes;
    }
} 