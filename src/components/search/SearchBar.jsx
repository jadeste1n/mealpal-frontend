import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { AuthContext } from "@/context"; // adjust path if needed

const SearchBar = ({ changeSearchQuery }) => {
	const [searchInput, setSearchInput] = useState("");
	const {
		setSearchResults,
		setIsLoading,
		delayedQuery,
		setDelayedQuery,
		selectedTab,
		fetchFavorites,
		favorites,
	} = useContext(AppContext);

	const { user, isAuthenticated } = useContext(AuthContext);
	//const userId = "67f80406be0685998449b4a2"; // TESTING // Get UserId dynamically later
	const userId = user?._id;

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const fetchIngredientsFromDb = async (query) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${backendUrl}/products/search?query=${query}`,
				{
					credentials: "include",
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("Response from fetch:", data); // DEBUG
			setSearchResults(data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchIngredientsfromFridge = async (query) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${backendUrl}/fridge/items`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // optional: needed if backend expects cookies or sessions
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("Response from fetch:", data); // DEBUG
			let filtered = data;

			if (query.length !== 0) {//filter results if query is set
				filtered = data.filter((item) =>
					item.name?.toLowerCase().includes(query.toLowerCase())
				);
			}

			setSearchResults(filtered);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchIngredientsfromFavorites = async (query) => {
		setIsLoading(true);
		try {
			await fetchFavorites();
			let filtered = favorites;
			console.log(filtered);
			
			if (query.length !== 0) {//filter results if query is set
				filtered = favorites.filter((item) =>
					item.data.name?.toLowerCase().includes(query.toLowerCase())
				);
			}

			setSearchResults(filtered);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

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
		console.log(
			"Triggering fetch for:",
			selectedTab,
			delayedQuery,
			delayedQuery.length
		); // DEBUG

		if (delayedQuery.length > 0 && selectedTab === "new") {
			fetchIngredientsFromDb(delayedQuery);
			console.log(delayedQuery);
		}

		if (selectedTab === "favorites") {
			fetchIngredientsfromFavorites(delayedQuery);
		}
		if (selectedTab === "fridge") {
			fetchIngredientsfromFridge(delayedQuery);
		}
		if (selectedTab === "recipes") {
			fetchIngredientsFromDb(delayedQuery);
		}

		if (delayedQuery.length === 0 && selectedTab === "new") {
			if (selectedTab === "new") {
				setSearchResults([]);
			}
		}
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
