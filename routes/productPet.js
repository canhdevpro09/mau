var express = require('express');
var router = express.Router();

const productPet = require('../model/ProcductPet');


/**
 * @swagger
 * /productPet/list:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */


router.get('/list', async function(req, res, next) {
    try {
        var data = await productPet.find({});
        res.json({status: true, data: data});
      } catch (error) {
        res.status(500).json({mess:"loi"} )
      }
  
});

/**
 * @swagger
 * /productPet/add:
 *   post:
 *     summary: Thêm sản phẩm thú cưng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - age
 *               - image
 *               - breed
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên của thú cưng
 *               price:
 *                 type: number
 *                 description: Giá của thú cưng
 *               age:
 *                 type: number
 *                 description: Tuổi của thú cưng
 *               image:
 *                 type: string
 *                 description: URL hình ảnh của thú cưng
 *               breed:
 *                 type: string
 *                 description: Giống của thú cưng
 *               category:
 *                 type: string
 *                 format: uuid
 *                 description: ID của danh mục thú cưng (khóa ngoại tham chiếu đến categoryPet)
 *     responses:
 *       200:
 *         description: Trả về sản phẩm thú cưng đã thêm mới
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     age:
 *                       type: number
 *                     image:
 *                       type: string
 *                     breed:
 *                       type: string
 *                     category:
 *                       type: string
 *                       format: uuid
 *       500:
 *         description: Lỗi server
 */
router.post('/add',async function(req, res, next){
    try {
      const newProduct = new productPet(req.body);
      await newProduct.save();
      res.status(200).json({product: newProduct});
    } catch (error) {
      res.status(500).json('error: error')
    }
    
  
  });

 
  router.get('/detail/:id', async function(req, res, next){
    try {
      var id = req.params.id;
      var productDetail = await productPet.findById(id);
      res.json({status: true, product: productDetail});
    }
    catch (error) {
      res.status(500).json('error: error')
    }
  })
  
  
module.exports = router;
