import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Header from "../components/Header";
import axios from "axios";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Please fill out this field";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      const toastId = toast.loading("Submitting...");
      const url = `${import.meta.env.VITE_URL}/auth/forgot-password`;

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
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err);
          const errMessage =
            err.response && err.response.status === 400
              ? "Incorrect email or password"
              : "An error occurred, please try again later";
          toast.error(errMessage, {
            id: toastId,
          });
          setIsLoading(true);
        });
    },
  });

  return (
    <div className="formPage w-100 min-vh-100 px-3 pb-5">
      <Header />
      {import.meta.env.REACT_APP_TITLE}
      <div className="loginCont mt-2 mx-auto">
        <div className="formHead mb-4">
          <h1 className="text-center">Forgot password</h1>
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

          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Get Reset Password Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

