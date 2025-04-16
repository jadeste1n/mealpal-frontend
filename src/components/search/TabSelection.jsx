import SearchBar from "./SearchBar";
import { useContext } from "react";
import { AppContext } from "../../App";
import IngredientSearchResult from "./IngredientSearchResult";

const TabsSelection = ({ AddToSelection, ingredients }) => {
	//AddToSelection = tab visibility //ingredients = List of ingredients component
	const { isLoading, delayedQuery, setSelectedTab } = useContext(AppContext);

	return (
		<>
			<div role="tablist" className="tabs tabs-border">
				<input
					type="radio"
					name="my_tabs_1"
					className="tab"
					aria-label="New"
					onClick={() => setSelectedTab("new")}
					defaultChecked
				/>
				<div className="tab-content border-base-300 bg-base-100 p-10">
					{" "}
					{isLoading && <div className="text-xs text-muted">Searching...</div>}
					{!isLoading &&
					ingredients.length === 0 &&
					delayedQuery.length !== 0 ? (
						<p className="text-sm opacity-70">No ingredients found.</p>
					) : !isLoading &&
					  ingredients.length === 0 &&
					  delayedQuery.length === 0 ? (
						<p className="text-sm opacity-70">Type for Search</p>
					) : (
						!isLoading && (
							<ul className="list bg-base-100 rounded-box shadow-md">
								<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
									{ingredients.length} Results found
								</li>
								{ingredients.map((ingredient) => (
									<IngredientSearchResult
										key={ingredient._id || ingredient.id}
										ingredient={ingredient}
									/>
								))}
							</ul>
						)
					)}
				</div>
				<input
					type="radio"
					name="my_tabs_1"
					className="tab"
					aria-label="Favorites"
					onClick={() => setSelectedTab("favorites")}
				/>
				<div className="tab-content border-base-300 bg-base-100 p-10">
					{isLoading && <div className="text-xs text-muted">Searching...</div>}
					{!isLoading && ingredients.length === 0 ? (
						<p className="text-sm opacity-70">No ingredients in Favorites.</p>
					) : (
						!isLoading && (
							<ul className="list bg-base-100 rounded-box shadow-md">
								<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
									{ingredients.length} Results found
								</li>
								{ingredients.map((ingredient) => (
									<IngredientSearchResult
										key={ingredient._id || ingredient.id}
										ingredient={ingredient}
									/>
								))}
							</ul>
						)
					)}
				</div>
				<input
					type="radio"
					name="my_tabs_1"
					className={`tab ${AddToSelection === "Add To Diary" ? "" : "hidden"}`}
					aria-label="Fridge"
					onClick={() => setSelectedTab("fridge")}
				/>
				<div className="tab-content border-base-300 bg-base-100 p-10">
					{isLoading && <div className="text-xs text-muted">Searching...</div>}
					{!isLoading && ingredients.length === 0 ? (
						<p className="text-sm opacity-70">No ingredients in Fridge.</p>
					) : (
						!isLoading &&
						ingredients.length !== 0 && (
							<ul className="list bg-base-100 rounded-box shadow-md">
								<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
									{ingredients.length} Results found
								</li>
								{ingredients.map((ingredient) => (
									<IngredientSearchResult
										key={ingredient._id || ingredient.id}
										ingredient={ingredient}
									/>
								))}
							</ul>
						)
					)}
				</div>
				<input
					type="radio"
					name="my_tabs_1"
					className={`tab ${AddToSelection === "Add To Diary" ? "" : "hidden"}`}
					aria-label="Recipes"
					onClick={() => setSelectedTab("recipes")}
				/>
				<div className="tab-content border-base-300 bg-base-100 p-10">
					List of Recipes
				</div>
			</div>
		</>
	);
};

export default TabsSelection;
