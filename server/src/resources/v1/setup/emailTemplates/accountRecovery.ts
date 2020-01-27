import AbstractEmailTemplate from "../abstractEmailTemplate";

export default class AccountRecoveryEmail extends AbstractEmailTemplate {
    protected create(): AbstractEmailTemplate {
        this.type_id = 1;
        this.name = "account-recovery";
        this.sender = "Darkmoon"
        this.email = "willians@williansfaria.dev";
        this.subject = "Recuperar Conta";
        this.html = `
            <div style="width: 100%; height: 100%; background: #f2f2f2; padding-top: 40px; padding-bottom: 40px">
                <div style="max-width: 600px; font-family: Arial, sans-serif; color: #2f2936; border-radius: 2px; padding-top: 0; padding-left: 0; padding-right: 0; padding-bottom: 0; width: 100%; font-weight: 300; margin-right: auto; margin-left: auto; background-color: #fff;">
                    <div>
                        <img src="https://via.placeholder.com/600x200" alt="Darkmoon logo"/>
                    </div>
                    <div style="margin-top: 32px; padding: 0px 16px; padding-bottom: 32px;">
                        <p style="text-align: center;"><strong style="font-size: 24px;">Recuperar conta</strong></p>
                        <p style="margin-top: 32px; line-height: 1.5; font-size: 16px; text-align: center;">
                            Olá, ###REPLACE###, recebemos sua solicitação de recuperação de conta, mas para que possamos fazer isso, será necessário que confirme que você de fato solicitou essa alteração digitando o PIN abaixo no site. É bem rápido, depois disso continuaremos para a criação de sua nova senha!
                        </p>
                        <div style="width: 100%; margin: 32px auto 0 auto;">
                            <p style="letter-spacing: 10px; font-size: 24px; padding: 16px 32px; background: #f2f2f2">
                                ###REPLACE###
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return this;
    }
}