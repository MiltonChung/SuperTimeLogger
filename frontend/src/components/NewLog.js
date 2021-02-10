import React, { useEffect, useState } from "react";
import axios from "axios";

const NewLog = () => {
	const [form, setForm] = useState([]);

	const submitForm = e => {
		e.preventDefault();
		const form = {
			description: e.target[0].value,
			label: e.target[1].value,
			duration: e.target[2].value,
			date: new Date(),
			userId: "602360ae5aa7fd41049785fa",
		};
		axios.post("http://localhost:5000/logs/add", form).then(res => console.log(res.data));
	};

	return (
		<div>
			<form onSubmit={submitForm}>
				<label htmlFor="descr">Description</label>
				<input type="text" name="descr" id="descr" />

				<label htmlFor="label">Label</label>
				<input type="text" name="label" id="label" />

				<label htmlFor="duration">Duration</label>
				<input type="number" name="duration" id="duration" />

				<label htmlFor="date">Date</label>
				<input type="text" name="date" id="date" />

				<input type="submit" value="submit" />
			</form>
		</div>
	);
};

export default NewLog;
