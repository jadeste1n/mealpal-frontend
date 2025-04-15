import { Star, CirclePlus, CircleMinus, Eye } from "lucide-react";
import { useState, useEffect, useContext, use } from "react";
import { AppContext } from "../../App";

const IngredientSearchResult = ({ ingredient }) => {
	//--------------------VARIABLES
	// takes ingredient from fetched data array
	const { selection, setSelection, favorites, fetchFavorites } =
		useContext(AppContext);
	// Normalize the ingredient object by checking for either id or _id
	const ingredientId = ingredient._id || ingredient.id; //ingredient can either come from mongoDb or FoodData Db bwith _id or id
	const source = ingredient.source;
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	// Check if the ingredient is coming from favorites
	const isFavoriteItem = ingredient.data ? true : false;
	// Ingredient details - Render conditionally based on source
	const ingredientName = isFavoriteItem
		? ingredient.data.name
		: ingredient.name;
	const ingredientBrand = isFavoriteItem
		? ingredient.data.brand
		: ingredient.brand;
	//--------------------

	//--------------------UTILS
	// Check if ingredient is in the selection array
	const isInSelection = selection.some(
		(item) => (item._id || item.id) === ingredientId
	);

	//check if item is in favorites db
	const isFavorite = favorites.some(
		(favorite) => (favorite.data._id || favorite.data.id) === ingredientId //food db = id & mealPal db = _id
	);

	//--------------------EFFECTS
	const fetchFullIngredientDetails = async () => {
		try {
			const res = await fetch(
				`${backendUrl}/products/${source}/${ingredientId}`,
				{ credentials: "include" }
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

	// Check if the ingredient is in favorites on initial load + if isFavorite changes
	/*
	useEffect(() => {
		const checkFavoriteStatus = async () => {
			try {
				const res = await fetch(`${backendUrl}/favorites/items`, {
					method: "GET",
					credentials: "include",
				});

				if (!res.ok) {
					// If response is not ok, throw an error
					throw new Error(
						`Failed to fetch favorite status, Status: ${res.status}`
					);
				}

				const favoriteData = await res.json(); //get updated array of favorites

				// Check if the ingredient is in the favorites list
				const isFavoriteInList = favoriteData.some(
					(favorite) => favorite.data.id === ingredientId
				);

				// If the response contains the ingredient in favorites, mark it as favorite
				setIsFavorite(isFavoriteInList);
			} catch (error) {
				console.error(
					"Error checking if ingredient is in favorites:",
					error.message
				);
			}
		};

		checkFavoriteStatus();
	}, [ingredientId, backendUrl]);*/

	//--------------------BUTTON ACTIONS
	// Add ingredient to favorites
	const handleAddToFavorites = async () => {
		//fetch full product details
		const fullProduct = await fetchFullIngredientDetails();
		if (!fullProduct) return;

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
						/*id: fullProduct._id || fullProduct.id, */ // nod needed in my opion
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

		//get full product details
		const fullProduct = await fetchFullIngredientDetails();
		if (!fullProduct) return;

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
