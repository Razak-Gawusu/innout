const path = require('path')
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

// serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))