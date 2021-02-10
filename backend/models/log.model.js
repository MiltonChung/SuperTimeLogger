const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		label: {
			type: String,
			required: false,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Log", logSchema);
