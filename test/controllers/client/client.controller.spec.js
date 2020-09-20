import sinon from "sinon";
import { ClientController } from "../../../controllers/client/client.controller.js";
import ClientModel from "../../../models/client.model.js";


describe("client.controller.js", () => {
  let clientController = new ClientController();
  clientController.req = { user: {} }
  let responseStub;
  before(async () => {
    responseStub =  sinon.stub(clientController, "response").callsFake(function() {});
  })

  afterEach(async () => {
    await ClientModel.deleteMany({});
  })

  describe("createClient", () => {
    it("should create client with valid data", async () => {
      await clientController.createClient({
        body: {
          email: "any-user@gmail.com",
          name: "any",
          password: "shhh"
        }
      })
      let value = await ClientModel.countDocuments({ email: "any-user@gmail.com" })
      expect(value).to.be.eq(1);
    });
  });
  describe("getClient", () => {
    it("should get client with valid data", async () => {
      let client = new ClientModel({
        email: "any-user@gmail.com",
        name: "any",
      });
      await client.save();

      await clientController.getClient({ urlParams: { clientId: client._id }});
      expect(responseStub).to.have.been.calledWith(null, "get client", {
        data: {
          name: client.name,
          email: client.email,
          _id: client._id.toString()
        }
      })
    })
  });
  describe("removeClient", () => {
    it("should remove client with valid data", async () => {
      let client = new ClientModel({
        email: "any-user@gmail.com",
        name: "any",
      });
      await client.save();

      await clientController.removeClient({ urlParams: { clientId: client._id }});
      expect(responseStub).to.have.been.calledWith(null, "client removed")
    })
  });
  describe("updateClient", () => {
    it("should update client with valid data", async () => {
      let client = new ClientModel({
        email: "any-user@gmail.com",
        name: "any",
      });
      await client.save();

      await clientController.updateClient({ urlParams: { clientId: client._id }, body: { name: "other-name"} });
      let clientEdited = await ClientModel.findOne({ _id: client._id });
      expect(clientEdited.name).to.be.eq("other-name");
    })
  });
})