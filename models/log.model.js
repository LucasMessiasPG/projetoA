import mongoose from "mongoose";
const { Schema, model, modelSchemas } = mongoose;

let schema = new Schema({
  message: String,
  stack: String,
  urlPath: String,
  urlMethod: String
}, { timestamps: true })

const name = "LogError";
const _model = modelSchemas[name]
  ? model(name)
  : model(name, schema);

export default _model;