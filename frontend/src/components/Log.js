import React, { useEffect, useState } from "react";
import axios from "axios";

const Log = () => {
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
			<h2>log</h2>
			{logList.log.length !== 0
				? logList.log.map(log => {
						return (
							<div key={log._id}>
								<p>description: {log.description}</p>
								<p>label: {log.label}</p>
								<p>date: {log.date}</p>
								<p>duration: {log.duration}</p>
								<br></br>
							</div>
						);
				  })
				: ""}
		</div>
	);
};

export default Log;
