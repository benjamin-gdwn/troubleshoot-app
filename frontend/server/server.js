const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const cors = require("cors");
const port = 3000;
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());
async function generateCompletion() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "hello",
    temperature: 0,
    max_tokens: 7,
  });

  console.log(JSON.stringify(response.data.choices[0].text));
}

generateCompletion();

// Route for the homepage
app.post("/send-string", (req, res) => {
  const data = req.body;
  console.log(data.stringData);
  async function generateCompletion() {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: data.stringData,
      temperature: 0,
      max_tokens: 100,
    });

    console.log(JSON.stringify(response.data.choices[0].text));
    const gptResponse = JSON.stringify(response.data.choices[0].text);
    res.send(gptResponse);
  }
  generateCompletion();
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  // console.log(`Server listening on port ${port}`);
});
