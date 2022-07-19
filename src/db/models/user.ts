import { Schema, model, connect } from "mongoose";
import { Role } from "../../types/enums/role-enum";
import { IUser } from "../../types/models/user";

const userSchema = new Schema<IUser>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: [Role.ADMIN, Role.BOSS, Role.USER],
  bossId: { type: String, required: false }
});

const User = model<IUser>("User", userSchema);

export default User;
