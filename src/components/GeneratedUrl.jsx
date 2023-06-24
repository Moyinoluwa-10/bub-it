const GeneratedUrl = (props) => {
  return (
    <div>
      <p className="mb-0 shortenedUrl">
        <a href={props.shortenedUrl} className="shortenedUrl">
          {props.shortenedUrl.substring(8)}
        </a>
      </p>
    </div>
  );
};

export default GeneratedUrl;
