import { useState } from "react";

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
        <div className="logoText">
          <h2>Shrink It</h2>
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
          <button className="login">Log in</button>
          <button className="signUp">Sign up</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
