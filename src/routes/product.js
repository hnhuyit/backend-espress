var express = require('express')
var router = express.Router();
var Product = require('../controllers/product')

router.post("/", Product.create);
router.get("/", Product.findAll);
router.get("/published", Product.findAllPublished);
router.get("/:id", Product.findOne);
router.put("/:id", Product.update);
router.delete("/:id", Product.delete);
router.delete("/", Product.deleteAll);


module.exports = router