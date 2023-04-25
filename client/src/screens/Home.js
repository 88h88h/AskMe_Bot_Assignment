import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [isloading, setIsloading] = useState(false);
  const handleSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();
    setLink("");
    const response = await fetch("http://localhost:5000/api/convert2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: link,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.successdatabase) {
      alert("Server Error");
    } else {
      setIsloading(false);
      navigate(`/query/${link.split("?")[1]}`);
    }
  };
  const handleClick = async (e) => {
    setIsloading(true);
    const response = await fetch("http://localhost:5000/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: "https://www.youtube.com/watch?v=oL1uem6-3m4&ab_channel=BasicoServiceNowLearning",
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.successdatabase) {
      alert("Server Error");
    } else {
      setIsloading(false);
      navigate("/query/v=oL1uem6-3m4&ab_channel=BasicoServiceNowLearning");
    }
  };
  const onChange = (e) => {
    const value = e.target.value;
    setLink(value);
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>AskMe Bot</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            name="link"
            value={link}
            onChange={onChange}
            className="form-control"
            placeholder="Write the youtube URL"
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Send
          </button>
        </div>
      </form>

      <button
        className="btn btn-outline-secondary m-3 w-50"
        id="button-addon2"
        onClick={handleClick}
      >
        If you want to test the assignment youtube link
      </button>
      {isloading && <div>LOADING, Please wait a few minutes...</div>}
    </div>
  );
}
