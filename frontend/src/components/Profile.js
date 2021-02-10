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
