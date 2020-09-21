import { encrypt, compareHash } from "../../libraries/auth.js";

describe("auth.js", () => {
  describe("encrypt", () => {
    it("should encrypt a valid string", () => {
      encrypt("shhhh", (err, hash) => {
        expect(err).to.not.exist;
        expect(hash).to.be.an("string");
      });
    });


    it("should got error on encrypt", () => {
      encrypt("", (err, hash) => {
        expect(err).to.exist;
        expect(hash).to.not.exist;
      });
    });
  });
  describe("encrypt", () => {
    // valor encriptado "shhhh";
    let encryptHash = "$2b$10$2t1uE0GLcXrFwxg32l5hlOgP4SlqftcFeaRoHua.UclHqrrP9Opqu";

    it("should compare with valid hash", async () => {
      let sameValue = await compareHash("shhhh", encryptHash);
      expect(sameValue).to.be.true;
    })

    it("should fail on compare hash", async () => {
      let sameValue = await compareHash("shiuuu", encryptHash);
      expect(sameValue).to.be.false;
    })
  });
})