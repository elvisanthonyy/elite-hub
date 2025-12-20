import mongoose, { Document, models, Model, Types } from "mongoose";

export interface IUserCourse extends Document {
  _id: Types.ObjectId;
  courseId: string;
  courseName: string;
  paid?: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  courseType: string;
  paid: boolean;
  verificationToken: string;
  verificationTokenExpiry?: Date;
  courses: Types.DocumentArray<IUserCourse>;
}

const userCourseSchema = new mongoose.Schema<IUserCourse>({
  courseId: {
    type: String,
    ref: "Course",
  },
  courseName: {
    type: String,
  },

  paid: {
    type: Boolean,
    default: false,
  },
});

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
    courseType: {
      type: String,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
    courses: [userCourseSchema],
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", userSchema);
