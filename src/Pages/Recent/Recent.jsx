import React from "react";
import "../../Styles/styles.scss";
import RecentUrlList from "../../Components/RecentUrlList";
import UrlForm from "../../Components/UrlForm";

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
const Recent = (props) => {
  const saveUrlHandler = (all) => {
    const urlData = {
      ...all,
      id: Math.random().toString,
    };
    console.log(urlData);
  };
  return (
    <div className="recentPage">
      <UrlForm onSaveUrlHandler={saveUrlHandler} />

      {recentInfo.map((recentInfo) => {
        return (
          <RecentUrlList
            mainUrl={recentInfo.mainUrl}
            shortenedUrl={recentInfo.shortenedUrl}
            time={recentInfo.time}
          />
        );
      })}
    </div>
  );
};

export default Recent;
