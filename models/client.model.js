import mongoose from "mongoose";
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
  deletedAt: Date,
  products: [{
    type: Schema.Types.ObjectId,
    ref: "Products"
  }]
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


schema.statics.validateEmail = function(email){
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
}

const name = "Client";
const _model = modelSchemas[name]
  ? model(name)
  : model(name, schema);

export default _model;