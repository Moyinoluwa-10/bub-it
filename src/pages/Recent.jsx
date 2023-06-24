import { useEffect, useState } from "react";
import RecentUrlList from "../components/RecentUrlList";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import OhNo from "../assets/svgs/oh-no.d080be86.svg";
import axios from "axios";

const Recent = () => {
  const [data, setData] = useState([]);
  const [isCountZero, setIsCountZero] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL}/urls/user`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        const { data } = res;
        if (data.count === 0) setIsCountZero(true);
        setData(data.urls);
      }) // eslint-disable-next-line
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <div className="recentPage w-100 px-3 min-vh-100">
      <Header />

      {!isLoggedIn && (
        <div className="noRecent">
          <div className="imageContainer mx-auto mb-4 mt-5">
            <img src={OhNo} alt="" className="w-100" />
          </div>
          <p className="text-center mb-4">
            You need to be logged in to view your bub URLs. <br /> Log in now
          </p>
          <Link to={"/sign_in"} className="icon-box mx-auto d-block">
            Log In
          </Link>
        </div>
      )}

      <h2 className="mt-5 text-center">Your Recent Bub-URLs</h2>

      <div className="py-5">
        {isCountZero && (
          <div className="noRecent">
            <div className="imageContainer mx-auto mb-4">
              <img src={OhNo} alt="" className="w-100" />
            </div>
            <p className="text-center mb-4">
              You have not created any Bub-URLs yet. <br /> Let's create a new
              one!
            </p>
            <Link to={"/"} className="icon-box mx-auto d-block">
              <BiHome className="home" />
            </Link>
          </div>
        )}
        {data &&
          data.map((data) => {
            return (
              <RecentUrlList
                key={data._id}
                mainUrl={data.longUrl}
                shortenedUrl={data.shortUrl}
                time={data.createdAt}
                id={data._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Recent;
