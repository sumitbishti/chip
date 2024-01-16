const UsersList = ({
	isInputFocused,
	filteredItems,
	inputPosition,
	handleItemClick,
	selectedIndex,
}) => {
	return (
		<div
			className={`item-list ${isInputFocused ? "visible" : ""}`}
			style={{ top: inputPosition.bottom, left: inputPosition.left }}
		>
			<ul>
				{filteredItems.map((item, index) => (
					<li
						key={item}
						onMouseDown={() => handleItemClick(item)}
						className={index === selectedIndex ? "selected" : ""}
					>
						{item}
					</li>
				))}
			</ul>
			<style jsx>
				{`
					.item-list {
						position: fixed;
						background-color: #fff;
						box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
						display: none;
						width: 30%;
						z-index: 1000;
					}

					.item-list.visible {
						display: block;
					}

					.item-list ul {
						list-style: none;
						padding: 0;
						margin: 0;
					}

					.item-list li {
						padding: 0.5em;
						cursor: pointer;
						color: black;
					}

					.item-list li:hover {
						background-color: #f0f0f0;
					}
					.item-list li.selected {
						background-color: #f0f0f0;
					}
				`}
			</style>
		</div>
	);
};

export default UsersList;
