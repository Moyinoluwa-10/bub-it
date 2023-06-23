const GeneratedUrl = (props) => {
  return (
    <div>
      <p className="mb-0">
        Bub URL -{" "}
        <a href={props.shortenedUrl} className="shortenedUrl">
          {props.shortenedUrl}
        </a>
      </p>
    </div>
  );
};

export default GeneratedUrl;
