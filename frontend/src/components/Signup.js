import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import ReactModal from "react-modal";
import styled from "styled-components";
import { apiURL } from "../api";

const Signup = ({ userAuth, setUserInfo }) => {
	const [modalIsOpen, setIsOpen] = useState(false);

	useEffect(async () => {
		if (userAuth !== null) {
			console.log("PROFILE: ", userAuth);
			const result = await axios(`${apiURL}/users/${userAuth.uid}`);
			setUserInfo(result.data.user);
		}
	}, [userAuth, modalIsOpen, setUserInfo]);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const signUpUser = e => {
		e.preventDefault();
		let name = "";
		let bio = "";
		let title = "";

		if (e.target[2].value === "") {
			name = "Mysterious User";
		} else {
			name = e.target[2].value;
		}

		if (e.target[3].value === "") {
			bio = "Mysterious Person";
		} else {
			bio = e.target[3].value;
		}

		if (e.target[4].value === "") {
			title = "Mysterious";
		} else {
			title = e.target[4].value;
		}

		const form = {
			email: e.target[0].value,
			password: e.target[1].value,
			name: name,
			bio: bio,
			title: title,
		};
		auth
			.createUserWithEmailAndPassword(form.email, form.password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user;
				axios
					.post(`${apiURL}/users/add`, {
						userFirebaseUID: user.uid,
						email: form.email,
						name: form.name,
						bio: form.bio,
						title: form.title,
					})
					.then(response => {
						console.log("SIGNUP: in backend axios auth", response);
						setUserInfo(response.data.user);
						closeModal();
					})
					.catch(error => {
						console.log(error);
					});
			})
			.catch(error => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(`${errorCode}: ${errorMessage}`);
			});
	};

	return (
		<div>
			<button onClick={openModal}>Sign Up</button>
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Login"
				className="login-modal"
				overlayClassName="login-overlay">
				<h3>login</h3>
				<form onSubmit={signUpUser}>
					<label htmlFor="email">email</label>
					<input type="text" name="email" id="email" />

					<label htmlFor="password">password</label>
					<input type="text" name="password" id="password" />

					<label htmlFor="name">name</label>
					<input type="text" name="name" id="name" />

					<label htmlFor="bio">bio</label>
					<input type="text" name="bio" id="bio" />

					<label htmlFor="title">title</label>
					<input type="text" name="title" id="title" />

					<input type="submit" value="submit" />
				</form>
			</ReactModal>
		</div>
	);
};

export default Signup;
