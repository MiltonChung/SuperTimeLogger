const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

export const DayMonthDate = d => {
	const userDate = new Date(d);
	const day = dayNames[userDate.getDay() - 1];
	const month = monthNames[userDate.getMonth()];
	const date = userDate.getDate();
	return `${day}, ${month} ${date}`;
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
	const year = userDate.getFullYear();
	const month = userDate.getMonth() + 1;
	const date = userDate.getDate();
	return `${month}/${date}/${year}`;
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

export const inputToValue = (d, value) => {
	const date = new Date(d);
	const year = date.getFullYear();
	let month = String(date.getMonth() + 1);
	if (month < 10) {
		month = month.padStart(2, "0");
	}
	let day = String(date.getDate());
	if (day < 10) {
		day = day.padStart(2, "0");
	}
	console.log("original new date: ", date);
	console.log("formatted day: ", day);
	console.log("from: ", value);
	return `${year}-${month}-${day}`;
};
