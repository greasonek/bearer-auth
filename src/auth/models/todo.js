'use strict';

const todo = (sequelizeInstance, DataTypes) =>
  sequelizeInstance.define('./todo', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

module.exports = todo;