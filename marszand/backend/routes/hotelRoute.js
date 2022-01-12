const express = require('express')
const hotelController = require('../controllers/hotelController');
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

router.get('/galleries/me', hotelController.all_galleries_me_get)
router.post('/galleries/me', hotelController.new_gallery_post)
router.get('/galleries/me/:id', hotelController.one_gallery_by_id_get)
router.post('/galleries/me/:id/pictures', upload.single('image'), hotelController.new_picture_in_gallery)
router.get('/galleries/me/:id/pictures', hotelController.all_images_from_gallery_by_id_get)
router.get('/galleries/me/:id/pictures/:pid', hotelController.single_picture_get)

router.get('/galleries', hotelController.all_artists_galleries_get)
router.get('/galleries/:id', hotelController.one_artist_gallery_get)
router.get('/galleries/:id/pictures', hotelController.all_artist_gallery_pictures_get)
router.get('/galleries/:id/pictures/:pid', hotelController.single_artist_picture_get)

module.exports = router