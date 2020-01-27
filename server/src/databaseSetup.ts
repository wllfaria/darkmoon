import EmailTemplate from "./models/v1/emailTemplate.model";
import EmailType from "./models/v1/emailType.model";
import EventEntity from "./models/v1/eventEntity.model";
import EventType from "./models/v1/eventType.model";
import SetupEmailTemplates from "./resources/v1/setup/emailTemplates";

export default class DatabaseSetup {
    public static setupTables = async () => {
        await DatabaseSetup.createEmailTypes();
        await DatabaseSetup.createEmailTemplates();
        await DatabaseSetup.createEventEntities();
        await DatabaseSetup.createEventTypes();
    }

    private static createEmailTypes = async () => {
        await EmailType.create({ name: "personal" });
    }

    private static createEmailTemplates = async () => {
        await EmailTemplate.create({ type_id: 1, name: "email-confirmation", sender: "Howl da Darkmoon", email: "willians@williansfaria.dev", subject: "Boas vindas", html: SetupEmailTemplates.templates.emailConfirmation })
        await EmailTemplate.create({ type_id: 1, name: "account-recovery", sender: "Darkmoon", email: "willians@williansfaria.dev", subject: "Recuperar Conta", html: SetupEmailTemplates.templates.accountRecovery })
        await EmailTemplate.create({ type_id: 1, name: "password-changed", sender: "Darkmoon", email: "willians@williansfaria.dev", subject: "Senha Alterada", html: SetupEmailTemplates.templates.passwordChanged })
    }

    private static createEventEntities = async () => {
        await EventEntity.create({ name: 'email' });
        await EventEntity.create({ name: 'user' });
    }

    private static createEventTypes = async () => {
        await EventType.create({ entity_id: 1, name: 'email-sent' });
        await EventType.create({ entity_id: 2, name: 'recovery' });
        await EventType.create({ entity_id: 2, name: 'email-confirmation' });
        await EventType.create({ entity_id: 2, name: 'finish-register' });
        await EventType.create({ entity_id: 2, name: 'lazy-register' });
        await EventType.create({ entity_id: 2, name: 'register' });
    }
}