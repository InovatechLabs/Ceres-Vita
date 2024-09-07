import React, { FC } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Por favor, insira seu e-mail"),
    password: Yup.string().required("Por favor, insira sua senha"),
  });

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login in</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Insira seus dados para realizar login.
        </p>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }: FormikProps<FormValues>) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Field type="email" name="email" as={Form.Control} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Senha</Form.Label>
              <Field type="password" name="password" as={Form.Control} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full">
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;