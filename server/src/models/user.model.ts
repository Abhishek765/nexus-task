import mongoose from 'mongoose';
import { DATA_MODEL_KEYS } from '../constants';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      trim: true,
      minlength: 6
    }
  },
  { timestamps: true }
);

// call the pre-middleware to hash the password on saving user data to db
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// To handle task owned by user
userSchema.virtual('tasks', {
  ref: DATA_MODEL_KEYS.Task,
  localField: '_id',
  foreignField: 'owner'
});

// methods
// userSchema.methods.generateAuthToken = async function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       name: this.email
//     },
//     process.env.AUTH_TOKEN_SECRET!,

//     {
//       expiresIn: process.env.AUTH_TOKEN_EXPIRY
//     }
//   );
// };

// userSchema.methods.findUserByCredentials = async (
//   email: string,
//   password: string
// ) => {
//   const user = await UserModel.findOne({ email });

//   if (!user) {
//     throw new Error('Invalid request!');
//   }

//   const isPasswordCorrect = await bcrypt.compare(password, user.password);

//   if (!isPasswordCorrect) {
//     throw new Error('Invalid request!');
//   }

//   return user;
// };

// to delete password from  response object before sending to client
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const UserModel = mongoose.model(DATA_MODEL_KEYS.User, userSchema);
