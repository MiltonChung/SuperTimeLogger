import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import ReactModal from "react-modal";
import styled from "styled-components";

ReactModal.setAppElement("#root");

const Login = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const loginUser = e => {
		e.preventDefault();
		const form = {
			username: e.target[0].value,
			password: e.target[1].value,
		};

		auth
			.signInWithEmailAndPassword(form.username, form.password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user;
			})
			.catch(error => {
				var errorCode = error.code;
				var errorMessage = error.message;
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
			<button onClick={openModal}>Login</button>

			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Login"
				className="login-modal"
				overlayClassName="login-overlay">
				<h3>login</h3>
				<form onSubmit={loginUser} method="POST">
					<label htmlFor="username">username</label>
					<input type="text" name="username" id="username" />

					<label htmlFor="password">password</label>
					<input type="text" name="password" id="password" />

					<input type="submit" value="submit" />
				</form>
			</ReactModal>
		</StyledLogin>
	);
};

const StyledLogin = styled.div``;

export default Login;
