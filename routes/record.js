const express = require('express');
const { getRecord } = require('../controller/record')
const router = express.Router();

/* GET records. */
router.post('/', getRecord);

module.exports = router;
