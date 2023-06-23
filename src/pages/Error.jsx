import Header from "../components/Header";
import NotFound from "../assets/svgs/page-not-found.e08ecdda.svg";

const Error = () => {
  return (
    <div className="errorPage min-vh-100 px-3 pb-5">
      <Header />
      <div className="mx-auto my-5 cont">
        <img src={NotFound} alt="" className="w-100" />
      </div>
      <h1 className="text-center">PAGE NOT FOUND</h1>
      <p className="text-center mx-auto">
        We can’t seem to find the page you’re looking for. <br /> The link you
        followed may be broken or you may have entered the wrong link.
      </p>
    </div>
  );
};

export default Error;
