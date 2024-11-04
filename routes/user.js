var express = require('express');
var router = express.Router();
const JWT = require('jsonwebtoken');
const config = require("../config");


const User = require('../model/user');
const checkToken = require('./checkToken');

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: đăng ký
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: email người dùng
 *               password:
 *                 type: string
 *                 description: password người dùng
 *     responses:
 *       200:
 *         description: Trả về thông tin tài khoản
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                    email:
 *                      type: string
 *                      description: email người dùng
 *                    password:
 *                      type: string
 *                      description: password người dùng
 *       500:
 *         description: Lỗi server
 */
router.post('/register',async function(req, res, next) {
  try {
    const newUser= new User(req.body);
    await newUser.save();
    res.status(200).json({status:true,user:newUser});
  } catch (error) {
    res.status(500).json({message:error});
  }
});

router.get('/list',checkToken, async function(req, res, next) {
  try {
    var data = await User.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({mess:"loi"} )
  }
  
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: đăng nhập
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: email người dùng
 *               password:
 *                 type: string
 *                 description: password người dùng
 *     responses:
 *       200:
 *         description: Trả về thông tin tài khoản
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                    email:
 *                      type: string
 *                      description: email người dùng
 *                    password:
 *                      type: string
 *                      description: password người dùng
 *       500:
 *         description: Lỗi server
 */
router.post('/login',  async function(req, res, next) {
  try {
    const { email, password } = req.body;

    // Tìm user trong database
    const user = await User.findOne({email});
  console.log(user)
    if (!user) {
      return res.status(401).json({status:false, message: "tài khoản chưa tồn tại" });
    }

    if (user.email === email && user.password === password) {

      const token  = JWT.sign({id: user._id},config.SECRETKEY,{expiresIn:'1d'});
      const refreshToken = JWT.sign({id: user._id},config.SECRETKEY,{expiresIn:'1d'});

      return res.status(200).json({ status: true,user: user , token: token,refreshToken:refreshToken});
    } else {
      return res.status(401).json({ status: false, message: "Email hoặc mật khẩu không đúng" });
    }
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: "Lỗi server, vui lòng thử lại sau" });
  }
});
 
router.post('/refreshToken', async function(req, res , next) {
  const {refreshToken} = req.body;
  if(refreshToken){
    JWT.verify(refreshToken, config.SECRETKEY, async function (err){
      if(err){
        res.status(403).json({"status": 403, "err": err});
      }else{
        var newToken = JWT.sign({"data":"canh"}, config.SECRETKEY,{ expiresIn:'30s'})
        res.status(200).json({token:newToken});
      }
    });
  }else{
    res.status(401).json({"status": 401});
  }
})

router.post('/editPersonal', async function(req, res, next) {

  try {
    const {email,address,phone } = req.body;
    var item = await User.findOne({email});
    if (!item) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
    }
    if(item){
      item.address = address ? address: item.address;
      item.phone = phone ? phone: item.phone;
    }
    await item.save();
    res.json({status:true,userEdit:item})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
module.exports = router;