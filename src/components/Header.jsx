import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import axios from "axios";

const Header = ({ Nav, checkLoggedIn }) => {
  const navigate = useNavigate();
  const [responsive, setResponsive] = useState(false);
  const handleClick = () => {
    setResponsive(!responsive);
    setShowNav(!showNav);
  };
  const [showNav, setShowNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL}/users/showMe`;
    axios
      .get(url, { withCredentials: true })
      // eslint-disable-next-line
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
      }) // eslint-disable-next-line
      .catch((err) => {
        // console.log(err);
        setIsLoggedIn(false);
      });

    {
      checkLoggedIn && checkLoggedIn(isLoggedIn);
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const handleLogout = () => {
    const url = `${import.meta.env.VITE_URL}/auth/logout`;
    axios
      .delete(url, { withCredentials: true })
      // eslint-disable-next-line
      .then((res) => {
        // console.log(res);
        setIsLoggedIn(false);
        navigate("/");
      }) // eslint-disable-next-line
      .catch((err) => {
        // console.log(err);
      });
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
