import mongoose from "mongoose";
import dotenv from "../../dist/node_modules/dotenv";
dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		mongoose.connection.useDb("Cycling-Pro-App");

		console.log("MongoDB is Connected...");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
