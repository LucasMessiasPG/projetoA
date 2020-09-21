import { isValidEmail, isValidName } from "../../libraries/validator.js";

describe("validator.js", () => {
  describe("isValidEmail", () => {
    it("should validate valid email", () => {
      let [valid1, valid2] = [
        isValidEmail("me@gmail.com"),
        isValidEmail("contrata@gmail.com.br")
      ]
      expect(valid1).to.be.true
      expect(valid2).to.be.true
    });

    it("should fail on validate", () => {
      let list = [
        isValidEmail("@gmail.com"),
        isValidEmail("any@com"),
        isValidEmail("any@gmail"),
        isValidEmail("banana"),
        isValidEmail("")
      ]
      
      for(let valid of list){
        expect(valid).to.be.false
      }
    })

    it("should fail on got email of type diff string", () => {
      let list = [
        isValidEmail(1),
        isValidEmail({}),
        isValidEmail({ email: "valid@gmail.com.br"}),
        isValidEmail([]),
        isValidEmail(["valid@email.com.br"]),
        isValidEmail(),
      ]
      
      for(let valid of list){
        expect(valid).to.be.false
      }
    })
  });
  describe("isValidName", () => {
    it("should validate valid name", () => {
      let [valid1, valid2] = [
        isValidName("lucas"),
        isValidName("messias - dev")
      ]
      expect(valid1).to.be.true
      expect(valid2).to.be.true
    })

    it("should fail on validate", () => {
      let list = [
        isValidName(""),
        isValidName("1"),
        isValidName("12"),
        isValidName("XL"),
        isValidName(),
        isValidName(123),
        isValidName(1234),
      ]
      
      for(let valid of list){
        expect(valid).to.be.false
      }
    })
  });
})