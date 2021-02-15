import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../api";
import styled from "styled-components";
import TotalSVG from "../img/total_chart.svg";
import { minToHM, getRandomInt, getTotalMins } from "../util";
import Loader from "react-loader-spinner";

const TotalTimeSpent = ({ log }) => {
	const mins = getTotalMins(log);
	return (
		<>
			{mins >= 60 ? (
				<>
					<p className="total-min">
						<span>{mins}</span> minutes
					</p>
					<h2>Total Time Spent</h2>
					<p className="total-hour-min">that's {minToHM(getTotalMins(log))}!</p>
				</>
			) : (
				<>
					<p className="total-min">
						<span>{mins}</span> minutes
					</p>
					<h2>Total Time Spent</h2>
				</>
			)}
		</>
	);
};

const CommunityTotal = ({ log }) => {
	const mins = getTotalMins(log);
	return (
		<>
			{mins >= 60 ? (
				<>
					<p className="total-min">
						<span>{mins}</span> minutes
					</p>
					<h2>Community Total</h2>
					<p className="total-hour-min">that's {minToHM(getTotalMins(log))}!</p>
				</>
			) : (
				<>
					<p className="total-min">
						<span>{mins}</span> minutes
					</p>
					<h2>Total Time Spent</h2>
				</>
			)}
		</>
	);
};

const RandomQuote = ({ quote }) => {
	return (
		<div className="random-quote">
			<h3>"{quote.text}"</h3>
			<p>- {quote.author === null ? "Anonymous" : quote.author}</p>
		</div>
	);
};

const LogTotal = ({ userAuth }) => {
	const [logList, setLogList] = useState({ log: [] });
	const [allLogs, setAllLogs] = useState({ log: [] });
	const [isLoading1, setIsLoading1] = useState(true);
	const [isLoading2, setIsLoading2] = useState(true);
	const [randomQuote, setRandomQuote] = useState();

	useEffect(() => {
		setIsLoading1(true);
		axios
			.post(`${apiURL}/logs/`, { userId: userAuth })
			.then(response => {
				setLogList({ log: response.data });
				setIsLoading1(false);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		setIsLoading2(true);
		axios
			.post(`${apiURL}/logs/`, { userId: "" })
			.then(response => {
				setAllLogs({ log: response.data });
				setIsLoading2(false);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get("https://type.fit/api/quotes")
			.then(response => {
				const res = response.data[getRandomInt(0, response.data.length)];
				setRandomQuote(res);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<StyledTotal>
			<div className="img-quote">
				<img src={TotalSVG} alt="total" />
				{randomQuote && <RandomQuote quote={randomQuote} />}
			</div>
			<div className="total">
				{isLoading1 ? (
					<Loader type="ThreeDots" color="#3486c9" height={100} width={100} className="loader" />
				) : (
					<>
						{logList.log.length !== 0 && (
							<div className="total-category">
								<TotalTimeSpent log={logList.log} />
							</div>
						)}
					</>
				)}

				{isLoading2 ? (
					<Loader type="ThreeDots" color="#3486c9" height={100} width={100} className="loader" />
				) : (
					<>
						{allLogs.log.length !== 0 && (
							<div className="total-category">
								<CommunityTotal log={allLogs.log} />
							</div>
						)}
					</>
				)}
			</div>
		</StyledTotal>
	);
};

const StyledTotal = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin-top: 1rem;
	height: 100%;
	overflow: auto;
	position: relative;
	min-height: 0;

	img {
		width: 40%;
		min-width: 250px;
	}
	.img-quote {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.total {
		width: 100%;
		height: fit-content;
		margin-top: 3rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
		color: white;

		&-category {
			background: #59afff;
			box-shadow: 3px 3px 10px rgba(18, 54, 131, 0.445);
			border-radius: 15px;
			padding: 1rem;

			.total-min {
				font-size: 18px;
				text-align: center;
				span {
					font-size: 60px;
				}
			}
			.total-hour-min {
				font-size: 13px;
				text-align: right;
				font-style: italic;
			}
		}
	}
	.random-quote {
		text-align: center;
		h3 {
			font-size: 26px;
			line-height: 30px;
			font-weight: 500;
			font-style: italic;
		}
		p {
			font-size: 18px;
			line-height: 20px;
			font-weight: 400;
			font-style: italic;
		}
	}

	@media only screen and (max-width: 780px) {
		.img-quote {
			margin: 1rem 0;
			min-height: 350px;
		}
		img {
			width: 30%;
			min-width: unset;
		}
		.random-quote {
			text-align: left;
			margin-left: 1rem;
			h3 {
				font-size: 22px;
				line-height: 24px;
			}
			p {
				font-size: 16px;
				line-height: 18px;
			}
		}
		.total {
			width: 100%;
			margin-top: 3rem;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			min-height: 320px;

			&-category {
				box-shadow: unset;
				border-radius: 8px;
				padding: 1.2rem 0.8rem;
				margin: 0.4rem;

				.total-min {
					font-size: 18px;
					text-align: center;
					span {
						font-size: 30px;
					}
				}
				h2 {
					font-size: 25px;
					margin-top: 0.4rem;
				}
			}
		}
	}

	@media only screen and (max-width: 600px) {
		flex-direction: column-reverse;

		.img-quote {
			flex-direction: column-reverse;
		}
		img {
			width: 90%;
		}
		.random-quote {
			margin: 1.5rem 0;
			text-align: center;
			h3 {
				font-size: 22px;
				line-height: 24px;
			}
			p {
				font-size: 16px;
				line-height: 18px;
			}
		}
		.total {
			padding-top: 1rem;
			margin: 0;

			&-category {
				margin: 0.8rem 0;

				.total-min {
					font-size: 18px;
					text-align: center;
					span {
						font-size: 30px;
					}
				}
				h2 {
					font-size: 25px;
					margin-top: 0.4rem;
				}
			}
		}
	}
`;

export default LogTotal;
