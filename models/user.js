'use strict';
const { isAfter } = require('date-fns');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'userId' // можно назвать как угодно. Должен быть такой же ключ, как в Tasks
      }) //UserId -> User_id, а нужно 'userId' 
    }    //'ownerId'
  }
  User.init({
    firstName: {
      type: DataTypes.STRING(64),
      field: 'first_name',
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING(64),
      field: 'last_name',
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      field: 'password_hash',
      type: DataTypes.TEXT,
      allowNull: false,
      set(value) {
        //this.setDataValue('password', hash(value));
        this.setDataValue('password', 'new_hash_password');
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isValidDate(value) {
          if (isAfter(new Date(value), new Date())) {
            throw new Error('Fail! Check your birthday!');
          }
        }
      }
    },
    isMale: {
      type: DataTypes.BOOLEAN,
      field: 'is_male',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });
  return User;
};