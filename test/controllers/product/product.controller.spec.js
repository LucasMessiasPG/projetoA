import sinon from "sinon";
import axios from "axios";
import { ProductController } from "../../../controllers/product/product.controller.js";
import ClientModel from "../../../models/client.model.js";
import ProductModel from "../../../models/product.model.js";

describe("product.controller.js", () => {
  let productController = new ProductController();
  let responseStub;
  let client;
  let fakeProduct = {
    reviewScore: 5,
    title: "Secador de Cabelo 1900W 2 Velocidades",
    price: 229.9,
    brand: "wahl clipper",
    id: "af04c0ee-7137-4848-fd33-a2d148412095",
    image: "http://challenge-api.luizalabs.com/images/af04c0ee-7137-4848-fd33-a2d148412095.jpg"
  };

  before(async () => {
    client = await (new ClientModel({
      email: "any-user@gmail.com",
      name: "any",
    })).save();
    responseStub =  sinon.stub(productController, "response").callsFake(function() {});
    sinon.stub(axios, "get").callsFake(() => {
      return Promise.resolve({ 
        data: fakeProduct
      })
    })
  })

  afterEach(async () => {
    await ProductModel.deleteMany({});
  })

  describe("getProducts", () => {
    it("should get empty product of client", async () => {
      await productController.getProducts({ urlParams: { clientId: client._id }});
      expect(responseStub).to.have.been.calledWith(null, "list products", {
        data: {
          products: []
        }
      })
    })
  });

  describe("addProduct", () => {
    it("should add product", async () => {
      await productController.addProduct({ urlParams: { clientId: client._id }, body: { id: "anyID" }});
      expect(responseStub).to.have.been.calledWith(null, "product added")
      let { products } = await ClientModel.findOne({ _id: client._id });
      expect(products).to.be.lengthOf(1);
    })
  });

})