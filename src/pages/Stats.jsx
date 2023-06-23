import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Dock from "../assets/svgs/window-dock.61b82738.svg";
import Illustration from "../assets/images/url-detail-illustration.47183ff0.png";
import { IoChevronBackOutline } from "react-icons/io5";

const Stats = () => {
  // get the id from the url
  const id = window.location.pathname.split("/")[2];
  // console.log(id);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/v1/urls/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        setStats(data.url);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="statPage min-vh-100 w-100 pb-5">
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
      <h3 className="text-center mb-5">Detailed Stats</h3>
      <div className="container d-flex align-items-center justify-content-center gap-5 ">
        <div>
          <div className="d-flex align-items-center">
            <img src={Dock} alt="" className="me-3" />{" "}
            <p className="mb-0">{stats.shortUrl} </p>
          </div>
          <p className="mb-3">
            The total number of clicks that your link has received so far:
          </p>
          <p>
            <span className="noOfClicks">{stats.noOfClicks}</span> <br /> Clicks
          </p>
          <div className="linksContainer  w-100">
            <table>
              <thead>
                <tr>
                  <th>xyz</th>
                  <th>Location</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>China</td>
                  <td>Japan </td>
                  <td>2 hours ago</td>
                </tr>
                <tr>
                  <td>China</td>
                  <td>Japan </td>
                  <td>2 hours ago</td>
                </tr>
                <tr>
                  <td>China</td>
                  <td>Japan </td>
                  <td>2 hours ago</td>
                </tr>
                <tr>
                  <td>China</td>
                  <td>Japan </td>
                  <td>2 hours ago</td>
                </tr>
                <tr>
                  <td>China</td>
                  <td>Japan </td>
                  <td>2 hours ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="imageContainer">
          <img src={Illustration} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Stats;
