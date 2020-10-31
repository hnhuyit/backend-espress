var express = require('express')
var router = express.Router();
var files = require('../controllers/file.controller')

router.get("/", files.getListFiles);
router.post("/upload", files.upload);
router.get("/:name", files.download);


// router.post("/multiple-upload", files.multipleUpload);

module.exports = router
