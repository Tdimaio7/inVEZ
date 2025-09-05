import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    sector: { type: String, required: true },
    stage: { type: String, required: true }, // etapa del proyecto
    investmentRequired: { type: Number, required: true },
    founder: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
