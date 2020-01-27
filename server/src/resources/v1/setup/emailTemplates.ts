export default class SetupEmailTemplates {
    public static readonly templates: any = {
        emailConfirmation: `
            <div style="width: 100%; height: 100%; background: #f2f2f2; padding-top: 40px; padding-bottom: 40px">
                <div style="max-width: 600px; font-family: Arial, sans-serif; color: #2f2936; border-radius: 2px; padding-top: 0; padding-left: 0; padding-right: 0; padding-bottom: 0; width: 100%; font-weight: 300; margin-right: auto; margin-left: auto; background-color: #fff;">
                    <div>
                        <img src="https://via.placeholder.com/600x200" alt="Darkmoon logo"/>
                    </div>
                    <div style="margin-top: 32px; padding: 0px 16px; padding-bottom: 32px;">
                        <p style="text-align: center;"><strong style="font-size: 24px;">Bem-vindo ao culto</strong></p>
                        <p style="margin-top: 32px; line-height: 1.5; font-size: 16px; text-align: center;">
                            Ei! ###REPLACE###, estamos muito felizes em ter você conosco e por isso vim te avisar que sua conta já ta quase pronta pra ser usada, mas antes você precisa confirmar seu e-mail clicando no botão abaixo, só vai levar alguns segundos! Juro!
                        </p>
                        <div style="margin: 48px auto 0 auto">
                            <a style="padding:16px 32px; background: #333333; color: white; text-decoration: none; font-weight: bold; text-transform: uppercase;"href="http://localhost:4200/confirmar-email/###REPLACE###" target="_blank" rel="nofollow">
                                Confirmar email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `,
        accountRecovery: `
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
        `,
        passwordChanged: `
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
        `
    }
}