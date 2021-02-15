const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

export const DayMonthDate = d => {
	const userDate = new Date(d);
	const options = {
		timeZone: "UTC",
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	const formatted = userDate.toLocaleDateString("en-US", options);
	return formatted;
};

export const minToHM = min => {
	let hours = Math.floor(min / 60);
	const minutes = min % 60;
	if (hours === 0) {
		hours = "";
	} else if (hours === 1) {
		hours = `${hours} hour`;
	} else {
		hours = `${hours} hours`;
	}
	return `${hours} ${minutes} min${minutes > 1 ? "s" : ""}`;
};

export const MonthDayYear = d => {
	const userDate = new Date(d);
	const options = {
		timeZone: "UTC",
	};
	const formatted = userDate.toLocaleDateString("en-US", options);
	return formatted;
};

export const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getTotalMins = arr => {
	return arr.reduce((acc, curr) => {
		return acc + curr.duration;
	}, 0);
};

export const inputToValue = d => {
	const userDate = new Date(d);
	const options = {
		timeZone: "UTC",
	};
	const formatted = userDate.toLocaleDateString("en-US", options);
	const formattedArr = formatted.split("/");
	let month = formattedArr[0];
	let date = formattedArr[1];
	const year = formattedArr[2];

	if (month < 10) {
		month = month.padStart(2, "0");
	}
	if (date < 10) {
		date = date.padStart(2, "0");
	}
	return `${year}-${month}-${date}`;
};
