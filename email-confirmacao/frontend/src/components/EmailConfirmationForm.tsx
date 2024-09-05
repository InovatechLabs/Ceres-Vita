// src/components/EmailConfirmationForm.tsx
import React, { useState } from "react";
import axios from "axios";

const EmailConfirmationForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/email/send-confirmation", { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Erro ao enviar email de confirmação.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h1>Cadastro de Email</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    required
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
                <button type="submit" style={{ width: "100%", padding: "8px" }}>Enviar Confirmação</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EmailConfirmationForm;
