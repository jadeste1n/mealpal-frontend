import { Star, CirclePlus, CircleMinus, Eye } from "lucide-react";
import { useState, useEffect, useContext, use } from "react";
import IngredientDetail from "./IngredientDetail";
import { AppContext } from "../../App";

const IngredientSearchResult = ({ ingredient }) => {
	//--------------------VARIABLES
	// takes ingredient from fetched data array
	const { selection, setSelection, favorites, fetchFavorites, openModal } =
		useContext(AppContext);
	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	// Check if item is coming from favorites
	const isFavoriteItem = ingredient.data ? true : false;

	const isFridgeItem = ingredient.referenceId ? true : false; //check if item is coming from fridge

	// Ingredient details - Render conditionally based on source
	const ingredientId = ingredient._id || ingredient.id; //check if _id or id is set
	//const ReferenceId = ingredient.id || ingredient.data.id;
	const source = ingredient.source || ingredient.data?.source;
	const ingredientName = isFavoriteItem
		? ingredient.data.name
		: ingredient.name;
	const ingredientBrand = isFavoriteItem
		? ingredient.data.brand
		: ingredient.brand;

	/*
	setModalContent(<IngredientDetail ingredient={ingredient} />);
	setModalOpen(true);
	*/
	//--------------------

	//NOTE ON OBJECT FORMATS:
	//FOOD DB data in search tab
	// data object from food db details with ID (NO SOURCE): {"id": 2117388, "name": "APPLE","brand": "Associated Wholesale Grocers, Inc.", "nutrition": {"calories": 110, "protein": 0, "carbs": 28,"fat": 0}
	// data object from food db with ID (NO NUTRIENTS): {"id": 2117388, "name": "APPLE","brand": "Associated Wholesale Grocers, Inc.", "source": "usda"}

	// objects saved to selection:
	// data from food db -> fetch details -> saved to selection = only id from food db
	// data from favorites/fridge -> fetched from backend -> saved to selection -> with _id

	//data object from favorites (WITH _id): { "name": "100% Whole Wheat Bread", "brand": "Nature's Own", "source": "off", "_id": "67fe6f20ce4ac05f7217d54a", "userId": "67fbf2fe846c53686b5c6ffa", "type": "product", "createdAt": "2025-0415", "nutrition": { "calories": 110, "protein": 4, "carbs": 20, "fat": 1.5 },
	//data object from fridge (with _id): { "nutrition": { "calories": 0, "protein": 13.5, "carbs": 58.7, "fat": 7 }, "_id": "67fe900ff46a8519dbff8598", "userId": "67fbf2fe846c53686b5c6ffa", "name": "Haferflocken", "quantity": 1, "category": "other", "isFavorite": false, "createdAt": "2025-04-15T16:57:_

	//--------------------UTILS
	// Check if ingredient is in the selection array (selection array saves objects with _id)
	const isInSelection = selection.some(
		(item) => (item._id || item.id || item.data.id) === ingredientId
	);

	/*
	const isInSelection = selection.some((item) => {//check selection array
		const possibleItemIds = [
			item?.id,
			item?.data?.id,
			item?._id
		];

		const possibleIngredientIds = [
			ingredientId,
			ingredient.data?.id,
		]
	
		const selected = possibleItemIds.some((id) => possibleIngredientIds.includes(id));; //check if mentioned id formats in selection match any of ids in ingredient object
		return selected
	});*/

	/*const isInSelection = selection.some((item) => {
		// Ingredient from Search: has `id`
		if (ingredient?.id ) {
			return (
				item?.id === ingredient.id ||
				item?.data?.id === ingredient.id
			);
		}
	
		// Ingredient from Favorites: has `data.id`
		if (ingredient?.data?.id) {
			return (
				item?.id === ingredient.data.id ||
				item?.data?.id === ingredient.data.id
			);
		}
	
		// Ingredient from Fridge: has `_id`
		if (ingredient?._id) {
			return item?._id === ingredient._id;
		}
	
		return false; // fallback
	});*/

	//check if item is in favorites db
	const isFavorite = favorites.some(
		(favorite) => (favorite._id || favorite.id) === ingredientId //food db = id & mealPal db = _id
	);

	//--------------------EFFECTS
	//fetch full product before adding to selection, fridge or favorites
	const fetchFullIngredientDetails = async () => {
		try {
			//this fetch only takes .id of original search product
			const res = await fetch(
				`${backendUrl}/products/${source}/${ingredientId}`
			);

			if (!res.ok) {
				throw new Error("Failed to fetch product details");
			}

			return await res.json();
		} catch (error) {
			console.error("Error fetching product details:", error.message);
			return null;
		}
	};

	//--------------------BUTTON ACTIONS
	const handleOpenDetails = async () => {
		console.log("Opening modal...", ingredient); //DEBUG

		// Check for nutrition in both ingredient and ingredient.data
		const ingredientData = ingredient?.data || ingredient;
		const hasNutrition = ingredientData.nutrition;

		if (hasNutrition) {
			// Already have the details
			openModal(<IngredientDetail ingredient={ingredient} />);
		} else {
			// Fetch the full details
			const fullDetails = await fetchFullIngredientDetails();
			if (fullDetails) {
				openModal(<IngredientDetail ingredient={fullDetails} />);
			} else {
				openModal(<p>Failed to load ingredient details.</p>);
			}
		}
	};

	// Add ingredient to favorites
	const handleAddToFavorites = async () => {
		let fullProduct;
		//if coming from search fetch full product details
		if (!isFridgeItem && !isFavoriteItem) {
			fullProduct = await fetchFullIngredientDetails();
			if (!fullProduct) return;
		} else {
			fullProduct = {
				...ingredient,
			};
		}

		//add to favorites db
		try {
			const res = await fetch(`${backendUrl}/favorites/items`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: "product",
					data: {
						referenceId: fullProduct.id, // id from food db
						name: fullProduct.name,
						brand: fullProduct.brand || "",
						category: fullProduct.category || "other",
						nutrition: fullProduct.nutrition || {},
						source: fullProduct.source || "recipe",
					},
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to add to favorites");
			}

			console.log(`added ${ingredient.name} to favorites`); //DEBUG
			fetchFavorites(); // Trigger a fetch to update the favorites list in context
		} catch (error) {
			console.error("Error adding ingredient to favorites:", error.message);
		}
	};

	// Remove ingredient from favorites
	const handleRemoveFromFavorites = async () => {
		try {
			const res = await fetch(`${backendUrl}/favorites/items/${ingredientId}`, {
				method: "DELETE",
				credentials: "include", // Sends the credentials (cookies or session info)
			});

			if (!res.ok) {
				throw new Error("Failed to remove from favorites");
			}
			fetchFavorites(); // Trigger a fetch to update the favorites list in context
		} catch (error) {
			console.error("Error removing ingredient from favorites:", error.message);
		}
	};

	// Add ingredient WITH DETAILS to selection list
	const handleAddToSelection = async () => {
		if (isInSelection) return; //check if its already saved to selection, if Already there, no need to fetch or add again

		let fullProduct;

		//get full product details if its from search
		if (!isFavoriteItem && !isFridgeItem) {
			fullProduct = await fetchFullIngredientDetails();
			if (!fullProduct) return;
		}

		//if in format of favorite or fridge item save object without modification to selection
		if (isFavoriteItem || isFridgeItem) {
			fullProduct = {
				...ingredient,
			};
		}

		//add product to list of elements to add to diary or fridge
		setSelection((prevSelection) => [...prevSelection, fullProduct]);
	};

	// Remove ingredient from selection list
	const handleRemoveFromSelection = () => {
		setSelection((prevSelection) =>
			prevSelection.filter((item) => (item._id || item.id) !== ingredientId)
		);
	};

	//List Element
	return (
		<>
			<li className="list-row flex flex-row justify-between">
				<div className="flex flex-col justify-start content-start">
					<p className="text-left">{ingredientName}</p>
					<p className="text-left">{ingredientBrand}</p>
				</div>
				<div>
					<button
						className="btn btn-square btn-ghost min-w-fit p-6
"
						onClick={handleOpenDetails}
					>
						<Eye /> {/* opens pop up with Ingredient Details */}
					</button>
					<button
						className="btn btn-square btn-ghost min-w-fit p-6
"
						onClick={
							isFavorite ? handleRemoveFromFavorites : handleAddToFavorites
						}
					>
						{isFavorite ? (
							<Star className="fill-yellow-500 text-yellow-500" />
						) : (
							<Star />
						)}{" "}
						{/* saves ingredient to favorites -> add to backend favorites POST */}
					</button>

					<button
						className="btn btn-square btn-ghost min-w-fit pl-6"
						onClick={
							isInSelection ? handleRemoveFromSelection : handleAddToSelection
						}
					>
						{isInSelection ? (
							<CircleMinus className="stroke-gray-500" /> // Remove from selection
						) : (
							<CirclePlus className="stroke-gray-500" /> // Add to selection
						)}
					</button>
				</div>
			</li>
		</>
	);
};

export default IngredientSearchResult;
