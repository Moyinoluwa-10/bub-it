import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Header from "../components/Header";
import axios from "axios";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/urls");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

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
    } else if (values.password.length < 6) {
      errors.password = "Password must be 6 characters or more";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      const toastId = toast.loading("Submitting...");
      const url = `${import.meta.env.VITE_URL}/auth/login`;

      axios
        .post(url, values, { withCredentials: true })
        .then((res) => {
          // console.log(res);
          const { data } = res;
          toast.success(data.msg, {
            id: toastId,
          });
          resetForm({ values: "" });
          setTimeout(() => {
            navigate("/urls");
          }, 1000);
          setIsLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          const errMessage =
            err.response && err.response.status === 400
              ? err.response.data.msg
              : "An error occurred, please try again later";
          toast.error(errMessage, {
            id: toastId,
          });
          setIsLoading(false);
        });
    },
  });

  const checkLoggedIn = (data) => {
    setIsLoggedIn(data);
  };

  return (
    <div className="formPage w-100 min-vh-100 px-3 pb-5">
      <Header checkLoggedIn={checkLoggedIn} verifyUser={true} />
      <div className="loginCont mt-2 mx-auto">
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

          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </form>
        <p className="mt-4 mb-2">
          Don't have an account?{" "}
          <Link to="/sign_up" className="footLink">
            Sign up
          </Link>
        </p>
        <p>
          <Link to="/forgot_password" className="footLink forget">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
