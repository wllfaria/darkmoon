export default abstract class ServerMessage {
    public ok!: boolean;
    public status!: number;
    public message?: any | undefined;

    constructor(message?: any | undefined) {
        this.create(message);
    }

    protected abstract create(message?: any | undefined): ServerMessage;

    public toGenericResponse() {
        return {
            ok: this.ok,
            message: this.message
        }
    }
}