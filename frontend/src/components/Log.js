import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { DayMonthDate, minToHM } from "../util";

const Log = ({ userAuth }) => {
	const [logList, setLogList] = useState({ log: [] });

	useEffect(() => {
		axios
			.post("http://localhost:5000/logs/", { userId: userAuth })
			.then(response => {
				setLogList({ log: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<StyledLog>
			{logList.log.length !== 0
				? logList.log.map(log => {
						return (
							<div className="log" key={log._id}>
								<div className="top">
									<p className="log-date">{DayMonthDate(log.date)}</p>
								</div>
								<div className="information">
									<div className="information-left">
										<p className="log-description">{log.description}</p>
										<p className="log-label">{log.label}</p>
									</div>
									<p>Total: {minToHM(log.duration)}</p>
								</div>
							</div>
						);
				  })
				: ""}
		</StyledLog>
	);
};

const StyledLog = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	margin-top: 1rem;
	padding-right: 0.5rem;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 0.5rem;
	}
	&::-webkit-scrollbar-thumb {
		background: rgba(51, 51, 51, 0.32);
		border-radius: 15px;
	}
	&::-webkit-scrollbar-track {
		background: transparent;
	}
	.log {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		background: white;
		margin-bottom: 1rem;
		font-size: 17px;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

		.top {
			background: #59afff;
			border-radius: 5px 5px 0 0;
			padding: 0.4rem 0.8rem;
			color: white;
		}

		.information {
			display: flex;
			justify-content: space-between;
			padding: 0.9rem 0.8rem;

			&-left {
				display: flex;

				.log-description {
					margin-right: 1.5rem;
				}
				.log-label {
					font-size: 13px;
					background: rgba(21, 29, 231, 0.32);
					padding: 1px 4px 0 4px;
					border-radius: 5px;
				}
			}
		}
	}
`;

export default Log;
