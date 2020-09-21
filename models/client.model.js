import mongoose from "mongoose";
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


const name = "Client";
const _model = modelSchemas[name]
  ? model(name)
  : model(name, schema);

export default _model;