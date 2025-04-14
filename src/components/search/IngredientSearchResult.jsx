import { Star, CirclePlus, CircleMinus, Eye } from "lucide-react";
import { useState, useEffect, useContext, use } from "react";
import { AppContext } from "../../App";

const IngredientSearchResult = ({ ingredient }) => {
	// takes ingredient from fetched data array
	const { selection, setSelection } = useContext(AppContext);
	// Normalize the ingredient object by checking for either id or _id
	const ingredientId = ingredient._id || ingredient.id; //ingredient can either come from mongoDb or FoodData Db bwith _id or id

	// Log for debugging
	console.log(
		"Checking ingredient:",
		ingredient,
		"with normalized ID:",
		ingredientId
	);

	// Add ingredient to selection list
	const handleAddToSelection = () => {
		if (!selection.some((item) => (item._id || item.id) === ingredientId)) {
			setSelection((prevSelection) => [...prevSelection, ingredient]);
		}
	};

	// Remove ingredient from selection list
	const handleRemoveFromSelection = () => {
		setSelection((prevSelection) =>
			prevSelection.filter((item) => (item._id || item.id) !== ingredientId)
		);
	};

	// Check if ingredient is in the selection array
	const isInSelection = selection.some(
		(item) => (item._id || item.id) === ingredientId
	);

	//List Element
	return (
		<>
			<li className="list-row flex flex-row justify-between">
				<div className="flex flex-col justify-start content-start">
					<p className="text-left">{ingredient.name}</p>
					<p className="text-left">{ingredient.brand}</p>
				</div>
				<div>
					<button
						className="btn btn-square btn-ghost min-w-fit p-6
"
					>
						<Eye /> {/* opens pop up with Ingredient Details */}
					</button>
					<button
						className="btn btn-square btn-ghost min-w-fit p-6
"
					>
						<Star />{" "}
						{/* saves ingredient to favorites -> add to backend favorites POST */}
					</button>
					{!isInSelection ? (
						<button
							className="btn btn-square btn-ghost min-w-fit pl-6"
							onClick={handleAddToSelection}
						>
							<CirclePlus /> {/* adds ingredient to selection */}
						</button>
					) : (
						<button
							className="btn btn-square btn-ghost min-w-fit pl-6"
							onClick={handleRemoveFromSelection}
						>
							<CircleMinus /> {/* removes ingredient from selection */}
						</button>
					)}
				</div>
			</li>
		</>
	);
};

export default IngredientSearchResult;
