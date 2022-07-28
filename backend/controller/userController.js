const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc register a new user
// @route POST api/users/
// @access public
const registerUser = asyncHandler ( async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // check if user already exist
    const userExits = await User.findOne({email})
    if (userExits){
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    // Send a json response if user created successfully
    if (user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc login user
// @route POST api/users/login
// @access public
const loginUser = asyncHandler ( async (req, res) => {
    const {email, password} = req.body

    if(!email, !password){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // check for user
    const user = await User.findOne({email})
    
    // compare passwords
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc get user data
// @route GET api/users/me
// @access private
const getUser = asyncHandler ( async (req, res) => {
    res.status(200).json(req.user)
}) 


// function to generate token for user
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}