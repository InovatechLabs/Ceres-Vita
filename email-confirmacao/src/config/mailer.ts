import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,     // Servidor SMTP do Relay
    port: parseInt(process.env.SMTP_PORT || '587', 10),  // Porta fornecida
    secure: false,                   // Pode ser true se usar SSL, false para TLS
    auth: {
        user: process.env.SMTP_USER, // Nome de usuário fornecido
        pass: process.env.SMTP_PASS, // Senha fornecida
    },
    tls: {
        rejectUnauthorized: false // Opcional, para ignorar erros de certificado
    }
});

export const sendConfirmationEmail = (email: string, link: string) => {
    const mailOptions = {
        from: process.env.SMTP_USER,  // Usando o e-mail do usuário SMTP como remetente
        to: email,
        subject: "Confirmação de Email",
        text: `Clique no link para confirmar seu email: ${link}`,
        html: `<p>Clique no link para confirmar seu email: <a href="${link}">Confirmar Email</a></p>`,
    };

    return transporter.sendMail(mailOptions)
        .then(info => console.log('Email enviado:', info))
        .catch(error => console.error('Erro ao enviar email:', error));
};
