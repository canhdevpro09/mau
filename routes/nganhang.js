var express = require("express");
var router = express.Router();
var upload = require('../orther/Upload');
const nganhang = require("../model/nganhang");

// Thêm sản phẩm
router.post('/add', async function(req, res) {
  try {
    const { code, link } = req.body;
    const newProduct = new nganhang({
      code,
      link,
      date: new Date() // Sử dụng 'date' thay vì 'data', và 'new Date()' thay vì 'new Data()'
    });
    await newProduct.save();
    res.status(201).json({ nganhang: newProduct }); 
  } catch (error) {
    console.error(error); // Log lỗi để debug
    res.status(500).json({ error: error.message }); 
  }
});
//Lấy thông tin tất cả các sản phẩm
router.get("/list_de", async function (req, res, next) {
  try {
    var data = await nganhang.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ mess: "loi" });
  }
});


//Lấy thông tin sản phẩm theo ID
  router.get('/list', async function(req, res, next){
    try{
      var code = req.query.code;
      var productDetail = await nganhang.findOne({code});
      res.json(productDetail);
} catch (error) {
  res.status(500).json('error: error')
}

})

//cập nhật thông tin
router.post('/update', async function(req, res, next){
  try {
    const {id, code, link} = req.body;
    var de = await nganhang.findById(id);
    if(!de) {
      res.json('không tim thấy')
    }
    if(de){
      de.code = code ? code : de.code;
      de.link = link ? link : de.link;
      de.date = new Date();
    }

    await de.save();

    res.json('Thay đổi thành thông')
    
  } catch (error) {
    console.error(error);
    res.json('Thay đổi thất bại')
  }
})

//upload 
router.post('/upload', [upload.single('file')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://localhost:3000/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });
module.exports = router;
