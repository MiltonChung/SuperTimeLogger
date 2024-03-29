const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: false,
			unique: false,
		},
		name: {
			type: String,
			required: false,
			default: "User One",
		},
		bio: {
			type: String,
			required: false,
			default: "Mysterious person with no bio yet...",
		},
		title: {
			type: String,
			required: false,
			default: "Studyer",
		},
		admin: {
			type: Boolean,
			default: false,
		},
		userFirebaseUID: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
