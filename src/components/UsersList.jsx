import { useRef, useEffect } from "react";

const UsersList = ({
	isInputFocused,
	filteredItems,
	inputPosition,
	handleItemClick,
	selectedIndex,
}) => {
	const listRef = useRef(null);

	useEffect(() => {
		if (listRef.current && selectedIndex !== -1) {
			const listItem = listRef.current.querySelector(
				`li:nth-child(${selectedIndex + 1})`
			);
			if (listItem) {
				const listItemHeight = listItem.clientHeight;
				const listHeight = listRef.current.clientHeight;
				const itemOffsetTop = listItem.offsetTop;

				if (
					itemOffsetTop + listItemHeight >
					listHeight + listRef.current.scrollTop
				) {
					listRef.current.scrollTop =
						itemOffsetTop + listItemHeight - listHeight;
				} else if (itemOffsetTop < listRef.current.scrollTop) {
					listRef.current.scrollTop = itemOffsetTop;
				}
			}
		}
	}, [selectedIndex]);

	return (
		<div
			className={`item-list ${isInputFocused ? "visible" : ""}`}
			style={{ top: inputPosition.bottom, left: inputPosition.left }}
			ref={listRef}
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
						height: 200px;
						overflow-y: auto;
						z-index: 1000;

						/* Firefox */
						scrollbar-width: thin;
						scrollbar-color: transparent transparent;

						/* Webkit (Chrome, Safari) */
						&::-webkit-scrollbar {
							width: 8px; /* Adjust the width as needed */
						}

						&::-webkit-scrollbar-thumb {
							background-color: #ccc; /* Color of the thumb */
							border-radius: 4px; /* Make the thumb rounded */
						}

						&::-webkit-scrollbar-track {
							background-color: transparent; /* Hide the track */
						}
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
