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
    // role added to user model for LAB8
    role: {
      // a set of unique values
      type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'),
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET, {
          expiresIn: 846000000, 
          // maxAge: '10 days',
        });
      },
    },
    // capabilities/permissions that this user has 
    capabilities: {
      type: DataTypes.VIRTUAL,
      get(){
        const acl = {
          user: ['read'],
          writes: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      }
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    // const user = await this.findOne({ username });
    const user = await this.findOne({where: {username}});
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