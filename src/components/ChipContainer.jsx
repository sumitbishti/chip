import { useState, useMemo, useRef, useCallback } from "react";
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
		"aman",
	]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [inputPosition, setInputPosition] = useState({ bottom: 0, left: 0 });
	const [backspaceCount, setBackspaceCount] = useState(0);

	const inputRef = useRef(null);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
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
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					placeholder={"Add user..."}
					ref={inputRef}
					className="input"
				/>
			</div>
			<UsersList
				isInputFocused={isInputFocused}
				filteredItems={filteredItems}
				inputPosition={inputPosition}
				handleItemClick={handleItemClick}
			/>

			<style jsx>{`
				.chip-container {
					position: relative;
				}

				.chips-input-container {
					display: flex;
					flex-wrap: wrap;
					background-color: white;
				}

				.input {
					color: black;
					height: 50px;
					width: fit-content;
					outline: none;
					padding: 0.5em;
				}
			`}</style>
		</div>
	);
};

export default ChipContainer;
