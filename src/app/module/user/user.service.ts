import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import User from "./user.model";

const registerUserIntoDB = async (data: Partial<IUser>): Promise<IUser> => {
  const email = data.email?.toLowerCase().trim();
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already taken");

  const hashedPassword = await bcrypt.hash(data.password!, 10);
  const user = new User({ ...data, email, password: hashedPassword });
  return await user.save();
};

const loginUserFromDB = async ({
  email,
  password,
}: {
  email?: string;
  password: string;
}) => {
  const normalizedEmail = email?.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) throw new Error("Incorrect Email");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect Password");

  return user;
};
const verifyUser = async (id: string) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isVerified: true },
    { new: true }
  );

  return updatedUser;
};
const getAllUsers = async()=>{
  return await User.find();
}
export const UserServices = {
  registerUserIntoDB,
  loginUserFromDB,
  verifyUser,
  getAllUsers
};
