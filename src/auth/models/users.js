'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { 
      type: DataTypes.STRING, 
      allowNull: false, unique: true 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false, 
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET, {
          expiresIn: 846000000,
        });
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    // const user = await this.findOne({ username });
    const user = await user.findOne({where: {username}});
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  // Bearer AUTH: Validating a token
  model.authenticateToken = async (token) => {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      console.log(parsedToken);
      const user = model.findOne({where: { username: parsedToken.username }});
      console.log(user);
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userSchema;