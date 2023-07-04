import { useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { TbCopy } from "react-icons/tb";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MainUrl from "./MainUrl";
import GeneratedUrl from "./GeneratedUrl";
import { Link } from "react-router-dom";
import TimeAgo from "../utils/timeAgo";
import CustomUrl from "./CustomUrl";

const RecentUrlList = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopied = () => {
    setIsCopied(!isCopied);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="recentList">
      <div className="container containerRecent">
        <div className="leftIcon">
          <BsGlobe />
        </div>

        <div className="rightContents gap-md-4">
          <div className="left">
            <MainUrl mainUrl={props.mainUrl} />
            <GeneratedUrl shortenedUrl={props.shortenedUrl} />
            {props.customUrl && <CustomUrl customUrl={props.customUrl} />}
            <p className="time mb-md-0 mb-3">{`${TimeAgo(props.time)}`}</p>
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
