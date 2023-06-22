import { useState } from "react";

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
        <h2>Shrink It</h2>
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
        <button className="login">Log in</button>
        <button className="signUp">Sign up</button>
      </nav>
    </header>
  );
};

export default Header;
