import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Header = ({ Nav }) => {
  const navigate = useNavigate();
  const [responsive, setResponsive] = useState(false);
  const handleClick = () => {
    setResponsive(!responsive);
    setShowNav(!showNav);
  };
  const [showNav, setShowNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // const url = "/api/v1/users/showMe";
    // const url = "http://localhost:5000/api/v1/users/showMe";
    const url = "https://api-bub-it.vercel.app/api/v1/users/showMe";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(true);
          return response.json();
        }
      }) // eslint-disable-next-line
      .then((result) => {})
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    // const url = "/api/v1/auth/logout";
    // const url = "http://localhost:5000/api/v1/auth/logout";
    const url = "https://api-bub-it.vercel.app/api/v1/auth/logout";
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(false);
          navigate("/");
          return response.json();
        }
      }) // eslint-disable-next-line
      .then((result) => {})
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  };

  return (
    <header className="header w-100">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logoContainer">
          <Link to="/">
            <img src={Logo} alt="" className="w-100" />
          </Link>
        </div>

        {isLoggedIn && (
          <div>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {Nav && !isLoggedIn && (
          <>
            <div
              className={responsive ? "hamburger active" : "hamburger"}
              onClick={handleClick}
            >
              <span className="line d-block"></span>
              <span className="line d-block"></span>
              <span className="line d-block"></span>
            </div>
            <nav
              className={
                showNav ? "navigation-menu expanded" : "navigation-menu"
              }
            >
              <Link to={"/sign_in"}>
                <button className="login">Log in</button>
              </Link>
              <Link to={"/sign_up"}>
                <button className="signUp">Sign up</button>
              </Link>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
