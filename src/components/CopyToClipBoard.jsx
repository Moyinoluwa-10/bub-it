import  { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { TbCopy } from "react-icons/tb";

const CopyToClipBoard = (props) => {
  const [isCopied, setisCopied] = useState(false);
  const handleCopied = () => {
    setisCopied(!isCopied);
  };
  return (
    <div>
      <CopyToClipboard text={props.shortenedUrl}>
        <button className="copied" onClick={handleCopied}>
          <TbCopy />
          Copy
        </button>
      </CopyToClipboard>
      {isCopied ? <span>Copied</span> : null}
    </div>
  );
};

export default CopyToClipBoard;
