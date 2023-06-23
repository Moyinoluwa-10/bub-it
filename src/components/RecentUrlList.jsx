import { useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { TbCopy } from "react-icons/tb";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MainUrl from "./MainUrl";
import GeneratedUrl from "./GeneratedUrl";
import { Link } from "react-router-dom";

const RecentUrlList = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopied = () => {
    setIsCopied(!isCopied);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const convertDateTimeToTimeAgo = (dateTime) => {
    const date = new Date(dateTime);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    console.log(seconds);
    const intervals = {
      year: Math.floor(seconds / 31536000),
      month: Math.floor(seconds / 2592000),
      week: Math.floor(seconds / 604800),
      day: Math.floor(seconds / 86400),
      hour: Math.floor(seconds / 3600),
      minute: Math.floor(seconds / 60),
      second: seconds,
    };

    let timeAgo;
    console.log(intervals.hour);

    if (intervals.year > 1) {
      timeAgo = `${intervals.year} years ago`;
    } else if (intervals.year === 1) {
      timeAgo = `${intervals.year} year ago`;
    } else if (intervals.month > 1) {
      timeAgo = `${intervals.month} months ago`;
    } else if (intervals.month === 1) {
      timeAgo = `${intervals.month} month ago`;
    } else if (intervals.week > 1) {
      timeAgo = `${intervals.week} weeks ago`;
    } else if (intervals.week === 1) {
      timeAgo = `${intervals.week} weeks ago`;
    } else if (intervals.day > 1) {
      timeAgo = `${intervals.day} days ago`;
    } else if (intervals.day === 1) {
      timeAgo = `${intervals.day} days ago`;
    } else if (intervals.hour > 1) {
      timeAgo = `${intervals.hour} hours ago`;
    } else if (intervals.hour === 1) {
      timeAgo = `${intervals.hour} hour ago`;
    } else if (intervals.minute > 1) {
      timeAgo = `${intervals.minute} minutes ago`;
    } else if (intervals.minute === 1) {
      timeAgo = `${intervals.hour} minute ago`;
    } else {
      timeAgo = `${intervals.second} seconds ago`;
    }

    return timeAgo;
  };

  // console.log(convertDateTimeToTimeAgo(new Date("2019-01-29 00:00:00")));

  return (
    <div className="recentList">
      <div className="container containerRecent">
        <div className="leftIcon">
          <BsGlobe />
        </div>

        <div className="rightContents">
          <div className="left">
            <MainUrl mainUrl={props.mainUrl} />
            <GeneratedUrl shortenedUrl={props.shortenedUrl} />
            <p className="time mb-md-0 mb-3">{`${convertDateTimeToTimeAgo(
              props.time
            )}`}</p>
          </div>

          <div className="right">
            <Link to={`/urls/${props.id}`}>
              <button className="stat-btn">Detailed stats</button>
            </Link>

            <div className="copy">
              <CopyToClipboard text={props.shortenedUrl}>
                <button className="copied" onClick={handleCopied}>
                  <TbCopy />
                  Copy
                </button>
              </CopyToClipboard>
              {isCopied ? <span>Copied</span> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentUrlList;
