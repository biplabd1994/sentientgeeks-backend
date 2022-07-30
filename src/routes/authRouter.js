var express = require('express');
var router = express.Router();
const authController = include('controllers/authController');
const loginValidate = include('middlewares/loginValidate');
const registerValidate = include('middlewares/registerValidate');
router.get('/', function (req, res, next) {
    console.log('path ', req.originalUrl, 'url ', req.url);
    res.send('Auth Route');
});

router.post('/login', loginValidate, async (req, res, next) => {
    try {
        const result = await authController.login(req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.post('/register', registerValidate, async (req, res, next) => {
    try {
        const result = await authController.register(req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});
module.exports = router;