import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Header from "../components/Header";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const query = useQuery();

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Please fill out this field";
    } else if (values.password.length < 6) {
      errors.password = "Password must be 6 characters or more";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      const toastId = toast.loading("Submitting...");
      const url = `${import.meta.env.VITE_URL}/auth/reset-password`;

      axios
        .post(
          url,
          {
            password: values.password,
            token: query.get("token"),
            email: query.get("email"),
          },
          { withCredentials: true }
        )
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
          console.log(err);
          const errMessage =
            err.response && err.response.status === 400
              ? "Incorrect email or password"
              : "An error occurred, please try again later";
          toast.error(errMessage, {
            id: toastId,
          });
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="formPage w-100 min-vh-100 px-3 pb-5">
      <Header />
      {import.meta.env.REACT_APP_TITLE}
      <div className="loginCont mt-2 mx-auto">
        <div className="formHead mb-4">
          <h1 className="text-center">ResetPassword to your account</h1>
        </div>
        <form className="formCont w-100" onSubmit={formik.handleSubmit}>
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
            {isLoading ? "Please Wait..." : "New Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

