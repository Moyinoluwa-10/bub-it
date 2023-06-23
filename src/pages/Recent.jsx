import { useEffect, useState } from "react";
import RecentUrlList from "../components/RecentUrlList";
// import UrlForm from "../../components/UrlForm";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import OhNo from "../assets/svgs/oh-no.d080be86.svg";

// const recentInfo = [
//   {
//     mainUrl: "facebook.com/has67/dh/8/sf7d809s",
//     shortenedUrl: "bub.junyong.me/florals",
//     time: "1",
//   },
//   {
//     mainUrl: "facebook.com/has67/dh/8/sf7d809s",
//     shortenedUrl: "bub.junyong.me/florals",
//     time: "2",
//   },
//   {
//     mainUrl: "facebook.com/has67/dh/8/sf7d809s",
//     shortenedUrl: "bub.junyong.me/florals",
//     time: "3",
//   },
//   {
//     mainUrl: "facebook.com/has67/dh/8/sf7d809s",
//     shortenedUrl: "bub.junyong.me/florals",
//     time: "4",
//   },
//   {
//     mainUrl: "facebook.com/has67/dh/8/sf7d809s",
//     shortenedUrl: "bub.junyong.me/florals",
//     time: "5",
//   },
// ];

const Recent = () => {
  const [data, setData] = useState([]);
  const [isCountZero, setIsCountZero] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/api/v1/urls/user")
      .then((response) => response.json())
      .then((result) => {
        if (result.count === 0) setIsCountZero(true);
        console.log(result);
        setData(result.urls);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="recentPage w-100 px-3 min-vh-100">
      <Header />

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
        {/* {recentInfo.map((recentInfo, key) => {
          return (
            <RecentUrlList
              key={key}
              mainUrl={recentInfo.mainUrl}
              shortenedUrl={recentInfo.shortenedUrl}
              time={recentInfo.time}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default Recent;
