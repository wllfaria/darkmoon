import ServerMessage from "./serverMessage";

export default class SuccessMessage extends ServerMessage {
    protected create(message: any | undefined): ServerMessage {
        this.message = message;
        this.ok = true;
        this.status = 200;
        return this;
    }
    
}