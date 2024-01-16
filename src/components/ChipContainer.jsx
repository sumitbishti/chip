import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import UsersList from "./UsersList";
import Chip from "./Chip";

const ChipContainer = () => {
	const [inputValue, setInputValue] = useState("");
	const [availableItems, setAvailableItems] = useState([
		"rohan",
		"sumit",
		"amit",
		"rohit",
		"suman",
		"amani",
		"amiti",
		"rohiti",
		"sumani",
		"amano",
		"amito",
		"rohito",
		"sumano",
		"amana",
	]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [inputPosition, setInputPosition] = useState({ bottom: 0, left: 0 });
	const [backspaceCount, setBackspaceCount] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState(-1);

	const inputRef = useRef(null);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
		setIsInputFocused(true);
		setBackspaceCount(0);
	};

	const filteredItems = useMemo(() => {
		const input = inputValue.toLowerCase();
		return availableItems.filter((item) => {
			return item.toLowerCase().startsWith(input);
		});
	}, [inputValue, availableItems]);

	const handleInputFocus = () => {
		setIsInputFocused(true);
		setSelectedIndex(-1);
	};

	useEffect(() => {
		if (inputRef.current) {
			const inputRect = inputRef.current.getBoundingClientRect();
			setInputPosition({
				bottom: inputRect.bottom + window.scrollY,
				left: inputRect.left + window.scrollX,
			});
		}
	}, [selectedItems]);

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

	const handleChipRemove = useCallback(
		(item) => {
			setSelectedItems(
				selectedItems.filter((selectedItem) => selectedItem !== item)
			);
			setAvailableItems([...availableItems, item]);
		},
		[availableItems, selectedItems]
	);

	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			setIsInputFocused(false);
		}

		if (e.key === "Backspace") {
			if (inputValue === "" && backspaceCount === 0) {
				setBackspaceCount(1);
			} else if (inputValue === "" && backspaceCount === 1) {
				const lastChip = selectedItems[selectedItems.length - 1];
				if (lastChip) {
					handleChipRemove(lastChip);
					setBackspaceCount(0);
				}
			}
		}

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((prevIndex) =>
				prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((prevIndex) =>
				prevIndex > 0 ? prevIndex - 1 : prevIndex
			);
		} else if (e.key === "Enter" && selectedIndex > -1) {
			handleItemClick(filteredItems[selectedIndex]);
			if (selectedIndex == availableItems.length - 1) {
				setSelectedIndex((prev) => prev - 1);
			}
		}
	};

	return (
		<div className="chip-container">
			<div className="chips-input-container">
				{selectedItems.map((item, index) => (
					<Chip
						key={index}
						label={item}
						onClick={handleChipRemove}
						highlight={
							index === selectedItems.length - 1 && backspaceCount === 1
						}
					/>
				))}
				<input
					className="input"
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					placeholder={"Add user..."}
					ref={inputRef}
				/>
			</div>
			<UsersList
				isInputFocused={isInputFocused}
				filteredItems={filteredItems}
				inputPosition={inputPosition}
				handleItemClick={handleItemClick}
				onKeyDown={handleKeyDown}
				selectedIndex={selectedIndex}
			/>

			<style jsx>{`
				.chip-container {
					position: relative;
				}

				.chips-input-container {
					display: flex;
					flex-wrap: wrap;
					background-color: white;
					border-radius: 10px 10px 0 0;
				}

				.input {
					color: black;
					height: 50px;
					width: fit-content;
					outline: none;
					padding: 0.5em;
					border-radius: 10px 10px 0 0;
				}
			`}</style>
		</div>
	);
};

export default ChipContainer;
