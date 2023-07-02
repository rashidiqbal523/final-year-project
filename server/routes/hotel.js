const express = require('express');
const { homepage, hotel } = require('../controllers/hotelController');
const router = express.Router();

router.get("/hotels", homepage)
router.get("/hotel/:id", hotel)

module.exports = router;