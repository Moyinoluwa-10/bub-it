const MainUrl = (props) => {
  return (
    <div>
      <p className="mb-0">
        Original URL -{" "}
        <a href={props.mainUrl} className="mainUrl">
          {props.mainUrl}
        </a>
      </p>
    </div>
  );
};

export default MainUrl;
