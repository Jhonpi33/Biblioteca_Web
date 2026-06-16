import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        // Backticks ` ` para que ${} funcione como variable
        console.log(`MongoDB ya esta conectado: ${conn.connection.host}`);
    } catch (error) {
        // Backticks ` ` aquí también
        console.error(`A ocurrido un error conectando MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;