import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { auth } from "./firebase";

import Log from "./components/Log.js";
import GlobalStyles from "./components/GlobalStyles.js";
import LogNav from "./components/LogNav.js";
import LogTotal from "./components/LogTotal.js";
import NewLog from "./components/NewLog.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
	const [userAuth, setUserAuth] = useState(null);
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				console.log("user logged in: ", user);
				setUserAuth(user);
			} else {
				console.log("user logged out");
				setUserAuth(null);
			}
		});
	});

	return (
		<BrowserRouter>
			<GlobalStyles />
			<StyledDashboard>
				<div className="profile">
					<Profile userAuth={userAuth} />
				</div>
				<div className="vertical-line"></div>
				<div className="logs-info">
					{!userAuth && (
						<div className="userForms">
							<Signup />
							<Login />
						</div>
					)}

					<LogNav />
					<Switch>
						<Route path="/" component={() => <Log userAuth={userAuth} />} exact />
						<Route path="/add" component={() => <NewLog userAuth={userAuth} />} exact />
						<Route path="/total" component={() => <LogTotal userAuth={userAuth} />} exact />
						{/* <Route path="/user/signup" component={Signup} exact /> */}
					</Switch>
				</div>
			</StyledDashboard>
		</BrowserRouter>
	);
};

const StyledUser = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: rgba(255, 255, 255, 0.192);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(9.5px);
	-webkit-backdrop-filter: blur(9.5px);
	border-radius: 30px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	margin: auto;
	padding: 2rem;
	height: 85vh;
	width: 92vw;
`;

const StyledDashboard = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* background: linear-gradient(
		180deg,
		rgba(255, 255, 255, 0.4503) 0%,
		rgba(255, 255, 255, 0.57) 50.31%,
		rgba(255, 255, 255, 0.4503) 100%
	);
	box-shadow: 5px 5px 6px rgba(139, 139, 139, 0.25);
	border-radius: 50px; */
	background: rgba(255, 255, 255, 0.192);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(9.5px);
	-webkit-backdrop-filter: blur(9.5px);
	border-radius: 30px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	margin: auto;
	padding: 2rem;
	height: 85vh;
	width: 92vw;

	.profile {
		flex: 1;
		height: 100%;
	}
	.vertical-line {
		height: 90%;
		width: 2px;
		background: #272727;
		border-radius: 40px;
	}
	.logs-info {
		flex: 3;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}
`;

export default App;
