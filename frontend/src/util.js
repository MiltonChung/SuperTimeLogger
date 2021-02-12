const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Sun", "Mon", "Tues", "Thur", "Fri", "Sat"];

export const DayMonthDate = d => {
	const userDate = new Date(d);
	const day = dayNames[userDate.getDay()];
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
