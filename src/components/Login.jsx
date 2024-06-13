import React, { useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import validateForm from "../validation/validation";
import { login, signUp } from "../validation/firebase";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [signState, setSignState] = useState("SignIn");

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      formik.values.email = "";
      formik.values.password = "";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const initialValues = {
    username: "",
    password: "",
    email: "",
    confirm_password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateForm,
    onSubmit: async (values, actions) => {
      try {
        if (signState === "SignUp") {
          await signUp(values.username, values.email, values.password);
          actions.resetForm();
        }
      } catch (error) {
        alert("Something went wrong: " + error.message);
      }
    },
  });

  return (
    <div className="body">
      <div className="signup-container">
        <h2>{signState}</h2>
        <form onSubmit={formik.handleSubmit}>
          {signState === "SignUp" && (
            <>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                autoComplete="off"
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <p>{formik.errors.username}</p>
              )}
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p>{formik.errors.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p>{formik.errors.password}</p>
          )}

          {signState === "SignUp" && (
            <>
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                autoComplete="off"
                id="confirm_password"
                name="confirm_password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm_password}
              />
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <p>{formik.errors.confirm_password}</p>
                )}
            </>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              if (signState === "SignIn") {
                handleLogin(formik.values.email, formik.values.password);
              } else {
                formik.handleSubmit();
              }
            }}
            type="submit"
          >
            {signState}
          </button>
        </form>

        <p>
          <span
            onClick={() =>
              setSignState(signState === "SignIn" ? "SignUp" : "SignIn")
            }
          >
            {signState === "SignIn" ? "SignUp" : "SignIn"}
          </span>{" "}
          if you{" "}
          {signState === "SignIn" ? "don't have an account" : "have an account"}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
