import nodemailer from 'nodemailer';
import HandleBarsMailTemplate, { IParseMailTemplate } from './HandleBarsMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

interface ISendMail {
    to: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

const transportOptionsFactory = async (useEtherealMail = true) => {
    if (useEtherealMail) {
        const account = await nodemailer.createTestAccount();

        return {
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        };
    }

    return {
        host: process.env.MAIL_HOST || 'smtp.office365.com',
        port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587,
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
            user: process.env.MAIL_USER || 'user_name@mail.com',
            pass: process.env.MAIL_PASS || 'password',
        },
    };
};

export default class MailSender {
    static async sendMail({ to, subject, templateData }: ISendMail): Promise<void> {
        const useEtherealMail =
            !process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.MAIL_HOST || !process.env.MAIL_PORT;

        const options = await transportOptionsFactory(useEtherealMail);

        const transporter = nodemailer.createTransport(options);

        const mailTemplate = new HandleBarsMailTemplate();

        const preview = await transporter.sendMail({
            from: {
                name: 'Sender Name',
                address: options.auth.user || '<sender@mail.com>',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });

        if (useEtherealMail) {
            // Preview only available when sending through an Ethereal account
            // eslint-disable-next-line no-console
            console.log(`Message sent: ${preview.messageId}`);
            // eslint-disable-next-line no-console
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(preview)}`);
        }
    }
}
