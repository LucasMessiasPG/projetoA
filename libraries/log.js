import LogModel from "../models/log.model.js"

export const logError = function(error, { url, method } = {}){
  if(!(error instanceof Error)){
    error = {
      message: JSON.stringify(error),
      stack: ""
    }
  }
  let log = new LogModel({
    message: error.message,
    stack: error.stack,
    urlPath: url,
    urlMethod: method,
  })
  return log.save();
}