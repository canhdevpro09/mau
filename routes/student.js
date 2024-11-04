var express = require('express');
var router = express.Router();

var list = [
    {'mssv':1,'hoten':'canh','lop':'MD18403','dtb':5},
    {'mssv':2,'hoten':'tuan','lop':'MD18401','dtb':7},
    {'mssv':3,'hoten':'thien','lop':'MD18402','dtb':8},
    {'mssv':4,'hoten':'thong','lop':'MD18401','dtb':9},
    {'mssv':5,'hoten':'hoa','lop':'MD18401','dtb':6},
]

//Tạo ra 1 danh sách sinh viên gồm các thông tin sau: mssv, họ tên, lớp, dtb
router.get('/danhsach', function(req, res, next) {
  res.status(200).json(list);
});

//Thêm mới một sinh viên
router.post('/add', function(req, res, next) {
 const {mssv,hoten,lop,dtb} = req.body;

 var item ={mssv:mssv,hoten:hoten,lop:lop,dtb:dtb};

 list.push(item);

 res.status(200).json(list);
});

// Thay đổi thông tin sinh viên theo mssv,
router.post('/edit', function(req, res, next){
    const {mssv,hoten,lop,dtb} = req.body;

    var item = list.find(p => p.mssv === mssv);
    item.hoten = hoten;
    item.lop = lop;
    item.dtb = dtb;
    
    res.status(200).json(list);
});


// Xóa một sv ra khỏi danh sách
router.delete('/delete/:mssv', function(req, res, next){
    const {mssv} = req.params;

    var index = list.findIndex(p => p.mssv == mssv);
    list.splice(index, 1);
    res.status(200).json(list);
});

//Lấy thông tin chi tiết của một sv theo mssv
router.get('/detail',function(req,res,next){
    const {mssv} = req.query;

    var item = list.find(p => p.mssv == mssv);

    res.json(item);
});

//Lấy danh sách các sinh viên có điểm trung bình từ 6.5 đến 8.0
router.get('/dtb',function(req,res,next){
    const filter = list.filter(p => p.dtb >= 6 && p.dtb <= 8  );

    res.json(filter);
});

//Lấy ra danh sách các sinh viên thuộc lớp MD18401 và có điểm trung bình lớn hơn 9
router.get('/danhsachlop',function(req,res,next){
    const filter = list.filter(p => p.lop == 'MD18401' && p.dtb>=9);
    
    res.json(filter);
});

//Sắp xếp danh sách sinh viên theo điểm trung bình
router.get('/sort',function(req,res,next){
    const sort = [...list].sort((a,b) => a.dtb - b.dtb);
    res.json(sort);
});

//Tìm ra sinh viên có điểm trung bình cao nhập thuộc lớp MD18401
router.get('/caonhat',function(req,res,next){
    const filter = list.filter(p => p.lop == 'MD18401');

    const sort = [...filter].sort((a,b)=> b.dtb - a.dtb);

    var item = sort[0];

    res.json(item);

});

module.exports = router;