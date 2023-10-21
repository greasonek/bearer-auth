// dpeneding on the route we will send in what type of capability the user needs 
//to have to make it to the NEXT middlware

'use strict';

//function currying - a function wrapper that passes value along to another function

//middleware can only have these arguments (req, res, next, error)
module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) next();
      else next('access denied');
    }
    catch (e) {
      next('invalid login, (acl middleware)');
    }
  };
};