import mongoose from "mongoose";

async function connect() {
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connected');
    } catch (error) {
        console.log(error);
        console.log('Could not connect to db');
        process.exit(1)
    }
    
}

export default connect