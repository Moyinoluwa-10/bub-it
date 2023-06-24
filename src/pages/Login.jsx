import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Header from "../components/Header";

const Login = () => {
  // eslint-disable-next-line
  const navigate = useNavigate();
  useEffect(() => {
    // const url = "/api/v1/users/showMe";
    const url = "https://api-bub-it.vercel.app/api/v1/users/showMe";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          navigate("/urls");
          return response.json();
        }
      }) // eslint-disable-next-line
      .then((result) => {})
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  const [isLoading, setIsLoading] = useState(false);

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
      const url = "/api/v1/auth/login";
      // const url = "http://localhost:5000/api/v1/auth/login";
      // const url = "https://api-bub-it.vercel.app/api/v1/auth/login";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          withCredentials: true,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          if (result.status) {
            toast.success(result.msg, {
              id: toastId,
            });
            // resetForm({ values: "" });
            // navigate("/urls");
          } else {
            toast.error(result.msg, {
              id: toastId,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          toast.error("An error occurred, please try again later", {
            id: toastId,
          });
        });
    },
  });

  return (
    <div className="formPage w-100 min-vh-100 px-3 pb-5">
      <Header />
      {isLoading}
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

          <button className="button" type="submit">
            Log in
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/sign_up" className="footLink">
            Sign up
          </Link>
        </p>
        {/* <Link to="/forget-password" className="footLink forget">
          Forgot Password?
        </Link> */}
      </div>
    </div>
  );
};

export default Login;
