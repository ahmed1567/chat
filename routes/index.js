var express = require('express');
var router = express.Router();

const homeController=require('../controllers/homeController');
const authController=require('../controllers/authController');


/* GET home page. */
router.get('/', homeController.home) ;

//for auth
router.get('/sign_up',authController.sign_up_get );
router.post('/sign_up',authController.sign_up_post);

router.get('/sign_in',authController.sign_in_get );
router.post('/sign_in', authController.sign_in_post);

router.get('/sign_out', authController.sign_out) ;




module.exports = router;
