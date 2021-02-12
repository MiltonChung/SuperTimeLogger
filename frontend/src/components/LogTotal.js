import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../api";

const Calculate = ({ log }) => {
	let total = log.reduce((acc, curr) => {
		return acc + curr.duration;
	}, 0);

	return <p>Total duration: {total}</p>;
};

const LogTotal = ({ userAuth }) => {
	const [logList, setLogList] = useState({ log: [] });

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

	return (
		<div>
			<h2>log total</h2>

			{logList.log.length !== 0 && <Calculate log={logList.log} />}
		</div>
	);
};

export default LogTotal;
