const express = require('express');
const router = express.Router();

// Controllers declarations
const codeCtrl = require('./controllers/codeController');


// CodeController Routing
router.post('/code/create', codeCtrl.create);
router.get('/code/get', codeCtrl.get);


module.exports = router;