export default abstract class AbstractEmailTemplate {
    protected type_id!: number;
    protected name!: string;
    protected sender!: string;
    protected email!: string;
    protected subject!: string;
    protected html!: string;

    constructor() {
        this.create();
    }
    
    protected abstract create(): AbstractEmailTemplate;

    public getType = (): number => {
        return this.type_id;
    }

    public getName = (): string => {
        return this.name;
    }

    public getSender = (): string => {
        return this.sender;
    }

    public getEmail = (): string => {
        return this.email
    }

    public getSubject = (): string => {
        return this.subject;
    }

    public getHTML = (): string => {
        return this.html;
    }
}