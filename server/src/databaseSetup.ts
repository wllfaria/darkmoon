import EmailTemplate from "./models/v1/emailTemplate.model";
import EmailType from "./models/v1/emailType.model";
import EventEntity from "./models/v1/eventEntity.model";
import EventType from "./models/v1/eventType.model";
import PasswordChangedEmail from "./resources/v1/setup/emailTemplates/passwordChanged";
import EmailConfirmationEmail from "./resources/v1/setup/emailTemplates/emailConfirmation";
import AccountRecoveryEmail from "./resources/v1/setup/emailTemplates/accountRecovery";

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
        const emailConfirmationEmail: EmailConfirmationEmail = new EmailConfirmationEmail();
        const accountRecoveryEmail: AccountRecoveryEmail = new AccountRecoveryEmail();
        const passwordChangedEmail: PasswordChangedEmail = new PasswordChangedEmail();
        
        await EmailTemplate.create({ type_id: emailConfirmationEmail.getType(), name: emailConfirmationEmail.getName(), sender: emailConfirmationEmail.getSender(), email: emailConfirmationEmail.getEmail(), subject: emailConfirmationEmail.getSubject(), html: emailConfirmationEmail.getHTML() });
        await EmailTemplate.create({ type_id: accountRecoveryEmail.getType(), name: accountRecoveryEmail.getName(), sender: accountRecoveryEmail.getSender(), email: accountRecoveryEmail.getEmail(), subject: accountRecoveryEmail.getSubject(), html: accountRecoveryEmail.getHTML() });
        await EmailTemplate.create({ type_id: passwordChangedEmail.getType(), name: passwordChangedEmail.getName(), sender: passwordChangedEmail.getSender(), email: passwordChangedEmail.getEmail(), subject: passwordChangedEmail.getSubject(), html: passwordChangedEmail.getHTML() });
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