import ServerMessage from "./serverMessage";

export default class SuccessMessage extends ServerMessage {
    protected create(type: any | undefined, message: any | undefined): ServerMessage {
        this.message = message;
        this.ok = true;
        this.status = type.status;
        return this;
    }
    
}