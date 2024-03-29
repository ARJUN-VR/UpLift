import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    credentials: {
      type: Object,
      required: false,
    },
    image:{
      type:String,
      required:false,
      default:'https:img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
    },
    isBlocked:{
      type:Boolean,
      default:false,
      required:false
    },
    isCreator:{
      type:Boolean,
      default:false,
      required:false
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enterdPassword: string) {
  return await bcrypt.compare(enterdPassword, this.password);
};

export const User = model("user", userSchema);
