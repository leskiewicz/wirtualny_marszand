const express = require('express')
const artystaController = require('../controllers/artystaController');
const router = express.Router()

const multer = require('multer');

const FILE_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
  };
  const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, "public/pictures");
	},
	filename: function (req, file, cb) {
	  let filename = file.originalname.replace(" ", "-");
      let filenameParts = filename.split(".");
      filenameParts.pop();
      filename = filenameParts.join(".");

	  const extension = FILE_TYPE_MAP[file.mimetype]
	  cb(null, `${filename}-${Date.now()}.${extension}`);
	},
  });

var upload = multer({ storage: storage })

router.get('/pictures', artystaController.all_pictures_get);
router.get('/pictures/:id', artystaController.one_picture_get);
router.post('/pictures', upload.single('image'), artystaController.new_picture_post);

router.post('/pictures/:id/sell', artystaController.picture_on_sale_post);

router.get('/sale/pictures', artystaController.all_pictures_sale_get);
router.get('/sale/pictures/:id', artystaController.one_picture_sale_get);


/*
router.get('/galleries/me', artystaController.all_galleries_me_get)
router.post('/galleries/me', artystaController.new_gallery_post)
router.get('/galleries/me/:id', artystaController.one_gallery_by_id_get)
router.post('/galleries/me/:id/pictures', upload.single('image'), artystaController.new_picture_in_gallery)
router.get('/galleries/me/:id/pictures', artystaController.all_images_from_gallery_by_id_get)
router.get('/galleries/me/:id/pictures/:pid', artystaController.single_picture_get)
*/
router.get('/transactions', artystaController.show_history_get)
router.get('/transactions/:id', artystaController.show_history_one_get)


module.exports = router