import React from "react";

const Chip = ({ label, onClick }) => {
	return (
		<div className="chip">
			<div
				style={{
					border: "1px solid black",
					borderRadius: "25px",
					width: "40px",
					height: "100%",
					backgroundColor: "blue",
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
					// gap: 0.2em;
					justify-content: space-between;
					align-items: center;
					margin: 0.5em;
					border-radius: 20px;
					cursor: pointer;
					background-color: gray;
				}

				.chip span {
					cursor: pointer;
					margin: 0 0.2em;
					color: darkGrey;
					fontsize: 1em;
				}
			`}</style>
		</div>
	);
};

export default React.memo(Chip);
