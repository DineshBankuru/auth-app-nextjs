import mongoose, { connection } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected successfully!");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection error! Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
