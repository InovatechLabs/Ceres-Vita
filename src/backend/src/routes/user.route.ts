import { Router } from "express";
import { getProfile, saveProfile, verifyProfile } from "../controllers/profile.controller";
import { register, login } from "../controllers/user.controller";

const userRouter = Router();

// rota post para Registrar Usuario
userRouter.post("/register", register);

// rota post para Logar usuario
userRouter.post("/login", login);

// rota post para salvar informaçoes da userpage no banco
userRouter.post("/save-profile", saveProfile);

// rota para consultar email e nome do usuario atualmente logado, para aparecer na user page
userRouter.post("/verify-profile", verifyProfile);

userRouter.get('/profile/:userId', getProfile);



export default userRouter;