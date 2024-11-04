var express = require('express');
var router = express.Router();

const categoryPet = require('../model/CategoryPet');
const category = require('../model/category');

/**
 * @swagger
 * /categoryPet/add:
 *   post:
 *     summary: thêm loại sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: tên loại
 *     responses:
 *       200:
 *         description: Trả về loại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                    name:
 *                      type: string
 *                      description: tên loại
 *       500:
 *         description: Lỗi server
 */
router.post('/add',async function(req, res, next){
    try {
      const newCategory = new categoryPet(req.body);
      await newCategory.save();
      res.status(200).json({category: newCategory});
    } catch (error) {
      res.status(500).json('error: error')
    }
  });

  /**
 * @swagger
 * /categoryPet/list:
 *   get:
 *     summary: Lấy danh sách loại
 *     responses:
 *       200:
 *         description: Trả về danh sách loại
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
  router.get('/list', async function(req, res, next) {
    try {
      var data = await categoryPet.find({});
      res.json(data);
    } catch (error) {
      res.status(500).json({mess:"loi"} )
    }
    
  });
module.exports = router;