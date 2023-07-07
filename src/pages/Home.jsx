import { Link } from "react-router-dom";
import RightImage from "../assets/images/hero.png";
import Header from "../components/Header";
import Savings from "../components/Features";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="homePage w-100% px-2 min-vh-100">
        <Header Nav={true} verifyUser={true} />
        <div className="container homeContainer d-flex align-items-center justify-content-between gap-md-4 gap-5 mt-5">
          <div className="leftSection w-100">
            <h1 className="mb-4">Shorten your long URLs</h1>
            <p className="mb-5">
              Bub-it is the hub of everything that has to do with your link
              management. We shorten your URLs, allow you create custom ones for
              your personal, business, event usage. Our swift QR code creation,
              management and usage tracking with advance analytics for all of
              these is second to none.
            </p>
            <Link to={"/bub"} className="btns">
              Try for free
            </Link>
          </div>
          <div className="rightSection">
            <img src={RightImage} alt="shrink-it" />
          </div>
        </div>
        <Savings />
        <Footer />
      </div>
    </>
  );
};

export default Home;
