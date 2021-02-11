import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dogImg from "../img/dog.jpg";
import { auth } from "../firebase";
import axios from "axios";
import ReactModal from "react-modal";

const Profile = ({ userAuth }) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	useEffect(async () => {
		if (userAuth !== null) {
			console.log("PROFILE: ", userAuth);
			const result = await axios(`http://localhost:5000/users/${userAuth.uid}`);
			await setUserInfo(result.data.user);
			await console.log(userInfo);
		}
	}, [userAuth]);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const signOut = () => {
		auth.signOut();
	};

	const editProfile = async e => {
		e.preventDefault();
		const form = {
			name: e.target[0].value,
			title: e.target[1].value,
			bio: e.target[2].value,
			userFirebaseUID: userAuth.uid,
			email: e.target[3].value,
		};

		try {
			const update = await axios.post(`http://localhost:5000/users/update/${userAuth.uid}`, form);
			const updateEmailRes = await auth.currentUser.updateEmail(form.email);
			console.log("PROFILE update: ", update);
			console.log("PROFILE updateEmailRes: ", updateEmailRes);
			closeModal();
		} catch (e) {
			console.log(`Error updating user info: ${e}`);
		}
	};

	return (
		<StyledProfile>
			<div className="profile-info">
				{userAuth && (
					<>
						<img src={dogImg} alt="dog" />
						<h2>{userInfo.name}</h2>
						<div className="short-line"></div>
						<h3>{userInfo.title}</h3>
						<p>{userInfo.bio}</p>
					</>
				)}
			</div>
			{userAuth && (
				<div className="account-info">
					<button className="edit-profile" onClick={openModal}>
						edit profile
					</button>
					<button className="sign-out" onClick={signOut}>
						sign out
					</button>
					<p>Joined on: {userInfo.createdAt}</p>
				</div>
			)}
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Login"
				className="login-modal"
				overlayClassName="login-overlay">
				<h3>Edit Profile</h3>
				<form onSubmit={editProfile}>
					<label htmlFor="fullname">Full Name</label>
					<input type="text" name="fullname" id="fullname" />

					<label htmlFor="title">Title</label>
					<input type="text" name="title" id="title" />

					<label htmlFor="bio">Bio</label>
					<input type="text" name="bio" id="bio" />

					<label htmlFor="email">Email</label>
					<input type="text" name="email" id="email" />

					<input type="submit" value="submit" />
				</form>
			</ReactModal>
		</StyledProfile>
	);
};

const StyledProfile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	padding: 1rem 0.5rem;

	.profile-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		text-shadow: 1px 1px 3px #303030;

		img {
			width: 180px;
			height: 180px;
			object-fit: cover;
			border-radius: 50%;
			border: 1px solid #323232;
		}

		h2 {
			margin-top: 0.5rem;
			font-weight: 700;
			font-size: 34px;
			line-height: 58px;
			letter-spacing: 0.03em;
		}

		.short-line {
			width: 20%;
			height: 2px;
			background: #272727;
			border-radius: 40px;
			margin-bottom: 1rem;
		}

		h3 {
			font-weight: 500;
			font-size: 22px;
			line-height: 20px;
			letter-spacing: 0.03em;
			margin-bottom: 0.7rem;
		}

		p {
			width: 85%;
			text-align: center;
			font-size: 16px;
			font-weight: 400;
			line-height: 20px;
			letter-spacing: 0.03em;
		}
	}

	.account-info {
		.edit-profile {
		}
		.sign-out {
		}
		p {
		}
	}
`;

export default Profile;
