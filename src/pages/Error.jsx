import { useState, useEffect } from "react";
import Header from "../components/Header";
import NotFound from "../assets/svgs/page-not-found.e08ecdda.svg";
import Redirecting from "../assets/images/redirecting.19775f62.png";
import axios from "axios";

const Error = () => {
  const [redirecting, setRedirecting] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlCode = window.location.pathname.split("/")[1];
    const url = `${import.meta.env.VITE_URL}/urls/redirect/${urlCode}`;

    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        const { data } = res;
        window.location.href = data.url;
      }) // eslint-disable-next-line
      .catch((err) => {
        // console.log(err);
        setRedirecting(false);
        setError(true);
      });
  }, []);

  return (
    <div className="errorPage min-vh-100 px-3 pb-5">
      <Header />
      {redirecting && (
        <div>
          <div className="mx-auto my-5 cont">
            <img src={Redirecting} alt="" className="w-100" />
          </div>
          <p className="text-center mx-auto">Redirecting to your site</p>
        </div>
      )}
      {error && (
        <div>
          <div className="mx-auto my-5 cont">
            <img src={NotFound} alt="" className="w-100" />
          </div>
          <h1 className="text-center">PAGE NOT FOUND</h1>
          <p className="text-center mx-auto">
            We can’t seem to find the page you’re looking for. <br /> The link
            you followed may be broken or you may have entered the wrong link.
          </p>
        </div>
      )}
    </div>
  );
};

export default Error;
