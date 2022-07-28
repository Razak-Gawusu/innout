const mongoose = require('mongoose')

const uploadPath = 'frontend/public/images/uploads'

const productSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    price:{
        type: String,
        required: true
    },
    productImage:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
module.exports.uploadPath = uploadPath