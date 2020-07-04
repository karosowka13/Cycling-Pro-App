import mongoose from "mongoose";

const keysSchema = {
	p256dh: String,
	auth: String,
};

const subscriptionSchema = new mongoose.Schema({
	athlete_id: { type: String, ref: "Athlete" },
	endpoint: String,
	expirationTime: Number,
	keys: keysSchema,
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
