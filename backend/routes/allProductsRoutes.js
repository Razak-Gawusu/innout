const asyncHandler = require("express-async-handler")
const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')

//@desc Get all Products
//@route GET /api/products/
//@access Public
router.get('/', asyncHandler (async (req, res) => {
    let query = Product.find()

    if (req.query.name !== null && req.query.name !== ''){
        query = query.regex('name', new RegExp(req.query.name, 'i'))
    }

    const product = await query.exec()
    
    res.status(200).json(product)
}))

router.get('/:id', asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id).populate('user').exec()

    if (!product){
        res.status(400)
        throw new Error('Product not found')
    } else {
        res.status(200).json([product])
    }
}))

module.exports = router