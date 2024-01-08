const express = require ('express')
const { registerUser , authUser ,allData} = require('../controller/userController')
const { protect } = require('../middlewares/protect')

const router = express.Router()


router.route('/').post(registerUser).get(protect , allData)
router.route('/login').post(authUser)


module.exports = router 