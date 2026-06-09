import mongoose from "mongoose"; /*impotamos la libreria*/

const connectDB = async () => {
    try {                               /*aqui hago el asyn await para que nos
                                        ayude a esperar antes de continuar */
        const coon = await mongoose. connect (process.env.MONGODB_URI);  
        console.log ('MongoDB ya esta conectado: ${conn.connection.host}');
    } catch (error) {               /*try y catch nos avisar si algo sale mal */
        console.error('A acurrido un error conectando MondoDB: ${error.message}');
        process.exit(1);
    }
};

export default connectDB;
