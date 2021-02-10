import React, { useEffect, useState } from "react";
import axios from "axios";

const Calculate = ({ log }) => {
	let total = log.reduce((acc, curr) => {
		return acc + curr.duration;
	}, 0);

	return <p>Total duration: {total}</p>;
};

const LogTotal = () => {
	const [logList, setLogList] = useState({ log: [] });

	useEffect(() => {
		axios
			.get("http://localhost:5000/logs/")
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
