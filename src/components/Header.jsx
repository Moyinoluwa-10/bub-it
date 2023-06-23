import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Header = () => {
  const [responsive, setResponsive] = useState(false);
  const handleClick = () => {
    setResponsive(!responsive);
    setShowNav(!showNav);
  };
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="header w-100">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logoContainer">
          <Link to="/">
            <img src={Logo} alt="" className="w-100" />
          </Link>
        </div>
        <div
          className={responsive ? "hamburger active" : "hamburger"}
          onClick={handleClick}
        >
          <span className="line d-block"></span>
          <span className="line d-block"></span>
          <span className="line d-block"></span>
        </div>
        <nav
          className={showNav ? "navigation-menu expanded" : "navigation-menu"}
        >
          <Link to={"/sign_in"}>
            <button className="login">Log in</button>
          </Link>
          <Link to={"/sign_up"}>
            <button className="signUp">Sign up</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
