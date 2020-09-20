import { MainController } from "../../base/controllers/main.controller.js";
import UserModel from "../../models/user.model.js";
import ClientModel from "../../models/client.model.js";

export class UserController extends MainController {
  constructor(args){
    super(args);
  }

  async populate(){
    try {
      const email = "spygetout@gmail.com";
      let hasUser = await UserModel.countDocuments({ email: email });
      if(!!hasUser) throw new Error(`duplicate user '${email}'`);

      let user = new UserModel({
        name: "homelander",
        email: email,
        password: "123"
      });

      await user.save();
      user = user.toObject();
      delete user.password;

      return this.response(null, "My precious", { data: { user: user, login: { email: email, password: 123} }})
    } catch (error) {
      return this.response(error, "get out, the matrix found us");
    }
  }

  async login({ body }){
    try {
      let { email, password } = body;
      console.log(body);
      let user = await UserModel.findOne({ email: email}).select('+password');
      console.log(user);
      if(!user || await user.samePassword(password) === false){
        return this.response(null, "invalid credentials", { status: 400 });
      }
      let token = user.makeToken();
      return this.response(null, "login successfully", { data: { token }})
    } catch (error) {
      return this.response(error, "error on login");
    }
  }

}