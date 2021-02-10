const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			minlength: 3,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 3,
		},
		name: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
			required: false,
		},
		title: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
