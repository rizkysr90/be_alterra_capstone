const express = require('express')
const router = express.Router()
const controllerNotifikasi = require('../controller/controller.notifications')

router.get('/', controllerNotifikasi.getNotifikasiAll)

module.exports = router

