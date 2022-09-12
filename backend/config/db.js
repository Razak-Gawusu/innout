const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true})
        console.log(`MongoDB connected`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB