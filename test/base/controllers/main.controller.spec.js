import { MainController } from "../../../base/controllers/main.controller.js";
import sinon from "sinon";

describe("main.controller.js", () => {
  let responseMock;
  let statusResponseMock;
  let jsonResponseMock;
  let endResponseMock;

  before(() => {
    statusResponseMock = sinon.stub().callsFake(() => responseMock);
    jsonResponseMock = sinon.stub().callsFake(() => responseMock);
    endResponseMock = sinon.stub().callsFake(() => responseMock);
    responseMock = {
      status: statusResponseMock,
      json: jsonResponseMock,
      end: endResponseMock
    }
  })

  it("should has static method 'createRoute'", async () => {
    expect(MainController.createRoute).to.be.an("function");
  });

  it("should call responses of request and finish request", async () => {
    let mainController = new MainController({ request: {}, response: responseMock });
    mainController.response(null, "test response");
    expect(jsonResponseMock).to.have.been.called;
    expect(statusResponseMock).to.have.been.called;
    expect(endResponseMock).to.have.been.called;
  });

  describe("normalize respose", () => {
    let mainController;
    before(() => {
      mainController = new MainController({ request: {}, response: responseMock });
    })

    it("should normalize positive response without data", () => {
      mainController.response(null, "the cake is a lie");
      expect(jsonResponseMock).calledWith({
        success: true,
        message: "the cake is a lie"
      })
    })

    it("should normalize positive response with data", () => {
      mainController.response(null, "the cake is a lie", { data: { cowLevel: true } });
      expect(jsonResponseMock).calledWith({
        success: true,
        message: "the cake is a lie",
        payload: {
          cowLevel: true
        }
      })
    })

    it("should normalize positive response with diff status", () => {
      mainController.response(null, "the cake is a lie", { status: 404 });
      expect(statusResponseMock).calledWith(404)
      expect(jsonResponseMock).calledWith({
        success: false,
        message: "the cake is a lie"
      })
    })

    it("should normalize response with error", async () => {
      let superError = new Error("ohh!");
      await mainController.response(superError, "the cake is a lie");
      expect(statusResponseMock).calledWith(500)
      expect(jsonResponseMock).calledWith({
        success: false,
        message: "the cake is a lie",
        error: {
          message: superError.message,
          stack: superError.stack
        }
      })
    })
  });
  
})