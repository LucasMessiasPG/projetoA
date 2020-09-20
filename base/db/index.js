import mongoose from "mongoose";
import mongo from "mongodb-memory-server";
export default async () => {

  let { DB_HOST, DB_PORT, DB_AUTH, DB_COLLECTION_AUTH } = process.env;
  let uri = "";

  if(!DB_HOST){
    let mongod = new mongo.MongoMemoryServer({ binary: {  version: "4.4.1" } });
    uri = await mongod.getUri();
  } else {
    url = `mongodb://`;
    if(DB_AUTH){
      uri += DB_AUTH + "@";
    }
    
    uri += `${DB_HOST}:${DB_PORT}`;
    
    if(DB_COLLECTION_AUTH){
      uri += `?authSource=` + DB_COLLECTION_AUTH;
    }
  }
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`db connected on uri: ${uri.replace(/.+@/, "mongodb://***@")}`);
  });
}