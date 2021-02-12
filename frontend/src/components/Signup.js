import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import ReactModal from "react-modal";
import styled from "styled-components";
import { apiURL } from "../api";

const Signup = () => {
	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const signUpUser = e => {
		e.preventDefault();
		const form = {
			email: e.target[0].value,
			password: e.target[1].value,
			name: e.target[2].value,
			bio: e.target[3].value,
			title: e.target[4].value,
		};
		console.log("SIGNUP: before fb auth");
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
						console.log(response);
						console.log("SIGNUP: in backend axios auth");
					})
					.catch(error => {
						console.log(error);
					});
				console.log("SIGNUP: in fb auth");
			})
			.catch(error => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(`${errorCode}: ${errorMessage}`);
			});
	};

	const checkUser = () => {
		const user = auth.currentUser;
		if (user != null) {
			user
				.updateProfile({
					displayName: "milton",
					photoURL: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
				})
				.then(function () {
					// Update successful.
					console.log(user.displayName);
					console.log(user.photoURL);
				})
				.catch(function (error) {
					// An error happened.
				});

			console.log(user.email);
			console.log(user.uid);
		}
	};

	return (
		<div>
			{/* <button onClick={checkUser}>check user</button> */}

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
