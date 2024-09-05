import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import emailRoutes from "./routes/emailRoutes";
import cors from "cors";

dotenv.config();

const app = express();

// Configuração do middleware CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permite solicitações deste domínio
    methods: ['GET', 'POST'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(bodyParser.json());
app.use("/api/email", emailRoutes);

app.get("/", (req, res) => {
    res.send("Servidor backend funcionando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
