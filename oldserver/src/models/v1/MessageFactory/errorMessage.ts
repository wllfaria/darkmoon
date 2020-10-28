import ServerMessage from "./serverMessage";

export default class ErrorMessage extends ServerMessage {
    protected create(type: any | undefined, message: any | undefined): ServerMessage {
        this.message = message;
        this.ok = false;
        this.status = type.status;
        this.code = type.code;
        this.name = type.name;
        return this;
    }
    
}