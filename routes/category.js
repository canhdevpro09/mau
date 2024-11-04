var express = require('express');
var router = express.Router();

const category = require('../model/category');
/* GET home page. */
router.post('/add',async function(req, res, next){
    try {
      const newCategory = new category(req.body);
      await newCategory.save();
      res.status(200).json({product: newCategory});
    } catch (error) {
      res.status(500).json('error: error')
    }
  });
  router.get('/list', async function(req, res, next) {
    try {
      var data = await category.find({});
      res.json(data);
    } catch (error) {
      res.status(500).json({mess:"loi"} )
    }
    
  });
module.exports = router;