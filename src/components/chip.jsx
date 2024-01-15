"use client";
import { useState, useEffect } from "react";

const ChipComponent = () => {
	const [inputValue, setInputValue] = useState("");
	const [availableItems, setAvailableItems] = useState([
		"Item1",
		"Item2",
		"Item3",
	]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [isInputFocused, setIsInputFocused] = useState(false);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleInputFocus = () => {
		setIsInputFocused(true);
	};

	const handleInputBlur = () => {
		setIsInputFocused(false);
	};

	const handleItemClick = (item) => {
		console.log(item, "clicked");
		setSelectedItems([...selectedItems, item]);
		setAvailableItems(
			availableItems.filter((availableItem) => availableItem !== item)
		);
		setInputValue("");
	};

	const handleChipRemove = (item) => {
		setSelectedItems(
			selectedItems.filter((selectedItem) => selectedItem !== item)
		);
		setAvailableItems([...availableItems, item]);
	};

	useEffect(() => {
		// Update available items when selected items change
		setAvailableItems(
			availableItems.filter((item) => !selectedItems.includes(item))
		);
	}, [selectedItems]);

	return (
		<div className="chip-container">
			<div>
				{selectedItems.map((item) => (
					<div key={item} className="chip">
						{item} <span onClick={() => handleChipRemove(item)}>X</span>
					</div>
				))}
			</div>
			<div className={`item-list ${isInputFocused ? "visible" : "visible"}`}>
				<ul>
					{availableItems.map((item) => {
						return (
							<li
								key={item}
								onClick={() => handleItemClick(item)}
								style={{ color: "black" }}
							>
								{item}
							</li>
						);
					})}
				</ul>
			</div>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				placeholder="Type to search..."
				style={{ color: "black" }}
			/>

			<style jsx>{`
				/* Add your CSS styling here */
				.chip-container {
					position: relative;
				}
				.chip {
					display: inline-block;
					padding: 0.5em;
					margin: 0.5em;
					border: 1px solid #ccc;
					border-radius: 4px;
				}
				.chip span {
					cursor: pointer;
					margin-left: 0.5em;
					color: #888;
				}
				.item-list {
					position: absolute;
					top: 100%;
					left: 0;
					background-color: #fff;
					box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
					border: 1px solid #ccc;
					display: none;
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
				}
			`}</style>
		</div>
	);
};

export default ChipComponent;
