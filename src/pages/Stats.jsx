import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Dock from "../assets/svgs/window-dock.61b82738.svg";
import Illustration from "../assets/images/url-detail-illustration.47183ff0.png";
import { IoChevronBackOutline, IoPersonOutline } from "react-icons/io5";
import { HiQrcode } from "react-icons/hi";
import { BsDownload, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import TimeAgo from "../utils/timeAgo";
import axios from "axios";
import { saveAs } from "file-saver";

const Stats = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/")[2];
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL}/urls/${id}`;

    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        const { data } = res;
        setStats(data.url);
        setIsLoading(false);
      }) // eslint-disable-next-line
      .catch((err) => {
        // console.log(err);
        window.location.href = "/error";
      });
    // eslint-disable-next-line
  }, []);

  const disableLink = () => {
    const url = `${import.meta.env.VITE_URL}/urls/disable/${id}`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        const { data } = res;
        setStats(data.url);
      }) // eslint-disable-next-line
      .catch((err) => {
        // console.log(err);
      });
  };

  const enableLink = () => {
    const url = `${import.meta.env.VITE_URL}/urls/enable/${id}`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        const { data } = res;
        setStats(data.url);
      }) // eslint-disable-next-line
      .catch((err) => {
        // console.log(err);
      });
  };

  const generateQrcode = () => {
    const url = `${import.meta.env.VITE_URL}/urls/generate/${id}`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        const { data } = res;
        setStats(data.url);
      }) // eslint-disable-next-line
      .catch((err) => {
        // console.log(err);
      });
  };

  const deleteUrl = () => {
    const url = `${import.meta.env.VITE_URL}/urls/${id}`;
    axios
      .delete(url, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        // eslint-disable-next-line
        const { data } = res;
        navigate("/urls");
      }) // eslint-disable-next-line
      .catch((err) => {
        // console.log(err);
      });
  };

  const downloadImg = () => {
    saveAs(stats.qrcode, "qrcode.png");
  };

  return (
    <div className="statPage min-vh-100 w-100 pb-5 px-3">
      <Header verifyUser={true} />
      {isLoading}
      <div className="cont container">
        <Link
          to="/urls"
          className="back d-inline-flex align-items-center gap-2 mb-4 mt-5"
        >
          <IoChevronBackOutline /> Back to my URLs
        </Link>
      </div>
      <div className="container-md">
        <h3 className="text-center mb-5">Detailed Stats</h3>

        <div className="container d-flex align-items-center justify-content-center gap-5 statCont">
          <div>
            <div className="mb-3">
              {stats.qrcode && (
                <>
                  <img src={stats.qrcode} alt="qrcode image" />
                  <button
                    className="download d-flex align-items-center gap-3 px-3 py-1 mt-2"
                    onClick={downloadImg}
                  >
                    Download <BsDownload className="icon d-block mt-2 " />
                  </button>
                </>
              )}
              {!stats.qrcode && (
                <>
                  <button
                    className="download d-flex align-items-center gap-3 px-3 py-1 mt-2"
                    onClick={generateQrcode}
                  >
                    Generate Qrcode <HiQrcode className="icon" />
                  </button>
                </>
              )}
            </div>
            <div className="mb-3">
              <div className="urls d-flex align-items-center mb-2">
                <img src={Dock} alt="" className="me-3 dock-image" />{" "}
                <p className="mb-1">
                  <a href={stats.longUrl}>
                    {stats.longUrl && stats.longUrl.substring(8)}
                  </a>
                </p>
              </div>
              <div className="urls d-flex align-items-center mb-2">
                <img src={Dock} alt="" className="me-3 dock-image" />{" "}
                <p className="mb-0">
                  <a href={stats.shortUrl}>
                    {stats.shortUrl && stats.shortUrl.substring(8)}
                  </a>{" "}
                </p>
              </div>
              {stats.customUrl && (
                <div className="urls d-flex align-items-center">
                  <img src={Dock} alt="" className="me-3 dock-image" />{" "}
                  <p className="mb-0">
                    <a href={stats.customUrl}>
                      {stats.customUrl && stats.customUrl.substring(8)}
                    </a>{" "}
                  </p>
                </div>
              )}
            </div>
            <div className="d-flex gap-4 align-items-center">
              <div className="d-flex gap-2 align-items-center">
                <div className={`active ${stats.active}`}>
                  {stats.active ? "active" : "inactive"}
                </div>
                {!stats.active && (
                  <BsFillEyeSlashFill
                    className="icon d-inline-block"
                    onClick={enableLink}
                  />
                )}
                {stats.active && (
                  <BsFillEyeFill
                    className="icon d-inline-block"
                    onClick={disableLink}
                  />
                )}
              </div>
              <div>
                <button className="download px-3 py-1" onClick={deleteUrl}>
                  Delete
                </button>
              </div>
            </div>
            <p className="mb-3 clicks">
              The total number of clicks that your link has received so far:
            </p>
            <p className="text-center d-md-inline-block d-block">
              <span className="noOfClicks">
                {stats.noOfClicks && stats.noOfClicks}
              </span>{" "}
              <br /> Clicks
            </p>
            <div className="linksContainer w-100 mw-100">
              {stats.noOfClicks && stats.noOfClicks > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>IP</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.analytics &&
                      stats.analytics.map((analytic, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              <IoPersonOutline />
                            </td>
                            <td>{analytic.ip}</td>
                            <td>{TimeAgo(analytic.date)}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              ) : (
                <div className="text-center noClicks">
                  There are no clicks yet
                </div>
              )}
            </div>
          </div>

          <div className="imageContainer">
            <img src={Illustration} alt="illustration" className="w-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
