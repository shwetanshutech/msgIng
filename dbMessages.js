import mongoose from "mongoose";

const msgingSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});
//collection

export default mongoose.model("messagecontents", msgingSchema);
