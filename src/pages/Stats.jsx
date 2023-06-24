import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Dock from "../assets/svgs/window-dock.61b82738.svg";
import Illustration from "../assets/images/url-detail-illustration.47183ff0.png";
import { IoChevronBackOutline, IoPersonOutline } from "react-icons/io5";
import TimeAgo from "../utils/timeAgo";

const Stats = () => {
  const id = window.location.pathname.split("/")[2];
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/v1/urls/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setStats(data.url);
          setIsLoading(false);
        } else {
          window.location.href = "/error";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="statPage min-vh-100 w-100 pb-5 px-3">
      <Header />
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
              <img src={stats.qrcode} alt="qrcode image" />
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
              <div className="urls d-flex align-items-center">
                <img src={Dock} alt="" className="me-3 dock-image" />{" "}
                <p className="mb-0">
                  <a href={stats.shortUrl}>
                    {stats.shortUrl && stats.shortUrl.substring(8)}
                  </a>{" "}
                </p>
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
