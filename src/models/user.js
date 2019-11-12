import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  }
});
userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    userName: login,
  });
  if (!user) {
    user = await this.findOne({ email: login });
  }
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;