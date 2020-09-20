import chai from "chai";
import sinonChai from "sinon-chai";
import dbConnection from "../base/db/index.js";
global.expect = chai.expect;
chai.should();
chai.use(sinonChai);

before(async () => {
  await dbConnection()
})