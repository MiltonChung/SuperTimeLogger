import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Log from "./components/Log.js";
import GlobalStyles from "./components/GlobalStyles.js";
import LogNav from "./components/LogNav.js";
import LogTotal from "./components/LogTotal.js";
import NewLog from "./components/NewLog.js";
import Profile from "./components/Profile.js";

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<StyledDashboard>
				<div className="profile">
					<Profile />
				</div>
				<div className="vertical-line"></div>
				<div className="logs-info">
					<LogNav />
					<Switch>
						<Route path="/log" component={Log} exact />
						<Route path="/log/add" component={NewLog} exact />
						<Route path="/log/total" component={LogTotal} exact />
					</Switch>
				</div>
			</StyledDashboard>
		</BrowserRouter>
	);
};

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
