import React from "react";

const Chip = ({ label, onClick, highlight }) => {
	return (
		<div className={`chip ${highlight ? "highlight" : ""}`}>
			<div
				style={{
					border: "1px solid black",
					borderRadius: "25px",
					width: "40px",
					height: "100%",
					backgroundColor: "black",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{label[0]}
			</div>

			<div style={{ padding: "0.5em" }}>
				{label} <span onClick={() => onClick(label)}>X</span>
			</div>
			<style jsx>{`
				.chip {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 0.5em;
					border-radius: 20px;
					cursor: pointer;
					background-color: darkGray;
				}

				.chip span {
					cursor: pointer;
					margin: 0 0.2em;
					fontsize: 1em;
				}

				.highlight {
					background-color: gray;
				}
			`}</style>
		</div>
	);
};

export default React.memo(Chip);
