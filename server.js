import express from "express";
import dotenv from "dotenv";
import jogosRoute from './src/routes/jogosRoute.js'

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});


// Todas as Rotas
app.use('/jogos', jogosRoute);


app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});