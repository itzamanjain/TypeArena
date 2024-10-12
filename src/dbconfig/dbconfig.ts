import mongoose from "mongoose";

export async function connectDb():Promise<void>{
    try{
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGO_URL is not defined in the environment variables");
          }

          await mongoose.connect(process.env.MONGODB_URL);


          const connection = mongoose.connection;

          connection.on("connected", () => {
            console.log("Connected to MongoDB");
          });

          connection.on("error",(error:Error) => {
            console.log("Error connecting to MongoDB");
            console.error(error);
            process.exit(1);
            
          })

    }catch(error:any)
    {
        console.log('Something went wrong while connecting to DB');
        console.error(error);
    }
}