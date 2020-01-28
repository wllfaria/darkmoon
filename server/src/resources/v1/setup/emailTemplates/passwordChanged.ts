import AbstractEmailTemplate from "../abstractEmailTemplate";

export default class PasswordChangedEmail extends AbstractEmailTemplate {
    protected create(): AbstractEmailTemplate {
        this.type_id = 1;
        this.name = "password-changed";
        this.sender = "Darkmoon";
        this.email = "willians@williansfaria.dev";
        this.subject = "Senha Alterada";
        this.html = `
            <div style="width: 100%; height: 100%; background: #f2f2f2; padding-top: 40px; padding-bottom: 40px">
                <div style="max-width: 600px; font-family: Arial, sans-serif; color: #2f2936; border-radius: 2px; padding-top: 0; padding-left: 0; padding-right: 0; padding-bottom: 0; width: 100%; font-weight: 300; margin-right: auto; margin-left: auto; background-color: #fff;">
                    <div>
                        <img src="https://via.placeholder.com/600x200" alt="Darkmoon logo"/>
                    </div>
                    <div style="margin-top: 32px; padding: 0px 16px; padding-bottom: 32px;">
                        <p style="text-align: center;"><strong style="font-size: 24px;">Senha Alterada</strong></p>
                        <p style="margin-top: 32px; line-height: 1.5; font-size: 16px; text-align: center;">
                            ###REPLACE###, este é um e-mail automático que serve somente para te avisar que sua senha foi alterada com sucesso!
                        </p>
                        <p style="margin-top: 8px; line-height: 1.5; font-size: 16px; text-align: center;">
                            Obrigado por estar conosco, boas compras!
                        </p>
                    </div>
                </div>
            </div>
        `;
        return this;
    }
}