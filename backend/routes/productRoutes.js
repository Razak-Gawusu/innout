const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
    getProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct
} = require('../controller/productController')

router.route('/').get(protect, getProducts).post(protect, addProduct)
router.route('/:id').delete(protect, deleteProduct).put(protect, updateProduct)

module.exports = router