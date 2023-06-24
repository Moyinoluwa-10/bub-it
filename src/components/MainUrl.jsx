const MainUrl = (props) => {
  return (
    <div>
      <p className="mb-0 mainUrl">
        <a href={props.mainUrl} className="mainUrl">
          {props.mainUrl.substring(8)}
        </a>
      </p>
    </div>
  );
};

export default MainUrl;
