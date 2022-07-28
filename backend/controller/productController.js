const asyncHandle = require('express-async-handler')
const fs = require('fs')
const {uploadPath} = require('../models/productModel')
const Product = require('../models/productModel')

// @desc Get products
// @route GET /api/products
// @acces Private
const getProducts = asyncHandle( async (req, res) =>{
    const products = await Product.find({user: req.user.id})
    res.status(200).json(products)
})

// @desc Add product
// @route POST /api/products
// @acces Private
const addProduct = asyncHandle( async (req, res) => {
    if (!req.body.name || !req.body.price){
        res.status(400)
        throw new Error('please add product field')
    }

    if (req.files.image === null){
        res.status(400)
        throw new Error('No file uploaded')
    }
    
    const file = req.files.image
    file.mv(`./${uploadPath}/${file.name}`, err => {
        if(err){
            console.error(err)
            return res.status(500).send(err)
        }
    })
    
    const product = await Product.create({
        name: req.body.name,
        user: req.user.id,
        description: req.body.description,
        price: req.body.price,
        productImage: file.name
    })

    res.status(200).json(product)
})

// @desc Update product
// @route PUT /api/products/:id
// @acces Private
const updateProduct = asyncHandle( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(400)
        throw new Error('Product not found')
    }

    // check for user
    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches the product user
    if(product.user.toString() !== req.user.id){
        res.status(400)
        throw new Error('User not Authorized')
    }

    const updatedProduct = await Product.findByIdAndUpdate(product, req.body, {
        new: true
    })

    res.status(200).json(updatedProduct)
})

// @desc Delete product
// @route DELETE /api/products/:id
// @acces Private
const deleteProduct = asyncHandle( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(400)
        throw new Error('Product not found')
    }

    // check for user
    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches the product user
    if(product.user.toString() !== req.user.id){
        res.status(400)
        throw new Error('User not Authorized')
    }

    // Remove product image when product is deleted.
    removeProductImage(product.productImage)

    await product.remove()

    res.status(200).json(req.params.id)
})

function removeProductImage(fileName){
    fs.unlink(`./${uploadPath}/${fileName}`, err => {
        if (err) console.error(err)
    })   
}

module.exports ={
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}