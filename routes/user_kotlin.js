var express = require('express');
var router = express.Router();
const JWT = require('jsonwebtoken');
const config = require("../config");


const user_kotlin = require('../model/user_kotlin');

router.post('/register',async function(req, res, next) {
    try {
      const newUser= new user_kotlin(req.body);
      await newUser.save();
      res.status(200).json({status:true, user: newUser});
    } catch (error) {
      res.status(500).json({message:error});
    }
  });

  module.exports=  router