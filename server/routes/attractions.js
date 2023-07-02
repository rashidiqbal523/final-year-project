const express = require('express');
const { homepage, attraction } = require('../controllers/attractionController');
const router = express.Router();

router.get("/attractions", homepage)
router.get("/attraction/:id", attraction)


module.exports = router;