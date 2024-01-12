const express = require ('express')
const { registerUser , authUser ,allData, addUser} = require('../controller/userController')
const { protect } = require('../middlewares/protect')

const router = express.Router()


router.route('/').post(registerUser).get(protect , allData)
router.route('/login').post(authUser)
router.route('/addUser').post(registerUser)


module.exports = router   