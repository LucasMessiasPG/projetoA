import { MainController } from "../../base/controllers/main.controller.js";
import ClientModel from "../../models/client.model.js";

export class ClientController extends MainController {
  constructor(args){
    super(args);
  }

  async populate(){
    try {
      const email = "spygetout@gmail.com";
      let hasClient = await ClientModel.countDocuments({ email: email });
      if(!!hasClient) throw new Error(`duplicate user '${email}'`);

      let client = new ClientModel({
        name: "homelander",
        email: email,
      });

      await client.save();
      return this.response(null, "My precious", { data: { client }})
    } catch (error) {
      return this.response(error, "get out, the matrix found us");
    }
  }

  async createClient({ body }){
    try { 
      let { email, name, password } = body;
      if(ClientModel.validateEmail(email) === false) return this.response(null, "invalid email", { status: 400 });
      if(typeof name != "string" || name.length < 3) return this.response(null, "invalid name", { status: 400 });

      let duplicateClient = await ClientModel.findOne({ email });

      let data;
      if(this.req.user.support){
        data = { clientId: duplicateClient._id };
      }

      let hasDuplicateClient = !!duplicateClient;
      
      let duplicateClientIsDeleted = hasDuplicateClient ? !!duplicateClient.deletedAt : false;

      if(hasDuplicateClient && !duplicateClientIsDeleted) return this.response(null, "duplicate email", { data: data, status: 409 })

      let client = duplicateClientIsDeleted ? duplicateClient : new ClientModel({ name, email, password })

      if(duplicateClientIsDeleted){
        client.deletedAt = void 0;
      }
      await client.save();
      client = client.toObject();

      return this.response(null, "client created" , { data: client });
    } catch (error) {
      return this.response(error, "error on create client, plz send a email for us 'suport@magickindown.com.br'")
    }
  }

  async getClient({ urlParams }){
    try {
      let { clientId } = urlParams;
      
      let client = await ClientModel.findOne({ _id: clientId, deletedAt: { $exists: false } });

      if(!client) return this.response(null, "client not found", { status: 404 });

      return this.response(null, "get client", { data: { 
        name: client.name,
        email: client.email,
        _id: client._id.toString()
       } });
    } catch (error) {
      return this.response(error, "error on get client");
    }
  }

  async removeClient({ urlParams }){
    try {
      let { clientId } = urlParams;

      let client = await ClientModel.findOne({ _id: clientId, deletedAt: { $exists: false } });
      
      if(!client) return this.response(null, "client not found", { status: 404 });
      
      client.deletedAt = new Date();
      await client.save();

      return this.response(null, "client removed");
    } catch (error) {
      return this.response(error, "erro on remove client", )
    }
  }
  
  async updateClient({ urlParams, body }){
    try {
      let { clientId } = urlParams;
      let { name, email } = body;

      let client = await ClientModel.findOne({ _id: clientId, deletedAt: { $exists: false } });
      
      if(!client) return this.response(null, "client not found", { status: 404 });

      if(email){
        if(ClientModel.validateEmail(email) === false) return this.response(null, "invalid email", { status: 400 });
        client.email = email;
      }
      if(name){
        if(typeof name != "string" || name.length < 3) return this.response(null, "invalid name", { status: 400 });
        client.name = name
      }
      await client.save();
      return this.response(null, "client updated", { data: { client }});
    } catch (error) {
      return this.response(error, "error on update client");
    }
  }
}