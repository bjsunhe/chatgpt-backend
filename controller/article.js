const {Article} = require('../model')

const { Configuration, OpenAIApi } = require("openai") 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);







const addArticle=async (req,res,next)=>{

    try{

        const title = req.body.title || '';
        const prompt=req.body.prompt || '';
        const source=req.body.source || '';
        const content=req.body.content || '';
        const result=req.body.result || '';
        const author=req.body.author || '';




        const model= req.body.config.model || "text-davinci-003";
        const temperature = req.body.config.temperature || '0';
        const max_tokens = req.body.config.max_tokens || 60;
        const top_p = req.body.config.top_p || 1.0;
        const frequency_penalty = req.body.config.frequency_penalty || 0.0;
        const presence_penalty = req.body.config.presence_penalty || 0.0;
      
      
      
        if (title.trim().length === 0) {
          res.status(400).json({
            error: {
              message: "Please enter a valid article",
            }
          });
          return;
        }
      
        let completion={}

        try{
            completion = await openai.createCompletion({
                prompt,
                model,
                temperature: 0,
                max_tokens: 100,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
                'max_tokens':2048
            });

            const article=new Article({
                title,
                prompt,
                source,
                content,
                result:completion.data.choices[0].text,
                author
            })
            await article.save()
            res.status(200).json(
                {
                    article
                }
            )
        }catch(error) {
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


        

        
    }catch(error){
        next(error)
    }
}


const showArticles= async (req,res,next)=>{
    try{
        const articles= await Article.find({})
        res.status(200).json({
            articles
        })
    }catch(error){
        next(error)
    }
}


module.exports={
    addArticle,
    showArticles

}