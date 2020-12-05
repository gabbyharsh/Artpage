const express = require('express');
const router = express.Router();
const arts = require('../controllers/arts');
const catchAsync = require('../utilities/catchAsync');
const {isLoggedIn, isAuthor, validateArt} = require('../middleware');
const Art = require('../models/art');
const multer  = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(arts.index))
    .post(isLoggedIn, upload.array('image'), validateArt,  catchAsync(arts.createArt))
    
router.get('/new', isLoggedIn, arts.renderNewForm);

router.route('/:id')
    .get(catchAsync(arts.showArt))
    .put(isLoggedIn, isAuthor, validateArt, catchAsync(arts.updateArt))
    .delete(isLoggedIn, isAuthor, catchAsync(arts.deleteArt))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(arts.renderEditForm));

module.exports = router;