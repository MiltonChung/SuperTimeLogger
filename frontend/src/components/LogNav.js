import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { BsFillPlusSquareFill } from "react-icons/bs";

const LogNav = ({ userAuth }) => {
	return (
		<StyledNav>
			<div className="logs-nav">
				<NavLink to="/" activeClassName="selected" exact>
					Time Log
				</NavLink>
				{userAuth && (
					<>
						<NavLink to="/total" activeClassName="selected" exact>
							Total
						</NavLink>
					</>
				)}
			</div>
			{userAuth && (
				<Link to="/add" className="add-log">
					+
				</Link>
			)}
		</StyledNav>
	);
};

const StyledNav = styled.div`
	display: flex;
	flex-direction: column;
	.logs-nav {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;

		a {
			text-shadow: 1px 1px 1px #303030;
			color: white;
			margin-left: 1rem;
			text-decoration: none;
			font-size: 20px;
			padding-bottom: 2px;
			transition: all 0.3s;
			border-bottom: 2px transparent solid;
		}
		a.selected {
			text-shadow: none;
			color: black;
			border-bottom: 2px black solid;
		}
		a:hover {
			color: black;
			text-shadow: unset;
		}
	}

	a.add-log {
		width: fit-content;
		height: fit-content;
		text-decoration: none;
		font-size: 27px;
		color: white;
		background: #59afff;
		padding: 1px 10px;
		border-radius: 5px;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		transition: all 0.3s;
	}
	a.add-log:hover {
		color: white;
		background: #488ccc;
	}
`;

export default LogNav;
