import React, { useState } from "react";

const Header = () => {
  const [responsive, setResponsive] = useState(false);
  const handleClick = () => {
    setResponsive(!responsive);
    setShowNav(!showNav);
  };
  const [showNav, setShowNav] = useState(false);

  return (
    <header className="header">
      <div className="logoText">
        <h2>Bub It</h2>
      </div>
      <div
        className={responsive ? "hamburger active" : "hamburger"}
        onClick={handleClick}
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <nav className={showNav ? "navigation-menu expanded" : "navigation-menu"}>
        <button className="login">Login</button>
        <button className="signUp">SignUp</button>
      </nav>
    </header>
  );
};

export default Header;
