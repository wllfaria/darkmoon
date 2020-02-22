import EmailTemplate from "./models/v1/emailTemplate.model";
import EmailType from "./models/v1/emailType.model";
import EventEntity from "./models/v1/eventEntity.model";
import EventType from "./models/v1/eventType.model";
import PasswordChangedEmail from "./resources/v1/setup/emailTemplates/passwordChanged";
import EmailConfirmationEmail from "./resources/v1/setup/emailTemplates/emailConfirmation";
import AccountRecoveryEmail from "./resources/v1/setup/emailTemplates/accountRecovery";
import ProductType from "./models/v1/productType.model";
import Sku from "./models/v1/sku.model";
import Gender from "./models/v1/gender.model";
import ProductModel from "./models/v1/productModel.model";
import Shirt from "./models/v1/shirt.model";
import ProductImage from "./models/v1/productImage.model";

export default class DatabaseSetup {
    public static setupTables = async () => {
        await DatabaseSetup.createEmailsTypes();
        await DatabaseSetup.createEmailsTemplates();
        await DatabaseSetup.createEventsEntities();
        await DatabaseSetup.createEventsTypes();
        await DatabaseSetup.createProductsTypes();
        await DatabaseSetup.createSkus();
        await DatabaseSetup.createGenders();
        await DatabaseSetup.createProductsModels();
        await DatabaseSetup.createShirts();
        await DatabaseSetup.createProductsImages();
    }

    private static createEmailsTypes = async () => {
        await EmailType.create({ name: "personal" });
    }

    private static createEmailsTemplates = async () => {
        const emailConfirmationEmail: EmailConfirmationEmail = new EmailConfirmationEmail();
        const accountRecoveryEmail: AccountRecoveryEmail = new AccountRecoveryEmail();
        const passwordChangedEmail: PasswordChangedEmail = new PasswordChangedEmail();
        
        await EmailTemplate.create({ type_id: emailConfirmationEmail.getType(), name: emailConfirmationEmail.getName(), sender: emailConfirmationEmail.getSender(), email: emailConfirmationEmail.getEmail(), subject: emailConfirmationEmail.getSubject(), html: emailConfirmationEmail.getHTML() });
        await EmailTemplate.create({ type_id: accountRecoveryEmail.getType(), name: accountRecoveryEmail.getName(), sender: accountRecoveryEmail.getSender(), email: accountRecoveryEmail.getEmail(), subject: accountRecoveryEmail.getSubject(), html: accountRecoveryEmail.getHTML() });
        await EmailTemplate.create({ type_id: passwordChangedEmail.getType(), name: passwordChangedEmail.getName(), sender: passwordChangedEmail.getSender(), email: passwordChangedEmail.getEmail(), subject: passwordChangedEmail.getSubject(), html: passwordChangedEmail.getHTML() });
    }

    private static createEventsEntities = async () => {
        await EventEntity.create({ name: 'email' });
        await EventEntity.create({ name: 'user' });
    }

    private static createEventsTypes = async () => {
        await EventType.create({ entity_id: 1, name: 'email-sent' });
        await EventType.create({ entity_id: 2, name: 'recovery' });
        await EventType.create({ entity_id: 2, name: 'email-confirmation' });
        await EventType.create({ entity_id: 2, name: 'finish-register' });
        await EventType.create({ entity_id: 2, name: 'lazy-register' });
        await EventType.create({ entity_id: 2, name: 'register' });
    }

    private static createProductsTypes = async () => {
        await ProductType.create({ name: 'shirt' });
    }

    private static createSkus = async () => {
        await Sku.create({ product_name: 'Warlock Oversized Hoodie', product_url: 'warlock-oversized-hoodie', type_id: 1, available: true, price: 59.99 });
    }

    private static createGenders = async () => {
        await Gender.create({ name: 'male' });
        await Gender.create({ name: 'female' });
        await Gender.create({ name: 'unisex' });
    }

    private static createProductsModels = async () => {
        await ProductModel.create({ type_id: 1, name: 'short-sleeve' });
    }

    private static createShirts = async () => {
        await Shirt.create({ sku_id: 1, size: 'M', model_id: 1, gender_id: 1 });
    }

    private static createProductsImages = async () => {
        await ProductImage.create({ url: 'https://cdn.shopify.com/s/files/1/0228/2373/products/WARLOCK-HOODIE-D_1024x1024.jpg', sku_id: 1, alt: 'Woman wearing Warlock Oversized Hoodie' });
        await ProductImage.create({ url: 'https://cdn.shopify.com/s/files/1/0228/2373/products/WARLOCK-HOODIE-C_1024x1024.jpg', sku_id: 1, alt: 'Woman wearing Warlock Oversized Hoodie' });
        await ProductImage.create({ url: 'https://cdn.shopify.com/s/files/1/0228/2373/products/WARLOCK-HOODIE-E_1024x1024.jpg', sku_id: 1, alt: 'Woman wearing Warlock Oversized Hoodie' });
    }
}