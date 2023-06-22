import { useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { TbCopy } from "react-icons/tb";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MainUrl from "./MainUrl";
import GeneratedUrl from "./GeneratedUrl";

const RecentUrlList = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopied = () => {
    setIsCopied(!isCopied);
  };

  return (
    <div className="recentList">
      <div className="container">
        <div className="leftIcon">
          <BsGlobe />
        </div>

        <div className="rightContents">
          <div className="left">
            <h3>Facebook</h3>
            <MainUrl mainUrl={props.mainUrl} />
            <GeneratedUrl shortenedUrl={props.shortenedUrl} />
            <p className="time">{`${props.time} hours ago`}</p>
          </div>

          <div className="right">
            <button>Detailed stats</button>

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
