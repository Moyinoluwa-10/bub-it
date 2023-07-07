import {
  AiFillLinkedin,
  AiOutlineGithub,
  AiOutlineMail,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer py-4 px-3">
      <p className="text-center mb-3">
        Made by <a href="https://moyinadelowo.vercel.app">Moyinoluwa Adelowo</a>
      </p>
      <div className="d-flex align-items-center justify-content-center gap-3 socials">
        <a href="https://www.linkedin.com/in/moyinoluwa-adelowo/">
          <AiFillLinkedin className="icons" />
        </a>
        <a href="https://twitter.com/rotii_mii">
          <AiOutlineTwitter className="icons" />
        </a>
        <a href="https://github.com/Moyinoluwa-10">
          <AiOutlineGithub className="icons" />
        </a>
        <a href="mailto:moyinadelowo@gmail.com">
          <AiOutlineMail className="icons" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
