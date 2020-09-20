import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

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

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


schema.methods.samePassword = function(password){
  return bcrypt.compare(password, this.password)
}

schema.methods.makeToken = function(){
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email
  }, process.env.SECRET, { expiresIn: "1h" });
}

schema.statics.validateEmail = function(email){
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
}

const name = "User";
const _model = modelSchemas[name]
  ? model(name)
  : model(name, schema);

export default _model;