import { useState } from "react";

const UrlForm = (props) => {
  const [enteredUrl, setEnteredUrl] = useState("");

  const urlChangeHandler = (event) => {
    // console.log(enteredUrl);
    setEnteredUrl(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const all = {
      mainUrl: enteredUrl,
    };
    props.saveUrlHandler(all);
    // console.log(all);
    // console.log(`${all} urlForm`);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="mainUrl">Enter your Url</label>
        <input
          type="url"
          value={enteredUrl}
          name="mainUrl"
          onChange={urlChangeHandler}
        />
        <button type="submit">Bub it</button>
      </form>
    </div>
  );
};

export default UrlForm;
