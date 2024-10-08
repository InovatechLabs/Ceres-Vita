import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../service/index.service";
import { useNavigate } from 'react-router-dom'; 
import './Register.css';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();  // Para redirecionar
  const [isLogin, setIsLogin] = useState(false);  // Controla se está na página de Login ou Cadastro

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); 
    }
  }, []); 
  const [success, setSuccess] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Por favor, insira seu nome"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("Por favor, insira seu e-mail"),
    password: Yup.string().required("Por favor, insira sua senha"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    const submit = await registerUser(values);
    console.log(submit.message);
    setSuccess(submit.message);
    setSubmitting(false);
  };

  const handleLoginClick = () => {
    setIsLogin(true);  // Esconde o campo de nome
    navigate("/login");  // Redireciona para a rota /login
  };

  return (
    <div className="bg">
    <div className="mx-auto max-w-md space-y-6 card" >
    <div className="flex justify-between items-center auth-choice"> {/* Container dos textos */}
          <button className="text-2xl font-bold cursor-pointer auth-choice-register" onClick={() => setIsLogin(false)}>
            Cadastro
          </button>
          <button className="text-2xl font-bold cursor-pointer auth-choice-login" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold card-title">Ceres Vita</h1>
        <p className="text-gray-500 dark:text-gray-400 card-subtitle">
          Nutrição
        </p>
      </div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }: FormikProps<FormValues>) => (
          <Form className="space-y-4 form" onSubmit={handleSubmit}>
            {success && (
              <div
                className="text-green-500 "
                style={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  backgroundColor: "#23c483",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
              >
                {success}
              </div>
            )}
            <Form.Group className="mb-3 form" controlId="name">
              
              <Field type="text" name="username" as={Form.Control} placeholder='Nome' />
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <Form.Group className="mb-3 form" controlId="email">
              
              <Field type="email" name="email" as={Form.Control} placeholder='E-mail' />
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <Form.Group className="mb-3 form" controlId="password">
              
              <Field type="password" name="password" as={Form.Control} placeholder='Senha'/>
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full btn-register">
              Cadastrar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default Register;