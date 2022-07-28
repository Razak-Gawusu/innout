const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const productsRouter = require('./routes/productRoutes')
const usersRouter = require('./routes/userRoutes')
const allProductsRouter = require('./routes/allProductsRoutes')
// connecting to database
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(fileUpload())

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/allProducts', allProductsRouter)


app.use(errorHandler)

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))