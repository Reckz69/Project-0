import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'
import app from '../app.js';

// Database connection function
//Always use async/await with mongoose connection to handle connection properly (databse in different continent may take time to connect)
const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n mongo Db connected : ${connectionInstance.connection.host}`);
        
    }catch(err){
        console.log(`\n error in connecting to mongo Db : ${err.message}`);
        process.exit(1);
    }
}


export default connectDB()

//async method returning promise:
.then(() => {
    app.on('error', (err) => {
        console.log(`err:`, err);
        throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
.catch((error) => {
    console.error('Database connection error:', error);
})