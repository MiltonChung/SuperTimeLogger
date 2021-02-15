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
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
	}, [updateLog, userAuth, isEditModalOpen]);

	function openEditModal(log) {
		setIsEditModalOpen(true);
		setCurrLogId(log._id);
		setCurrLogIndex(userEdit?.findIndex(item => item._id === log._id));
	}

	function closeModal() {
		setIsEditModalOpen(false);
		setIsDeleteModalOpen(false);
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

	const openDeleteModal = log => {
		setIsDeleteModalOpen(true);
		setCurrLogId(log._id);
		setCurrLogIndex(userEdit?.findIndex(item => item._id === log._id));
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
											<FontAwesomeIcon icon={faEdit} onClick={() => openEditModal(log)} />
											<FontAwesomeIcon icon={faTrash} onClick={() => openDeleteModal(log)} />
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
						isOpen={isEditModalOpen}
						onRequestClose={closeModal}
						contentLabel="Edit Log"
						className="study-modal edit-log-modal"
						overlayClassName="study-overlay">
						<form onSubmit={editLogSubmit} className="edit-log-form">
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
								<label htmlFor="duration">
									Duration: <small>(in minutes)</small>*
								</label>
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
						</form>
					</ReactModal>

					<ReactModal
						isOpen={isDeleteModalOpen}
						onRequestClose={closeModal}
						contentLabel="Delete Log"
						className="study-modal delete-log-modal"
						overlayClassName="study-overlay">
						<div className="delete-log-form">
							<h2>Confirm to delete</h2>
							<p>{`Are you sure you want to delete the log: ${userEdit[0]?.description}?`}</p>
							<div className="alert-ui-buttons-row">
								<button
									className="alert-delete"
									onClick={() => {
										axios
											.delete(`${apiURL}/logs/${userEdit[currLogIndex]?._id}`)
											.then(data => setUpdateLog(data))
											.catch(err => console.log(err));
										closeModal();
									}}>
									Delete
								</button>
								<button className="alert-cancel" onClick={closeModal}>
									Cancel
								</button>
							</div>
						</div>
					</ReactModal>
				</>
			)}
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
	overflow: auto;

	.log {
		width: 100%;
		min-height: fit-content;
		max-height: 200px;
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
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.log-label {
					font-size: 13px;
					background: rgba(21, 29, 231, 0.32);
					padding: 1px 4px 0 4px;
					border-radius: 5px;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-right: 5px;
				}
			}
		}
	}

	@media only screen and (max-width: 640px) {
		min-height: 500px;
		.log {
			font-size: 14.5px;
			.top {
				padding: 0.4rem 0.5rem;
				align-items: center;
				.top-icons {
					.fa-edit {
						margin-right: 15px;
						font-size: 16px;
					}
					.fa-trash {
						font-size: 16px;
					}
				}
			}
			.information {
				&-left {
					flex-direction: column;
					.log-label {
						width: fit-content;
						margin-top: 0.4rem;
					}
				}
			}
		}
	}
`;

export default Log;
