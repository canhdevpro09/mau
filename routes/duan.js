var express = require('express');
var router = express.Router();

const duan = require("../model/Duan");
// Thêm sản phẩm
router.post('/add', async function(req, res) {
    try {
      const { name, department } = req.body;
      const newDuan = new duan({
        name,
        department,
        date: new Date()
      });
      await newDuan.save();
      res.status(201).json({ Duan: newDuan }); 
    } catch (error) {
      console.error(error); // Log lỗi để debug
      res.status(500).json({ error: error.message }); 
    }
  });
//Lấy thông tin sản phẩm theo Ngành
router.get('/list', async function(req, res, next){
    try{
      var department = req.query.department;
      var Detail = await duan.find({department});
      res.json(Detail);
} catch (error) {
  res.status(500).json('error: error')
}

})

//cập nhật thông tin
router.post('/update', async function(req, res, next){
    try {
      const {id, name, department} = req.body;
      var duanUpdate = await duan.findById(id);
      if(!duanUpdate) {
        res.json('không tim thấy')
      }
      if(duanUpdate){
        duanUpdate.name = name ? name : duanUpdate.name;
        duanUpdate.department = department ? department : duanUpdate.department;
        duanUpdate.date = new Date();
      }
  
      await duanUpdate.save();
  
      res.json('Thay đổi thành thông')
      
    } catch (error) {
      console.error(error);
      res.json('Thay đổi thất bại')
    }
  })


module.exports = router;
