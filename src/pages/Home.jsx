import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { ImLink } from "react-icons/im";
import { Link } from "react-router-dom";
import RightImage from "../assets/images/hero.png";
import Modal from "../components/Modal";
import Header from "../components/Header";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const [shortUrl, setShortUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {openModal && <Modal closeModal={setOpenModal} shortUrl={shortUrl} />}
      <div className="homePage w-100% px-2 min-vh-100">
        <Header />
        <div className="container homeContainer d-flex align-items-center justify-content-between gap-md-4 gap-5 mt-5">
          <div className="leftSection w-100">
            <Formik
              initialValues={{
                longUrl: "",
                custom: "",
              }}
              onSubmit={async (values) => {
                setIsLoading(true);
                const url =
                  "https://api-shortener.vercel.app/api/v0/url/shorten";
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json())
                  .then((result) => {
                    // console.log(result);
                    if (result.status) {
                      setShortUrl(result.url.shortUrl);
                      setTimeout(() => {
                        openModalHandler();
                      }, 2200);
                      setIsLoading(false);
                    } else {
                      alert("An error occurred. Please try again later.");
                      setIsLoading(false);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                  });
              }}
            >
              <Form className="w-100">
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
                <div className="alias mb-4">
                  <label htmlFor="custom" className="mb-2">
                    <ImLink /> Customize your link
                  </label>
                  <div className="aliasInput">
                    <Field id="custom" name="custom" placeholder="conference" />
                    <button disabled>alias</button>
                  </div>
                </div>

                <div className="buttons">
                  <Link to={"/recent-urls"}>My URLs</Link>
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

export default Home;
