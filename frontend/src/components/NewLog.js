import React, { useState, useRef } from "react";
import axios from "axios";
import { apiURL } from "../api";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { inputToValue } from "../util";

const NewLog = ({ userAuth }) => {
	const [errMsgDescr, setErrMsgDescr] = useState("");
	const [errMsgDur, setErrMsgDur] = useState("");

	const formRef = useRef();

	let history = useHistory();

	const submitForm = e => {
		e.preventDefault();
		let label = "";
		let date = inputToValue(new Date());
		console.log(date);
		if (e.target.label.value !== "") {
			label = e.target.label.value;
		}
		if (e.target.date.value !== "") {
			date = e.target.date.value;
		}

		const form = {
			description: e.target.descr.value,
			duration: e.target.dur.value,
			label: label,
			date: date,
			userId: userAuth.uid,
		};

		if (form.description === "") {
			setErrMsgDescr("Please enter a description!");
		} else {
			setErrMsgDescr("");
		}
		if (form.duration === "") {
			setErrMsgDur("Please enter a duration!");
			return;
		} else {
			setErrMsgDur("");
		}

		axios
			.post(`${apiURL}/logs/add`, form)
			.then(res => {
				// console.log(res.data);
				history.push("/");
			})
			.catch(err => console.log(err));
	};

	const resetForm = e => {
		e.preventDefault();
		e.stopPropagation();
		formRef.current.reset();
	};

	return (
		<StyledNewLog>
			<form onSubmit={submitForm} ref={formRef}>
				<div className="form-row">
					<label htmlFor="descr">Description:*</label>
					<input
						type="text"
						name="descr"
						id="descr"
						placeholder="Building a React app"
						autoComplete="off"
					/>
					<div className="form-error-msg">{errMsgDescr && <small>{errMsgDescr}</small>}</div>
				</div>

				<div className="form-row">
					<label htmlFor="dur">
						Duration: <small>(in minutes)</small>*
					</label>
					<input
						type="number"
						name="dur"
						id="dur"
						min="0"
						placeholder="...in minutes"
						autoComplete="off"
					/>
					<div className="form-error-msg">{errMsgDur && <small>{errMsgDur}</small>}</div>
				</div>

				<div className="form-row">
					<label htmlFor="label">Label:</label>
					<input type="text" name="label" id="label" placeholder="Coding" autoComplete="off" />
				</div>

				<div className="form-row">
					<label htmlFor="date">
						Date: <small>(leave empty for today's date)</small>
					</label>
					<input type="date" name="date" id="date" />
				</div>

				<div className="modal-buttons">
					<button type="submit">add</button>
					<button onClick={resetForm}>reset</button>
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
		.form-error-msg {
			small {
				color: #cf0101;
				font-size: 14px;
				font-weight: 700;
				letter-spacing: 1px;
			}
		}
		button[type="submit"] {
			margin-right: 1rem;
		}
	}

	@media only screen and (max-width: 600px) {
		form {
			margin-top: 0.5rem;
			label {
				font-size: 17px;
			}
			.form-row {
				width: 100%;
			}

			input[type="text"],
			input[type="password"],
			input[type="date"],
			input[type="number"],
			textarea[type="text"] {
				width: 100%;
			}
			.form-error-msg {
				small {
					color: #ca0707;
				}
			}
			button[type="submit"] {
				margin-right: 1rem;
			}
		}
	}
`;

export default NewLog;
