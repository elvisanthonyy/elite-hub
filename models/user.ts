import mongoose, { Document, models, Model, Types } from "mongoose";
import { UserCourse } from "./userCourse";

export interface IUserArrayCourse {
  courseId: Types.ObjectId;
  courseName: string;
  userCourseId: Types.ObjectId;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiry?: Date;
  courses: IUserArrayCourse[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
    courses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        userCourseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserCourse",
        },
        courseName: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", userSchema);
