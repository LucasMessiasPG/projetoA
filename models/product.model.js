import mongoose from "mongoose";
const { Schema, model, modelSchemas } = mongoose;

let schema = new Schema({
  referenceId: {
    type: String,
    index: {
      unique: true
    }
  },
  title: String,
  price: String,
  image: String,
  reviewScore: Number
}, { timestamps: true })

const name = "Product";
const _model = modelSchemas[name]
  ? model(name)
  : model(name, schema);

export default _model;