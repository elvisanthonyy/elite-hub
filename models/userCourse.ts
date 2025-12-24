import mongoose, { Document, models, Model } from "mongoose";

export interface IUserCourse extends Document {
  userId: string;
  courseId: string;
  reference: string;
  paymentStatus: string;
  amount: number;
  enrolledAt: Date;
  completedAt: Date;
}

const userCourseSchema = new mongoose.Schema<IUserCourse>({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
  },
  paymentStatus: {
    type: String,
    default: "unpaid",
  },
  amount: {
    type: Number,
  },
  enrolledAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
});

export const UserCourse: Model<IUserCourse> =
  models.UserCourse ||
  mongoose.model<IUserCourse>("UserCourse", userCourseSchema);
