import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import axios from "axios";
import ReactModal from "react-modal";
import { MonthDayYear } from "../util";
import { apiURL } from "../api";
import dogImg from "../img/dog.jpg";
import EditProfileSVG from "../img/edit-profile.svg";

const Profile = ({ userAuth, userInfo, setUserInfo }) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [userEdit, setUserEdit] = useState({});

	useEffect(async () => {
		if (userAuth !== null) {
			console.log("PROFILE: ", userAuth);
			const result = await axios(`${apiURL}/users/${userAuth.uid}`);
			setUserInfo(result.data.user);
			setUserEdit(result.data.user);
		}
	}, [userAuth, modalIsOpen, setUserInfo]);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const signOut = () => {
		auth.signOut();
	};

	const handleName = e => {
		setUserEdit({ ...userEdit, name: e.target.value });
	};
	const handleTitle = e => {
		setUserEdit({ ...userEdit, title: e.target.value });
	};
	const handleBio = e => {
		setUserEdit({ ...userEdit, bio: e.target.value });
	};
	const handleEmail = e => {
		setUserEdit({ ...userEdit, email: e.target.value });
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
			const update = await axios.post(`${apiURL}/users/update/${userAuth.uid}`, form);
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
				{userAuth ? (
					<>
						{userInfo ? (
							<>
								<img src={dogImg} alt="dog" />
								<h2>{userInfo?.name}</h2>
								<div className="short-line"></div>
								<h3>{userInfo?.title}</h3>
								<p>{userInfo?.bio}</p>
							</>
						) : (
							<img src={dogImg} alt="dog" />
						)}
					</>
				) : (
					<>
						<h2>Study Time Log</h2>
						<img src={dogImg} alt="dog" />
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
					<p>Joined on: {MonthDayYear(userInfo?.createdAt)}</p>
				</div>
			)}

			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Login"
				className="study-modal edit-profile-modal"
				overlayClassName="study-overlay">
				<StyledForm onSubmit={editProfile} className="edit-profile-form">
					<img src={EditProfileSVG} alt="svg" />
					<h3>Edit Profile</h3>
					<div className="form-row">
						<label htmlFor="fullname">Full Name</label>
						<input
							type="text"
							name="fullname"
							id="fullname"
							value={userEdit?.name}
							onChange={handleName}
							placeholder="Full Name"
						/>
					</div>

					<div className="form-row">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							name="title"
							id="title"
							value={userEdit?.title}
							onChange={handleTitle}
							placeholder="Title"
						/>
					</div>

					<div className="form-row">
						<label htmlFor="bio">Bio</label>
						<textarea
							type="text"
							name="bio"
							id="bio"
							className="textarea"
							value={userEdit?.bio}
							onChange={handleBio}
							placeholder="Bio"
							rows="3"
							maxLength="150"
						/>
					</div>

					<div className="form-row">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							id="email"
							value={userEdit?.email}
							onChange={handleEmail}
							placeholder="Email"
						/>
					</div>

					<div className="modal-buttons">
						<button type="submit">update</button>
						<button onClick={closeModal}>close</button>
					</div>
				</StyledForm>
			</ReactModal>
		</StyledProfile>
	);
};

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;

	img {
		width: 40%;
		align-self: center;
	}
	h3 {
		font-size: 20px;
	}
`;

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
		justify-content: center;
		flex-direction: column;
		align-items: center;
		display: flex;

		.edit-profile {
			padding: 0.5rem 1rem;
			background: #59afff;
			margin-bottom: 0.6rem;
			width: 130px;
			cursor: pointer;
			font-size: 16px;
		}
		.sign-out {
			padding: 0.5rem 1rem;
			background: #ff0000;
			margin-bottom: 0.6rem;
			width: 130px;
			font-size: 16px;
		}
		.edit-profile:hover {
			background: #488ccc;
		}
		.sign-out:hover {
			background: #c70000;
		}
	}
`;

export default Profile;
