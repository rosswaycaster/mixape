const bcrypt = require('bcrypt-node');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
  if (this.isNew) {
    bcrypt.hash(this.password, null, null, (err, hash) => {
      this.password = hash;
      next();
    });
  }
});

userSchema.methods.passwordCheck = function(password) {
  // add some stuff to the users name
  var match = bcrypt.compareSync(password, this.password);
  if (match) {
    return this.password;
  } else {
    return false;
  }
};

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
