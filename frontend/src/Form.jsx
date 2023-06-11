import React, { useState } from "react";

const Form = () => {
  // write a function that allows me to display a drop down form when a button is clicked in jsx
  const [dropdown, setDropdown] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");
  const [prompt, setPrompt] = useState("hello");
  const [GPTResponse, setGPTResponse] = useState("");
  const showDropdown = () => {
    setDropdown(!dropdown);
  };
  const handleChange = (e) => {
    if (e.target.name === "brand") {
      setBrand(e.target.value);
    } else if (e.target.name === "model") {
      setModel(e.target.value);
    } else if (e.target.name === "description") {
      setProblem(e.target.value);
    }
  };

  console.log(`Brand: ${brand} Make: ${model} Problem: ${problem}`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPrompt(
      `I have a ${brand} ${model} and it is ${problem}, what diagnosis can you provide me on the issue. Reply in the following structure: what you think is the problem, what is the diagnosis, what is the treatment. try to be as in-depth as you can be. If you are unable to provide an answer then please reply with "I am unable to provide an answer"`
    );
    try {
      const response = await fetch("http://localhost:3000/send-string", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stringData: prompt }),
      });

      if (response.ok) {
        const gptResponse = await response.text();
        // Process the generated completion as needed
        setGPTResponse(gptResponse);
        console.log(GPTResponse);

        console.log("String sent successfully!");
        // Perform any additional actions upon successful response
      } else {
        console.error("Error sending string:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending string:", error.message);
    }
    console.log(prompt);
    setDropdown(false);
    setBrand("");
    setModel("");
    setProblem("");
  };
  return (
    <main>
      <div>
        <button onClick={showDropdown}>
          {dropdown ? "Hide" : "Show"}
          Dropdown
        </button>
        {dropdown && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              onChange={handleChange}
            ></input>
            <label htmlFor="model">Model</label>
            <input
              type="text"
              name="model"
              id="model"
              onChange={handleChange}
            ></input>
            <input type="submit" value="Submit" id="submit"></input>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
            ></textarea>
          </form>
        )}
        {GPTResponse && <h6>{GPTResponse}</h6>}
      </div>
    </main>
  );
};

export default Form;
