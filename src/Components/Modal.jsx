import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { TbCopy } from "react-icons/tb";
import { Link } from "react-router-dom";

const Modal = ({ closeModal }) => {
  const closeModalHandler = () => {
    closeModal(false);
  };

  const [isCopied, setisCopied] = useState(false);
  const handleCopied = () => {
    setisCopied(!isCopied);
    setgeneratedUrl("");
  };
  const [generatedUrl, setgeneratedUrl] = useState("");
  const handleGeneratedUrl = (e) => {
    setgeneratedUrl(e.target.value);
  };

  return (
    <div className="modal">
      <div className="overLay" onClick={closeModalHandler}></div>
      <div className="modalContainer">
        <div className="closeBtn">
          <button onClick={closeModalHandler}>X</button>
        </div>
        <div className="title">Your Shortened Bub-URL:</div>
        <div className="body">
          <div className="inputCopy">
            <input
              type="url"
              //   value={"http://localhost:3000"}
              onChange={handleGeneratedUrl}
            />
            <CopyToClipboard text={generatedUrl}>
              <button className="copyIcon" onClick={handleCopied}>
                <TbCopy />
                {isCopied ? <span>Copied</span> : null}
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="footer">
          <Link onClick={closeModalHandler}>My URl</Link>
          <button onClick={closeModalHandler}>Detailed stats</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
