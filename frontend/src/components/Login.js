import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import ReactModal from "react-modal";
import styled from "styled-components";
import LoginSVG from "../img/login.svg";

ReactModal.setAppElement("#root");

const Login = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		setErrMsg("");
	}, [modalIsOpen]);

	const loginUser = e => {
		e.preventDefault();
		const form = {
			username: e.target[0].value,
			password: e.target[1].value,
		};

		if (form.username === "" || form.password === "") {
			setErrMsg("Please fill out all fields");
			return;
		}

		auth
			.signInWithEmailAndPassword(form.username, form.password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user;
			})
			.catch(error => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setErrMsg(errorMessage);
				console.log(`${errorCode}: ${errorMessage}`);
			});
	};

	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}

	return (
		<StyledLogin>
			<button onClick={openModal} className="home-button">
				Login
				<div className="home-button__horizontal"></div>
				<div className="home-button__vertical"></div>
			</button>

			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Login"
				className="study-modal login-modal"
				overlayClassName="study-overlay">
				<form onSubmit={loginUser} method="POST">
					<img src={LoginSVG} alt="login pic" />
					<h3>Login</h3>
					<div className="form-row">
						<label htmlFor="email">Email</label>
						<input type="text" name="email" id="email" placeholder="example@exam.com" />
					</div>
					<div className="form-row">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" id="password" placeholder="Password" />
					</div>
					<div className="form-error-msg">{errMsg && <small>{errMsg}</small>}</div>
					<div className="modal-buttons">
						<button type="submit">login</button>
						<button onClick={closeModal}>close</button>
					</div>
				</form>
			</ReactModal>
		</StyledLogin>
	);
};

const StyledLogin = styled.div`
	button {
		color: white;
		background: rgb(168, 70, 214);
		padding: 0.7rem 1.5rem;
		font-size: 24px;
		margin-bottom: 1rem;
		width: 190px;
	}
	button:hover {
		background: rgb(136, 56, 173);
	}
`;

export default Login;
