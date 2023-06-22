import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { TbCopy } from "react-icons/tb";
import { GrClose } from "react-icons/gr";
// import { Link } from "react-router-dom";

const Modal = ({ closeModal, shortUrl }) => {
  const closeModalHandler = () => {
    closeModal(false);
  };

  const [isCopied, setIsCopied] = useState(false);
  const handleCopied = () => {
    setIsCopied(!isCopied);
    setGeneratedUrl("");
  };

  const [generatedUrl, setGeneratedUrl] = useState(shortUrl);

  return (
    <div className="modalSection">
      <div className="overLay" onClick={closeModalHandler}></div>
      <div className="modalContainer">
        <div className="closeBtn">
          <button onClick={closeModalHandler}>
            <GrClose className="close" />
          </button>
        </div>
        <div className="title">Your Shortened Shrink-URL:</div>
        <div className="body">
          <div className="inputCopy">
            <input type="url" value={shortUrl} readOnly />
            <CopyToClipboard text={generatedUrl}>
              <button className="copyIcon" onClick={handleCopied}>
                <TbCopy className="copy" />
              </button>
            </CopyToClipboard>
          </div>
          {isCopied ? <span>Copied</span> : null}
        </div>
        <div className="footer">
          {/* <Link onClick={closeModalHandler}>My URLs</Link> */}
          <a
            href={generatedUrl}
            className="out"
            target={"_blank"}
            rel={"noreferrer"}
          >
            Go to site
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
