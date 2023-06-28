const CustomUrl = (props) => {
  return (
    <div>
      <p className="mb-0 shortenedUrl">
        <a href={props.customUrl} className="shortenedUrl">
          {props.customUrl.substring(8)}
        </a>
      </p>
    </div>
  );
};

export default CustomUrl;
