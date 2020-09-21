import LogError from "../../models/log.model.js";
import { logError } from "../../libraries/log.js";

export class MainController{
  
  constructor({ request, response } = {}){
    this.req = request;
    this.res = response;
  }

  async response(error, message, { data, status} = {}){
    let _error;
    if(!status) status = 200;
    if(error){
      status = 500;
      _error = {
        message: error.message,
        stack: error.stack
      }
      
    }
    let dataResponse = {
      success: status > 299 ? false : true,
      message: message
    };
    if(data){
      dataResponse.payload = data;
    }
    if(_error){
      dataResponse.error = _error;
      await logError(_error, { url: this.req.url, method: this.req.method });
    }
    this.res.status(status).json(dataResponse)
    this.res.end();
    return ;
  }

  static createRoute(method){
    let self = this;
    return function(request, response) {
      let context = new self({ request, response });
      // console.log(context.response);
      try {
        if(typeof context[method] != "function"){
          throw new Error("internal error: method not allowed")
        }
        let data = {
          urlParams: request.params,
          queryString: request.query,
          body: request.body
        }
        return context[method](data);
      } catch (error) {
        if(typeof error == "string") error = new Error(error);
        error.message = `[${request.url} ${request.method}] - ${error.message}`
        context.response(error, error.message);
      }
    }
  }
  
}