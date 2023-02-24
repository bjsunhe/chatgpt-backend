import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: 'sk-NJlkpvyVS6kYlS5eNDi8T3BlbkFJJRAOyyNUJO6JdCUY7TDLcd',
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  

  const animal = req.body.animal || '';
  const prompt=req.body.config.prompt || '';
  const model= req.body.config.model || "text-davinci-003";
  const temperature = req.body.config.temperature || '0';
  const max_tokens = req.body.config.max_tokens || 60;
  const top_p = req.body.config.top_p || 1.0;
  const frequency_penalty = req.body.config.frequency_penalty || 0.0;
  const presence_penalty = req.body.config.presence_penalty || 0.0;



  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid article",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      prompt,
      model,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      'max_tokens':2048
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    // res.status(200).json({ result: prompt });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
