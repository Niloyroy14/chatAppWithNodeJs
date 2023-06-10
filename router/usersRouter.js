//external import
const express = require('express');

//internal import
const { getUsers, addUser, removeUser } = require('../controller/userController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/userValidator');
const { checkLogin, requireRole } = require('../middlewares/common/checkLogin');

const router = express.Router();

//login page
router.get('/', decorateHtmlResponse('Users'), checkLogin, requireRole(["admin"]), getUsers);


//add user
router.post('/', checkLogin, avatarUpload, requireRole(["admin"]), addUserValidators, addUserValidationHandler, addUser);


//delete user
router.delete('/:id', checkLogin, requireRole(["admin"]), removeUser);



module.exports = router;