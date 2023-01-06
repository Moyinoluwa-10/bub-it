import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { ImLink } from "react-icons/im";
// import { Link } from "react-router-dom";
import "../../Styles/styles.scss";
import RightImage from "../../Assets/Images/www-amico.png";
import Modal from "../../Components/Modal";
import Header from "../../Components/Header";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const [shorturl, setShortUrl] = useState();

  return (
    <div className="homePage">
      {openModal && <Modal closeModal={setOpenModal} shortUrl={shorturl} />}
      <Header />
      <div className="container">
        <div className="leftSection">
          <Formik
            initialValues={{
              longUrl: "",
            }}
            onSubmit={async (values) => {
              const url = "https://api-shortener.vercel.app/api/v0/url/shorten";
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
                  setShortUrl(result.url.shortUrl);
                  setTimeout(() => {
                    openModalHandler();
                  }, 2200);
                })
                .catch((err) => {
                  console.log(err);
                  alert("An error occured. Please try again later.");
                });
            }}
          >
            <Form>
              <div className="longUrl">
                <label htmlFor="longUrl">
                  <ImLink className="link" />
                  Enter your long URL here
                </label>
                <Field
                  type="url"
                  id="longUrl"
                  name="longUrl"
                  placeholder="http://localhost:3000/"
                  required
                />
              </div>
              {/* <div className="alias">
                <label htmlFor="alias">
                  <ImLink /> Customize your link
                </label>
                <div className="aliasInput">
                  <Field id="alias" name="alias" placeholder="bub.junyong.me" />
                  <button disabled>Alias</button>
                </div>
              </div> */}

              <div className="buttons">
                {/* <Link>My Url</Link> */}
                <button type="submit">Shrink It</button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="rightSection">
          <img src={RightImage} alt="shrink-it" />
        </div>
      </div>
    </div>
  );
};

export default Home;
