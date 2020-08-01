const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.post('/upload-csv' , homeController.uploadCsv);
router.get("/view-csv/:id", homeController.viewCsv);
module.exports = router;