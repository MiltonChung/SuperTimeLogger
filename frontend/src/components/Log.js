import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { DayMonthDate, minToHM, inputToValue } from "../util";
import { apiURL } from "../api";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";

const Log = ({ userAuth }) => {
	const [logList, setLogList] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [updateLog, setUpdateLog] = useState("");
	const [modalIsOpen, setIsOpen] = useState(false);
	const [userEdit, setUserEdit] = useState({});
	const [currLogId, setCurrLogId] = useState();
	const [currLogIndex, setCurrLogIndex] = useState();

	useEffect(() => {
		setIsLoading(true);
		axios
			.post(`${apiURL}/logs/`, { userId: userAuth })
			.then(response => {
				setLogList(response.data);
				setUserEdit(response.data);
				setIsLoading(false);
			})
			.catch(error => {
				console.log(error);
			});
	}, [updateLog, userAuth, modalIsOpen]);

	function openModal(log) {
		setIsOpen(true);
		setCurrLogId(log._id);
		setCurrLogIndex(userEdit?.findIndex(item => item._id === log._id));
	}

	function closeModal() {
		setIsOpen(false);
	}

	const handleDescription = e => {
		let newArr = {
			...userEdit,
			[currLogIndex]: {
				...userEdit[currLogIndex],
				description: e.target.value,
			},
		};
		setUserEdit(newArr);
	};

	const handleDuration = e => {
		let newArr = {
			...userEdit,
			[currLogIndex]: {
				...userEdit[currLogIndex],
				duration: e.target.value,
			},
		};
		setUserEdit(newArr);
	};

	const handleLabel = e => {
		let newArr = {
			...userEdit,
			[currLogIndex]: {
				...userEdit[currLogIndex],
				label: e.target.value,
			},
		};
		setUserEdit(newArr);
	};

	const handleDate = e => {
		let newArr = {
			...userEdit,
			[currLogIndex]: {
				...userEdit[currLogIndex],
				date: e.target.value,
			},
		};
		setUserEdit(newArr);
	};

	const editLogSubmit = e => {
		e.preventDefault();

		if (e.target.description.value === "") {
			return;
		}
		if (e.target.duration.value === "") {
			return;
		}

		const form = {
			description: e.target.description.value,
			duration: e.target.duration.value,
			label: e.target.label.value,
			date: e.target.date.value,
			userId: userAuth.uid,
		};

		// console.log("edit form", form);
		axios
			.post(`${apiURL}/logs/update/${currLogId}`, form)
			.then(response => {
				[...logList][currLogIndex] = response;
				setLogList(logList);
				closeModal();
			})
			.catch(err => console.log(err));
	};

	const deleteLog = log => {
		axios
			.delete(`${apiURL}/logs/${log._id}`)
			.then(data => setUpdateLog(data))
			.catch(err => console.log(err));
	};

	return (
		<StyledLog>
			{isLoading ? (
				<Loader type="BallTriangle" color="#fafafa" height={100} width={100} className="loader" />
			) : (
				<>
					{logList?.length !== 0 &&
						logList.map(log => {
							return (
								<div className="log" key={log._id}>
									<div className="top">
										<p className="log-date">{DayMonthDate(log.date)}</p>
										<div className="top-icons">
											<FontAwesomeIcon icon={faEdit} onClick={() => openModal(log)} />
											<FontAwesomeIcon icon={faTrash} onClick={() => deleteLog(log)} />
										</div>
									</div>
									<div className="information">
										<div className="information-left">
											<p className="log-description">{log.description}</p>
											{log.label && <p className="log-label">{log.label}</p>}
										</div>
										<p>Total: {minToHM(log.duration)}</p>
									</div>
								</div>
							);
						})}

					<ReactModal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						contentLabel="Edit Log"
						className="study-modal edit-log-modal"
						overlayClassName="study-overlay">
						<StyledForm onSubmit={editLogSubmit} className="edit-log-form">
							<h3>Edit Log</h3>
							<div className="form-row">
								<label htmlFor="description">Description:*</label>
								<input
									type="text"
									name="description"
									id="description"
									value={userEdit[currLogIndex]?.description}
									onChange={handleDescription}
									required
									placeholder="Building a React app"
								/>
							</div>

							<div className="form-row">
								<label htmlFor="duration">Duration:*</label>
								<input
									type="number"
									name="duration"
									id="duration"
									value={userEdit[currLogIndex]?.duration}
									onChange={handleDuration}
									min="0"
									required
									placeholder="...in minutes"
								/>
							</div>

							<div className="form-row">
								<label htmlFor="label">Label:</label>
								<input
									type="text"
									name="label"
									id="label"
									placeholder="Coding"
									value={userEdit[currLogIndex]?.label}
									onChange={handleLabel}
								/>
							</div>

							<div className="form-row">
								<label htmlFor="date">Date:</label>
								<input
									type="date"
									name="date"
									id="date"
									value={inputToValue(userEdit[currLogIndex]?.date, "value")}
									onChange={handleDate}
								/>
							</div>

							<div className="modal-buttons">
								<button type="submit">update</button>
								<button onClick={closeModal}>cancel</button>
							</div>
						</StyledForm>
					</ReactModal>
				</>
			)}
		</StyledLog>
	);
};

const StyledForm = styled.form``;

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
			display: flex;
			justify-content: space-between;
			.top-icons {
				.fa-edit {
					color: #2a992a;
					margin-right: 12px;
					cursor: pointer;
					font-size: 20px;
					transition: all 0.25s;
				}
				.fa-edit:hover {
					color: #248124;
				}
				.fa-trash {
					color: #d63737;
					cursor: pointer;
					font-size: 20px;
					transition: all 0.25s;
				}
				.fa-trash:hover {
					color: #b43030;
				}
			}
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
