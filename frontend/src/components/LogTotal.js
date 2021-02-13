import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../api";
import styled from "styled-components";
import TotalSVG from "../img/total_chart.svg";
import { minToHM } from "../util";

const TotalTimeSpent = ({ log }) => {
	let total = log.reduce((acc, curr) => {
		return acc + curr.duration;
	}, 0);

	return (
		<>
			<h2>Total Time Spent:</h2>
			<p className="total">{minToHM(total)}</p>
		</>
	);
};

const LogTotal = ({ userAuth }) => {
	const [logList, setLogList] = useState({ log: [] });
	const [allLogs, setAllLogs] = useState({ log: [] });

	useEffect(() => {
		axios
			.post(`${apiURL}/logs/`, { userId: userAuth })
			.then(response => {
				setLogList({ log: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.post(`${apiURL}/logs/`, { userId: "" })
			.then(response => {
				console.log(response.data);
				setAllLogs({ log: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<StyledTotal>
			<img src={TotalSVG} alt="total" />
			{logList.log.length !== 0 && <TotalTimeSpent log={logList.log} />}
		</StyledTotal>
	);
};

const StyledTotal = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;

	img {
		width: 50%;
	}
	.total {
	}
`;

export default LogTotal;
