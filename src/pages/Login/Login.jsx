import { useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";

const Login = () => {
  useEffect(() => {
    document.title = "Log in to Bub-it";
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Please fill out this field";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Please fill out this field";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters or more";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: ({ resetForm }) => {
      setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        toast.success(
          JSON.stringify("Login details submitted successfully", null, 2),
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
        resetForm({ values: "" });
      }, 500);
    },
  });

  return (
    <div className="formPage w-100 min-vh-100 px-3 pb-5">
      <Header />
      <div className="loginCont flex">
        <div className="formHead mb-4">
          <h1 className="text-center">Login to your account</h1>
        </div>
        <form className="formCont w-100" onSubmit={formik.handleSubmit}>
          <div className="formGroup mb-3 w-100">
            <label className="label d-block mb-2" htmlFor="email">
              Email address
            </label>
            <input
              {...formik.getFieldProps("email")}
              className="input w-100"
              type="text"
              name="email"
              required
              autoComplete="email address"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="formGroup mb-3 w-100">
            <label className="label d-block mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...formik.getFieldProps("password")}
              className="input w-100"
              type="password"
              name="password"
              required
              autoComplete="current-password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <button className="button" type="submit">
            Log in
          </button>
        </form>
      </div>
      <Link to="/sign_up" className="footLink">
        {/* eslint-disable-next-line */}
        Don't have an account? Register
      </Link>
      {/* <Link to="/forget-password" className="footLink forget">
        Forgot Password?
      </Link> */}
    </div>
  );
};

export default Login;
