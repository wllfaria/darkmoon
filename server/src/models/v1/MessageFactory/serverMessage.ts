export default abstract class ServerMessage {
    public ok!: boolean;
    public status!: number;
    public message?: any | undefined;
    public code?: any | undefined;
    public name?: any | undefined;

    constructor(type?: any | undefined, message?: any | undefined) {
        this.create(type, message);
    }

    protected abstract create(type?: any |undefined, message?: any | undefined): ServerMessage;

    public toGenericResponse() {
        return {
            ok: this.ok,
            message: this.message,
        }
    }
}