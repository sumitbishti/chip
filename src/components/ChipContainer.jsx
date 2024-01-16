import { useState, useMemo, useRef } from "react";

const ChipContainer = () => {
	const [inputValue, setInputValue] = useState("");
	const [availableItems, setAvailableItems] = useState([
		"Item1",
		"sumit",
		"amit",
		"Item2",
		"Item3",
	]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [inputPosition, setInputPosition] = useState({ bottom: 0, left: 0 });

	const inputRef = useRef(null);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const filteredItems = useMemo(() => {
		const input = inputValue.toLowerCase();
		return availableItems.filter((item) =>
			item.toLowerCase().startsWith(input)
		);
	}, [inputValue, availableItems]);

	const handleInputFocus = () => {
		setIsInputFocused(true);
		if (inputRef.current) {
			const inputRect = inputRef.current.getBoundingClientRect();
			setInputPosition({
				bottom: inputRect.bottom + window.scrollY,
				left: inputRect.left + window.scrollX,
			});
		}
	};

	const handleInputBlur = () => {
		setIsInputFocused(false);
	};

	const handleItemClick = (item) => {
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

	return (
		<div className="chip-container">
			<div className="chips-input-container">
				{selectedItems.map((item, index) => (
					<div
						key={item}
						className={`chip`}
						style={{ backgroundColor: "gray" }}
					>
						{item} <span onClick={() => handleChipRemove(item)}>X</span>
					</div>
				))}
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					placeholder={selectedItems.length ? "" : "Type here..."}
					ref={inputRef}
					style={{
						color: "black",
						height: "50px",
						width: "fit-content",
						outline: "none",
					}}
				/>
			</div>

			<div
				className={`item-list ${isInputFocused ? "visible" : ""}`}
				style={{ top: inputPosition.bottom, left: inputPosition.left }}
			>
				<ul>
					{filteredItems.map((item) => (
						<li
							key={item}
							onMouseDown={() => handleItemClick(item)}
							style={{ color: "black" }}
						>
							{item}
						</li>
					))}
				</ul>
			</div>

			<style jsx>{`
				.chip-container {
					position: relative;
				}

				.chips-input-container {
					display: flex;
					flex-wrap: wrap;
					background-color: white;
				}

				.chip {
					display: inline-block;
					padding: 0.5em;
					margin: 0.5em;
					border: 1px solid #ccc;
					border-radius: 4px;
					cursor: pointer;
				}

				.chip span {
					cursor: pointer;
					margin-left: 0.5em;
					color: #888;
				}

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
				}
			`}</style>
		</div>
	);
};

export default ChipContainer;
