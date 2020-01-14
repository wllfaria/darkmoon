import ServerMessage from "./serverMessage";

export default class ErrorMessage extends ServerMessage {
    protected create(message: any | undefined): ServerMessage {
        this.message = message;
        this.ok = false;
        this.status = 500;
        return this;
    }
    
}