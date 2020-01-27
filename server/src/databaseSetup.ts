import EmailTemplate from "./models/v1/emailTemplate.model";
import EmailType from "./models/v1/emailType.model";
import EventEntity from "./models/v1/eventEntity.model";
import EventType from "./models/v1/eventType.model";

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
        await EmailTemplate.create({ type_id: 1, name: "email-confirmation", sender: "Howl da Darkmoon", email: "willians@williansfaria.dev", subject: "Boas vindas", html: '<div style="width: 100%; height: 100%; background: #f2f2f2; padding-top: 40px; padding-bottom: 40px"> <div style="max-width: 600px; font-family: Arial, sans-serif; color: #2f2936; border-radius: 2px; padding-top: 0; padding-left: 0; padding-right: 0; padding-bottom: 0; width: 100%; font-weight: 300; margin-right: auto; margin-left: auto; background-color: #fff;"><div><img src="https://via.placeholder.com/600x200" alt="Darkmoon logo"/></div><div style="margin-top: 32px; padding: 0px 16px; padding-bottom: 32px;"><p style="text-align: center;"><strong style="font-size: 24px;">Bem-vindo ao culto</strong></p><p style="margin-top: 32px; line-height: 1.5; font-size: 16px; text-align: center;">Ei! ###REPLACE###, estamos muito felizes em ter você conosco e por isso vim te avisar que sua conta já ta quase pronta pra ser usada, mas antes você precisa confirmar seu e-mail clicando no botão abaixo, só vai levar alguns segundos! Juro!</p><div style="margin: 48px 0 0 0; display: flex; justify-content: center;"><a style="padding:16px 32px; background: #333333; color: white; text-decoration: none; font-weight: bold; text-transform: uppercase;"href="http://localhost:4200/confirmar-email/###REPLACE###" target="_blank" rel="nofollow">Confirmar email</a></div></div></div></div>' })
        await EmailTemplate.create({ type_id: 1, name: "account-recovery", sender: "Darkmoon", email: "willians@williansfaria.dev", subject: "Recuperar Conta", html: '<div style="width: 100%; height: 100%; background: #f2f2f2; padding-top: 40px; padding-bottom: 40px"> <div style="max-width: 600px; font-family: Arial, sans-serif; color: #2f2936; border-radius: 2px; padding-top: 0; padding-left: 0; padding-right: 0; padding-bottom: 0; width: 100%; font-weight: 300; margin-right: auto; margin-left: auto; background-color: #fff;"><div><img src="https://via.placeholder.com/600x200" alt="Darkmoon logo"/></div><div style="margin-top: 32px; padding: 0px 16px; padding-bottom: 32px;"><p style="text-align: center;"><strong style="font-size: 24px;">Recuperar conta</strong></p><p style="margin-top: 32px; line-height: 1.5; font-size: 16px; text-align: center;">Olá, ###REPLACE###, recebemos sua solicitação de recuperação de conta, mas para que possamos fazer isso, será necessário que confirme que você de fato solicitou essa alteração digitando o PIN abaixo no site. É bem rápido, depois disso continuaremos para a criação de sua nova senha!</p><div style="width: 100%; margin: 32px 0 0 0; display: flex; justify-content: center;"><p style="letter-spacing: 10px; font-size: 24px; padding: 16px 32px; background: #f2f2f2">###REPLACE###</p></div></div></div></div>' })
        await EmailTemplate.create({ type_id: 1, name: "password-changed", sender: "Darkmoon", email: "willians@williansfaria.dev", subject: "Senha Alterada", html: '<div style="width: 100%; height: 100%; background: #f2f2f2; padding-top: 40px; padding-bottom: 40px"><div style="max-width: 600px; font-family: Arial, sans-serif; color: #2f2936; border-radius: 2px; padding-top: 0; padding-left: 0; padding-right: 0; padding-bottom: 0; width: 100%; font-weight: 300; margin-right: auto; margin-left: auto; background-color: #fff;"><div><img src="https://via.placeholder.com/600x200" alt="Darkmoon logo"/></div><div style="margin-top: 32px; padding: 0px 16px; padding-bottom: 32px;"><p style="text-align: center;"><strong style="font-size: 24px;">Senha Alterada</strong></p><p style="margin-top: 32px; line-height: 1.5; font-size: 16px; text-align: center;">###REPLACE###, este é um e-mail automático que serve somente para te avisar que sua senha foi alterada com sucesso!</p><p style="margin-top: 8px; line-height: 1.5; font-size: 16px; text-align: center;">Obrigado por estar conosco, boas compras!</p></div></div></div>' })
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