import nodemailer from 'nodemailer';
import HandleBarsMailTemplate, { IParseMailTemplate } from './HandleBarsMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EtherealMail {
    static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const mailTemplate = new HandleBarsMailTemplate();

        const preview = await transporter.sendMail({
            from: {
                name: from?.name || 'Sender Name',
                address: from?.email || '<sender@example.com>',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });

        // Preview only available when sending through an Ethereal account
        // eslint-disable-next-line no-console
        console.log(`Message sent: ${preview.messageId}`);
        // eslint-disable-next-line no-console
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(preview)}`);
    }
}
