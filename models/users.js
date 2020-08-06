const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const UsersSchema = new Schema({
  // `title` is required and of type String
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  active: {
    type: Boolean,
    require: true,
    default: false
  },
  of_age: {
    type: Boolean,
    require: true,
    default: false
  },
  plot: [
    {
      type: Schema.Types.ObjectId,
      ref: "Libbed"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
const Users = mongoose.model("Users", UsersSchema);

// Export the Article model
module.exports = Users;
