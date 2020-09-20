import axios from "axios";
import { MainController } from "../../base/controllers/main.controller.js";
import LogModel from "../../models/log.model.js";
import ClientModel from "../../models/client.model.js";
import ProductModel from "../../models/product.model.js";

export class ProductController extends MainController {
  constructor(args){
    super(args);
  }

  async getProducts({ urlParams }){
    try {
      let { clientId } = urlParams;
      
      let client = await ClientModel.findOne({ _id: clientId, deletedAt: { $exists: false } });

      if(!client) return this.response(null, "client not found", { status: 404 });

      let products = await ProductModel.find({ _id: { $in: client.products } });

      return this.response(null, "list products", { data: { products }});
    } catch (error) {
      return this.response(error, "error on get products");
    }
  }

  async addProduct({ urlParams, body }){
    try {
      let { clientId } = urlParams;
      let { id } = body;

      if(!id) return this.response(null, "id of product not found", { status: 404 });
      
      let client = await ClientModel.findOne({ _id: clientId, deletedAt: { $exists: false } });

      if(!client) return this.response(null, "client not found", { status: 404 });

      let product = await ProductModel.findOne({ referenceId: id });
      if(!product){
        const URL_PRODUCT = `${process.env.API_PRODUCT}${id}/`;
        let { data } = await axios.get(URL_PRODUCT).catch((error) => {
          let log = new LogModel({
            message: error.message,
            stack: error.stack,
            urlPath: URL_PRODUCT,
            urlMethod: "GET"
          });
          return log.save();
        });
        if(!data) throw new Error("api product got wrong response")
        product = new ProductModel({ ...data, referenceId: data.id });
        await product.save();
      } else {
        let hasProduct = client.products.some(_product => _product._id.toString() === product._id.toString());
        if(hasProduct) return this.response(null, "try add duplicate product", { status: 409 });
      }
      
      client.products.push(product._id);
      await client.save();
      return this.response(null, "product added");
    } catch (error) {
      return this.response(error, "error on add products");
    }
  }

}