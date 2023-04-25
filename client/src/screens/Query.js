import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Query() {
  const params = useParams();
  console.log(params);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isloading, setIsloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("");
    setIsloading(true);
    const response = await fetch(
      params.video === "v=oL1uem6-3m4&ab_channel=BasicoServiceNowLearning"
        ? "http://localhost:5000/api/chat"
        : "http://localhost:5000/api/chat2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: `https://www.youtube.com/watch?${params.video}`,
          query: query,
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Server Error");
    }

    setQuery("");
    setIsloading(false);
    setAnswer(json.answer.text);
  };
  const onChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            name="query"
            value={query}
            onChange={onChange}
            className="form-control"
            placeholder="Ask Me Something"
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

      {isloading && <div>LOADING...</div>}
      <p>{answer}</p>
    </div>
  );
}
