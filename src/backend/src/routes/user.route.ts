import { Router } from "express";

import { register, login } from "../controllers/user.controller";

const userRouter = Router();

// rota post para Registrar Usuario
userRouter.post("/register", register);

// rota post para Logar usuario
userRouter.post("/login", login);

export default userRouter;