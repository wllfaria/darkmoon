import ServerMessage from "./serverMessage";
import * as core from "express-serve-static-core";

export module MessageFactory {
    export function build<T = ServerMessage>(messageType: new (type?: any, body?: any) => T, type: any, body: any): T {
        return new messageType(type, body);
    }

    export function buildResponse<T extends ServerMessage>(messageType: new (type?: any, body?: any) => T, r: core.Response, type: any, body: any) {
        const m = build(messageType, type, body);
        m.name ? r.status(m.status).json({ok: m.ok, code: m.code, name: m.name, body }) : r.status(m.status).json({ok: m.ok, body });
    }
}