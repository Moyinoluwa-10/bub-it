import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="logoText">
        <h2>Bub It</h2>
      </div>
      <nav>
        <button className="login">Login</button>
        <button className="signUp">SignUp</button>
      </nav>
    </header>
  );
};

export default Header;
