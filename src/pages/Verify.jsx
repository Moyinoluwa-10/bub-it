import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Verify = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const query = useQuery();

  const verifyToken = async () => {
    const url = `${import.meta.env.VITE_URL}/auth/verify-email`;
    console.log(query.get("token"), query.get("email"));
    axios
      .post(
        url,
        {
          verificationToken: query.get("token"),
          email: query.get("email"),
        },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        // eslint-disable-next-line
        const { data } = res;
        console.log(data);
      }) // eslint-disable-next-line
      .catch((err) => {
        console.log(err);
        setError(true);
      });
    setLoading(false);
  };

  useEffect(() => {
    console.log(query);
    console.log(query.get("email"));
    if (loading) {
      verifyToken();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="verifyPage min-vh-100">
        <Header />
        <div className="container">
          <h2 className="mt-5">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="verifyPage min-vh-100">
        <Header />
        <div className="container">
          <h4 className="mt-5">
            There was an error, please double check your verification link{" "}
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div className="verifyPage min-vh-100">
      <Header />
      <div className="container">
        <h2 className="mt-5">Account Confirmed</h2>
        <Link to="/sign_in" className="btn-submit">
          Please login
        </Link>
      </div>
    </div>
  );
};

export default Verify;

