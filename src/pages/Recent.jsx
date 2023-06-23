import { useEffect, useState } from "react";
import RecentUrlList from "../components/RecentUrlList";
// import UrlForm from "../../components/UrlForm";
import Header from "../components/Header";

const recentInfo = [
  {
    mainUrl: "facebook.com/has67/dh/8/sf7d809s",
    shortenedUrl: "bub.junyong.me/florals",
    time: "1",
  },
  {
    mainUrl: "facebook.com/has67/dh/8/sf7d809s",
    shortenedUrl: "bub.junyong.me/florals",
    time: "2",
  },
  {
    mainUrl: "facebook.com/has67/dh/8/sf7d809s",
    shortenedUrl: "bub.junyong.me/florals",
    time: "3",
  },
  {
    mainUrl: "facebook.com/has67/dh/8/sf7d809s",
    shortenedUrl: "bub.junyong.me/florals",
    time: "4",
  },
  {
    mainUrl: "facebook.com/has67/dh/8/sf7d809s",
    shortenedUrl: "bub.junyong.me/florals",
    time: "5",
  },
];

const Recent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/api/v1/urls/user")
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result.urls);
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
