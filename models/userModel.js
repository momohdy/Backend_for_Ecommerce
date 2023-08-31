const { default: mongoose } = require("mongoose");
const  bcrypt  = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requierd: true,
    },
    email: {
      type: String,
      requierd: true,
      unique: true,
    },
    password: {
      type: String,
      requierd: true,
    },
    isAdmin: {
      type: Boolean,
      requierd: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {

  if(!this.isModified('password')){
    next()
  }
  // we added next as param becaese function work as middleware
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password ,salt)
})


userSchema.methods.matchPassword = async function (passHadEntered) {
  return await bcrypt.compare(passHadEntered , this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User;
