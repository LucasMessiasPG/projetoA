import jwt from "jsonwebtoken";
import UserModel from "../../models/user.model.js";

export default async function(request, response, next){
  let { headers } = request;
  let token;
  const headerKey = "Bearer"
  if (headers.authorization) {
    const parts = headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === headerKey) {
      if (token) {
        error = true;
      }
      token = parts[1];
    }
  }
  let responseWrongToken = function(){
    response.status(401).json({
      message: "invalid token"
    })
    return response.end();
  }
  if(!token) {
    return responseWrongToken();
  }
  let decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if(err) return reject(err);
      resolve(decoded);
    });
  })

  let hasUser = !!(await UserModel.countDocuments({ _id: decoded._id, deletedAt: { $exists: false } }));
  if(!hasUser) return responseWrongToken();
  request.user= decoded;
  next();
}