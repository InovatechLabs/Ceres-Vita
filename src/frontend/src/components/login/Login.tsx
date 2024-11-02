import React, { FC, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/index.service";
import { useAuth } from "../contexts/AuthContext";


interface FormValues {
  email: string;
  password: string;

}


const Login: FC = () => {

  
const handleHomeClick = () => {
  navigate('/home')
}
  const navigate = useNavigate(); // Para redirecionar
  const [success, setSuccess] = useState("");
  const { setAuthenticated } = useAuth(); // Utilize o contexto de autenticação

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Por favor, insira seu e-mail"),
    password: Yup.string().required("Por favor, insira sua senha"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const submit = await loginUser(values);
      console.log(submit.message);
      setSuccess(submit.message);
      if (submit.message === "Login bem-sucedido") {
        if (submit.token) {
          // Armazenar o token no sessionStorage
          sessionStorage.setItem("token", submit.token);
          sessionStorage.setItem("id", submit.user.id);
          setAuthenticated(true); // Atualiza o estado de autenticação
          navigate("/home"); // Redireciona o usuário após o login bem-sucedido
        }
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setSuccess("Erro ao fazer login. Tente novamente.");
    } finally {
      setSubmitting(false); // Define o estado de "submitting" para falso após o login
    }
  };

  const handleLoginClick = () => {
    navigate("/register"); // Redireciona para a rota /register
  };

  return (
    <div className="bg">
      <div className="mx-auto max-w-md space-y-6 card">
        <div className="space-y-2 text-center auth-choice">
          <button className="text-2xl font-bold cursor-pointer auth-choice-register" onClick={handleLoginClick}>
            Cadastro
          </button>
          <button className="text-2xl font-bold cursor-pointer auth-choice-login" onClick={() => {}}>
            Login
          </button>
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold card-title" onClick={handleHomeClick}>Ceres Vita</h1>
          <p className="text-gray-500 dark:text-gray-400 card-subtitle">
            Nutrição
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }: FormikProps<FormValues>) => (
            <Form className="space-y-4 form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3 form" controlId="email">
                <Field type="email" name="email" as={Form.Control} placeholder='E-mail' />
              </Form.Group>
              <Form.Group className="mb-3 form" controlId="password">
                <Field type="password" name="password" as={Form.Control} placeholder='Senha' />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-full btn-register">
                Entrar
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;