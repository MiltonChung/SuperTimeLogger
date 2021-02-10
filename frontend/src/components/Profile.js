import React from "react";
import styled from "styled-components";
import dogImg from "../img/dog.jpg";

const Profile = () => {
	return (
		<StyledProfile>
			<div className="profile-info">
				<img src={dogImg} alt="dog" />
				<h2>Milton Chung</h2>
				<div className="short-line"></div>
				<h3>Frontend Developer</h3>
				<p>
					I love making designs come to life. I love making designs come to life. I love making designs
					come to life.
				</p>
			</div>
			<div className="account-info">
				<button className="edit-profile">edit profile</button>
				<button className="sign-out">sign out</button>
				<p>Joined on: 2/10/2021</p>
			</div>
		</StyledProfile>
	);
};

const StyledProfile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: space-between;
	justify-content: space-between;
	height: 100%;

	.profile-info {
		img {
			width: 300px;
			height: auto;
			object-fit: cover;
		}
	}
`;

export default Profile;
