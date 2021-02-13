import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../api";
import styled from "styled-components";

const NewLog = ({ userAuth }) => {
	const [form, setForm] = useState([]);

	const submitForm = e => {
		e.preventDefault();
		let label = "";
		let date = new Date();
		if (e.target.label.value !== "") {
			label = e.target.label.value;
		}
		if (e.target.date.value !== "") {
			date = e.target.date.value;
		}

		const form = {
			description: e.target.descr.value,
			label: label,
			duration: e.target.dur.value,
			date: date,
			userId: userAuth.uid,
		};
		axios.post(`${apiURL}/logs/add`, form).then(res => console.log(res.data));
	};

	return (
		<StyledNewLog>
			<form onSubmit={submitForm}>
				<div className="form-row">
					<label htmlFor="descr">Description:*</label>
					<input type="text" name="descr" id="descr" placeholder="Building a React app" required />
				</div>

				<div className="form-row">
					<label htmlFor="dur">Duration:*</label>
					<input type="number" name="dur" id="dur" min="0" placeholder="...in minutes" required />
				</div>

				<div className="form-row">
					<label htmlFor="label">Label:</label>
					<input type="text" name="label" id="label" placeholder="Coding" />
				</div>

				<div className="form-row">
					<label htmlFor="date">
						Date: <small>(leave empty for today's date)</small>
					</label>
					<input type="date" name="date" id="date" />
				</div>

				<div className="modal-buttons">
					<button type="submit">Add</button>
				</div>
			</form>
		</StyledNewLog>
	);
};

const StyledNewLog = styled.div`
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		label {
			font-size: 18px;
			text-shadow: 1px 1px 5px rgba(255, 255, 255, 0.664);
			margin-top: 3px;
		}

		input[type="text"],
		input[type="password"],
		input[type="date"],
		input[type="number"],
		textarea[type="text"] {
			padding: 7px 10px;
			background: rgba(255, 255, 255, 0.548);
			border: #ececec solid 2px;
			font-size: 16px;
			width: 450px;
		}
		button {
			margin: 0 !important;
		}
	}
`;

export default NewLog;
