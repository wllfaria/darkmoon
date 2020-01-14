import ServerMessage from "./serverMessage";
import * as core from "express-serve-static-core";

export module MessageFactory {
    export function build<T = ServerMessage>(messageType: new (body?: any) => T, body: any): T {
        return new messageType(body);
    }

    export function buildResponse<T extends ServerMessage>(messageType: new (body?: any) => T, r: core.Response, body: any) {
        const m = build(messageType, body);
        return r.status(m.status).json(body);
    }
}