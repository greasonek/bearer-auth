// 'use strict';
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const SECRET = process.env.SECRET;


// const userSchema = (sequelize, DataTypes) => {
//   const model = sequelize.define('User', {
//     username: { 
//       type: DataTypes.STRING, 
//       allowNull: false, unique: true 
//     },
//     password: { 
//       type: DataTypes.STRING, 
//       allowNull: false, 
//     },
//     token: {
//       type: DataTypes.VIRTUAL,
//       // will happen when someone GETS this user model
//       get() {
//         return jwt.sign({ username: this.username }, SECRET);
//       },
//     },
//   });

//   // SPECIAL method - like a prototype method added to a class
//   model.authenticateBearer = async(token) => {
//     try {

//       //deconstruct the payload from the token (payload is the username:password JSON object)
//       //payload secret 
//       //should give us {username: theoreticalUser}
//       const payload = jwt.verify(token, SECRET);
//       //if it's a valid user we will consider that authenticated (aka is the user in the db?)
//       const user = await model.findOne({where: { username: payload.username }});
//       return user;
//       //if not then they will get null back OR an error  
//     } catch (e){
//       console.error(e);
//       return null;
//     }
//   };
//   model.beforeCreate(async (user) => {
//     let hashedPass = bcrypt.hash(user.password, 10);
//     user.password = hashedPass;
//   });

//   // Basic AUTH: Validating strings (username, password) 
//   model.authenticateBasic = async function (username, password) {
//     const user = await this.findOne({ username });
//     const valid = await bcrypt.compare(password, user.password);
//     if (valid) { return user; }
//     throw new Error('Invalid User');
//   };

//   // Bearer AUTH: Validating a token
//   model.authenticateToken = async function (token) {
//     try {
//       const parsedToken = jwt.verify(token, process.env.SECRET);
//       const user = this.findOne({ username: parsedToken.username });
//       if (user) { return user; }
//       throw new Error('User Not Found');
//     } catch (e) {
//       throw new Error(e.message);
//     }
//   };

//   return model;
// };

// module.exports = userSchema;