import { Request, Response } from "express";
import { sendConfirmationEmail } from "../config/mailer";

export const sendEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    const confirmationLink = `http://localhost:3000/confirm-email?email=${encodeURIComponent(email)}`;

    try {
        await sendConfirmationEmail(email, confirmationLink);
        res.status(200).json({ message: "Email de confirmação enviado!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao enviar email", error });
    }
};
