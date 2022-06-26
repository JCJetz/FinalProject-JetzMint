import 'dotenv/config'
//contains all the Twitter API consumer keys, and database configs. 
//You can copy them and put your own keys.


// SLACK TOKENS
export const SLACK_TOKENS = {
  SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET
};
  
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const MONGODB = {
  //mongodb+srv://JCJetz:<password>@clusteruno.qtpfg.mongodb.net/?retryWrites=true&w=majority
  MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tsuyqql.mongodb.net/NFTProject?retryWrites=true&w=majority`
  //MONGODB_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@ds<SOME_DOMAIN>.mlab.com:<PORT>/<PROJECT_NAME>`
};

export const SESSION = {
  COOKIE_KEY: "jetzmintcookie"
};

