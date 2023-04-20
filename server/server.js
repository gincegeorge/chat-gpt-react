import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('./public'));


app.get("/", async (req, res) => {
    res.status(200).send({
        message:
            "This is ChatGPT AI APP server url, please visit https://chatgpt-ai-app-od21.onrender.com",
    });
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/', async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.input,
            temperature: .5,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        console.log("Passed Q:", req.body.input);
        console.log(response.data.choices[0].text);

        res.status(200).send({ bot: response.data.choices[0].text })
    }
    catch (error) {

        console.log("Failed Q:", req.body.input);
        console.log(error);

        res.status(500).send(error)
    }
})

app.listen(4000, () => console.log("server started on http://localhost:4000"))
