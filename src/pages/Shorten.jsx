import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { ImLink } from "react-icons/im";
import { Link } from "react-router-dom";
import RightImage from "../assets/svgs/home-illustration.096b8271.svg";
import Modal from "../components/Modal";
import Header from "../components/Header";
import axios from "axios";

const Shorten = () => {
  const [openModal, setOpenModal] = useState(false);
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const [shortUrl, setShortUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = (data) => {
    setIsLoggedIn(data);
  };

  return (
    <>
      {openModal && <Modal closeModal={setOpenModal} shortUrl={shortUrl} />}
      <div className="bubPage w-100% px-2 min-vh-100">
        <Header Nav={true} verifyUser={true} checkLoggedIn={checkLoggedIn} />
        <div className="container bubContainer d-flex align-items-center justify-content-between gap-md-4 gap-5 mt-5">
          <div className="leftSection w-100">
            <Formik
              initialValues={{
                longUrl: "",
                custom: "",
              }}
              onSubmit={async (values) => {
                setIsLoading(true);
                const url = `${import.meta.env.VITE_URL}/urls/shorten`;
                axios
                  .post(url, values, { withCredentials: true })
                  .then((res) => {
                    console.log(res.data);
                    const { data } = res;
                    if (data.url.customUrl) {
                      setShortUrl(data.url.customUrl);
                    } else {
                      setShortUrl(data.url.shortUrl);
                    }
                    openModalHandler();
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                  });
              }}
            >
              <Form className="w-100">
                {/* {!isLoggedIn && (
                  <p className="error">
                    You have to be logged in to shorten your URLs
                  </p>
                )} */}
                <div className="longUrl mb-4">
                  <label htmlFor="longUrl" className="mb-2">
                    <ImLink className="link" />
                    Enter your long URL here
                  </label>
                  <Field
                    type="url"
                    id="longUrl"
                    name="longUrl"
                    placeholder="https://example.com/"
                    required
                  />
                </div>
                {isLoggedIn && (
                  <div className="alias mb-4">
                    <label htmlFor="custom" className="mb-2">
                      <ImLink /> Customize your link
                    </label>
                    <div className="aliasInput">
                      <div className="default">bub.icu/</div>
                      <Field
                        id="custom"
                        name="custom"
                        placeholder="alias"
                        className="custom"
                      />
                    </div>
                  </div>
                )}

                <div className="buttons">
                  <Link to={"/urls"}>My URLs</Link>
                  <button type="submit">
                    {isLoading ? "Loading..." : "Bub It"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          <div className="rightSection">
            <img src={RightImage} alt="shrink-it" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shorten;
