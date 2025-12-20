import mongoose, { Document, models, Model } from "mongoose";

export interface ICourse extends Document {
  name: string;
  amount: number;
  description: string;
  skills: string[];
  requirements: string[];
}

const courseSchema = new mongoose.Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Course: Model<ICourse> =
  models.Course || mongoose.model<ICourse>("Course", courseSchema);
