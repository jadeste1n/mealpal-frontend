import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";

const SearchBar = ({ changeSearchQuery }) => {
	const [searchInput, setSearchInput] = useState("");
	const {
		setSearchResults,
		setIsLoading,
		delayedQuery,
		setDelayedQuery,
		selectedTab,
	} = useContext(AppContext);
	const userId = "67f80406be0685998449b4a2"; // TESTING // Get UserId dynamically later

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const fetchIngredientsFromDb = async (query) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${backendUrl}/products/search?query=${query}`
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setSearchResults(data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	/*
	const fetchIngredientsfromFridge = async (query) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${backendUrl}/fridge/${userId}/items`
			);
			const data = await response.json();
			setSearchResults(data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};
    */

	// useEffect to delay the search query
	useEffect(() => {
		const delay = setTimeout(() => {
			console.log("Delayed query set to:", searchInput);
			setDelayedQuery(searchInput);
		}, 500);

		return () => clearTimeout(delay);
	}, [searchInput]); //whenever searchInput changes wait 500ms before setting delayedQuery

	useEffect(() => {
		// fetch data when delayedQuery changes
		console.log("Triggering fetch for:", selectedTab, delayedQuery, delayedQuery.length); // DEBUG

		if (delayedQuery.length > 0) {
			if (selectedTab === "new") {
				fetchIngredientsFromDb(delayedQuery);
				console.log(delayedQuery);
			}
			if (selectedTab === "favorites") {
				fetchIngredientsFromDb(delayedQuery);
			}
			if (selectedTab === "fridge") {
				fetchIngredientsFromDb(delayedQuery);
			}
			if (selectedTab === "recipes") {
				fetchIngredientsFromDb(delayedQuery);
			}
		}

		/*
		if (delayedQuery.length === 0) {
			if (selectedTab === "new") {
				setSearchResults([]);
			}
		}*/
	}, [delayedQuery, selectedTab]);

	return (
		<form>
			<label className="input">
				<svg
					className="h-[1em] opacity-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<g
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="2.5"
						fill="none"
						stroke="currentColor"
					>
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.3-4.3"></path>
					</g>
				</svg>
				<input
					type="search"
					className="grow"
					placeholder="Search"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
			</label>
		</form>
	);
};

export default SearchBar;
