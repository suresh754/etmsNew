

const bcrypt = require('bcrypt');
//const uuidv4 = require('uuid/v4');

module.exports = {

  attributes: {

    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
      //defaultsTo: uuidv4()
    },

    /*empId: {
      type: 'string',
      required: true,
      unique:true
    },*/
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password:{
      type:'string'
    },
    role:{
      type: 'string',
      enum:['EMP','ADMIN']
    },
    branch: {
      model:'branch'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },
  autoPK: false,

  beforeCreate: function (user, cb) {
    if (user.password) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            sails.log(err);
            cb(err);
          } else {
            user.password = hash;
            sails.log("saving data" + user.password);
            cb();
          }
        });
      });
    }else{
      cb();
    }
  }
};

