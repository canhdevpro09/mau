var express = require('express');
var router = express.Router();
var upload = require('../orther/Upload');
var sendMail = require('../orther/config');
var sendMail_html = require('../orther/sendEmail');
// var list = [
//     {'id': 1, 'name': 'bánh', 'price': 5000},
//     {'id': 2, 'name': 'kẹo', 'price': 7000}
// ];

// (*)Tính tổng giá trị của tất cả các sản phẩm (số lượng * giá)
const product = require('../model/Product');


/* GET home page. */
//http://localhost:3000/san-pham/list
//Lấy thông tin tất cả các sản phẩm
router.get('/list', async function(req, res, next) {
  try {
    var data = await product.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({mess:"loi"} )
  }
  
});

//thêm sản phẩm
router.post('/add',async function(req, res, next){
  try {
    const newProduct = new product(req.body);
    await newProduct.save();
    res.status(200).json({product: newProduct});
  } catch (error) {
    res.status(500).json('error: error')
  }
  

});

//Lấy thông tin sản phẩm theo ID
try {
  router.get('/detail', async function(req, res, next){
    var id = req.query.id;
    var productDetail = await product.findById(id);
    res.json(productDetail);
  })
} catch (error) {
  res.status(500).json('error: error')
}

// Lấy thông tin các sản phẩm có giá trên 1000
try {
  router.get('/producttren', async function(req, res, next){
    var query = {price:{$gt:2000}}
    var products = await product.find(query);
    res.status(200).json(products);
  })
} catch (error) {
  res.status(500).json('error: error')
}

// Lấy thông tin các sản phẩm thuộc loại 'Bánh'
router.get('/banh', async function(req, res, next) {
  try {
    const Category = require('../model/category');
    const banhCategory = await Category.findOne({ name: 'bánh' });
    if (!banhCategory) {
      return res.status(404).json({ message: "Không tìm thấy loại 'Bánh'" });
    }
    const banhProducts = await product.find({ category: banhCategory._id }).populate('category');
    
    res.status(200).json(banhProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Đếm số lượng sản phẩm trong mỗi loại (countDocuments)
router.get('/count-by-category-simple', async function(req, res, next) {
  try {
    const result = await product.aggregate([
      {
        $group: {
          _id: "$category",
          SL_SP_mỗi_loại: { $sum: "$quantity" }
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Lấy thông tin sản phẩm có số lượng ít hơn 10
router.get('/splt10',async function(req, res, next) {
  try {
    var query = {quantity:{$lt:30}}
    var products = await product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Cập nhật giá của sản phẩm theo ID, với giá người dùng truyền vào
router.post('/edit',async function(req, res, next) {
  try {
    const {id,price} = req.body;
    var item = await product.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
    }
    if(item){
      item.price = price ? price: item.price;
    }
    await item.save();
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
})
// Xóa sản phẩm theo ID
router.delete('/delete',async function(req, res, next) {
  try {
    var id = req.query.id;
    await product.findByIdAndDelete(id);
    res.status(200,{message:'xóa thành công'})
  } catch (error) { 
    
  }
})

// Lấy các sản phẩm có giá trong khoảng từ 500 đến 1500
router.get('/get_500_1000',async function(req, res, next) {
  try {
    var query = {price:{$gt:500,$lt:1500}}
    var products = await product.find(query);
    if(products.length === 0){
        return res.status(404,{message:'không có sản phẩm nào'})
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
})


// Lấy tên và số lượng của các sản phẩm có số lượng lớn hơn 20
router.get('/getnameandquantity', async function(req, res, next) {
  try {
    var query = {quantity:{$gt:20}}
    var products = await product.find(query).select('name quantity');
    if(products.length === 0){
      return res.status(404,{message:'không có sản phẩm nào'})
  }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
})

// Lấy các sản phẩm có tên chứa từ khóa 'phone'
router.get('/phone',async function(req ,res, next){
  try{
    var query = {name: {$regex:'canh1', $options: 'i'}}
    var products = await product.find(query);
    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
})

// Lấy thông tin sản phẩm đắt nhất
router.get('/productDN', async function(req, res, next){
  try {
    const data = await product.find().sort({price:-1})
    var products = data[0];
    // console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
})

// Lấy thông tin sản phẩm rẻ nhất
router.get('/productRN', async function(req, res, next){
  try {
    const data = await product.find().sort({price:1})
    var products = data[0];
    // console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
})


// Lấy giá trung bình của các sản phẩm
router.get('/avg', async function(req, res, next){
  try {
    var result = await product.aggregate([
      {
        $group:{
          _id:null,
          aggregate:{$avg:"$price"}
        }

      }
  ])
  if (result.length === 0) {
    return res.status(404).json({ message: "Không có dữ liệu để tính giá trung bình" });
  }
  
  // const aggregatePrice = result[0].aggregate;
  res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
})

// (*)Tính tổng giá trị của tất cả các sản phẩm (số lượng * giá)

router.get('/sum', async function(req, res, next) {
  try {
    var result = await product.aggregate([
      {
        $group:{
          _id:null,
          totalValue: {$sum:{$multiply:["$price","$quantity"]}}
        }
      
      }
    ])
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
})

//uploads hinh anh
router.post('/upload', [upload.single('image')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });

//uploads nhieu hinh anh
router.post('/uploads', [upload.array('image', 9)],
    async (req, res, next) => {
        try {
            const { files } = req;
            if (!files) {
               return res.json({ status: 0, link : [] }); 
            } else {
              const url = [];
              for (const singleFile of files) {
                url.push(`http://localhost:3000/images/${singleFile.filename}`);
              }
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : [] });
        }
    });

//gui mail
router.post("/send-mail", async function(req, res, next){
  try{
    const {to, subject, content} = req.body;

    const mailOptions = {
      from: "canhphan <phanhuucanh123@gmail.com>",
      to: to,
      subject: subject,
      html: content
    };
    await sendMail.transporter.sendMail(mailOptions);
    res.json({ status: 1, message: "Gửi mail thành công"});
  }catch(err){
    res.json({ status: 0, message: "Gửi mail thất bại"});
  }
});

// Read the HTML template and image file
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const path = require('path');

router.post("/send-mail-html", async function(req, res, next){
  const htmlTemplate = await readFileAsync(path.join( './orther/template.html'), 'utf-8');
  const imageAttachment = await readFileAsync(path.join('./orther/images.jpg'));
  try{
    const {from,to, subject} = req.body;
    // Send email
    const info = await sendMail_html.transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: htmlTemplate,
      attachments: [{
          filename: 'image.png',
          content: imageAttachment,
          encoding: 'base64',
          cid: 'uniqueImageCID', // Referenced in the HTML template
      }],
  });
    res.json({ status: 1, message: "Gửi mail thành công"});
  }catch(err){
    res.json({ status: 0, message: "Gửi mail thất bại"});
  }
});

module.exports = router;