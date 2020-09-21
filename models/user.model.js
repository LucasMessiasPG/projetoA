import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { encrypt, compareHash } from "../libraries/auth.js";

const { Schema, model, modelSchemas } = mongoose;

let schema = new Schema({
  name: String,
  email: {
    required: true,
    type: String,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  support: {
    type: Boolean,
    default: false,
    select: false
  },
  deletedAt: Date
}, { timestamps: true })

schema.pre("save", function(next){
  const user = this;
  if(user.isModified("password") == false) return next();
  encrypt(user.password, (err, hash) => {
    if(err) return next(err);
    user.password = hash;
    next();
  });
});


schema.methods.samePassword = async function(password){
  return compareHash(password, this.password)
}

schema.methods.makeToken = function(){
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email
  }, process.env.SECRET, { expiresIn: "1h" });
}

const name = "User";
const _model = modelSchemas[name]
  ? model(name)
  : model(name, schema);

export default _model;