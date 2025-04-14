import "./App.css";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RootLayout from "./layouts/RootLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import InventoryOverview from "./pages/inventory/InventoryOverview";
import Diary from "./pages/diary/diary";
import Search from "./pages/search/Search";
import CreateRecipe from "./pages/recipes/CreateRecipe";
import AccountSettings from "./pages/account/AccountSettings";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";

export const AppContext = createContext();

function App() {
	//search variables-------
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [delayedQuery, setDelayedQuery] = useState("");
	const [selectedTab, setSelectedTab] = useState("new");
	const [addToSelection, setAddToSelection] = useState("Add To Fridge"); //state to control the selection of where to add items from -> TabSelection Component
	const [selection, setSelection] = useState(() => {
		const stored = localStorage.getItem("selection");
		return stored ? JSON.parse(stored) : []; //parse elements from local Storage or return empty array if none saved
	});

	useEffect(() => {
		localStorage.setItem("selection", JSON.stringify(selection));
		console.log("Updated selection:", selection); //every time selection array changes, update to local Storage
	}, [selection]);

	// 2. print ingredient to list
	// 3. adjust quantity in local Storage //remove from local Storage //print recipe to local Storage /type = recipe
	// 4. add to fridge OR add to diary

	//---------------
	return (
		<AppContext.Provider
		value={{
			searchResults,
			setSearchResults,
			isLoading,
			setIsLoading,
			delayedQuery,
			setDelayedQuery,
			selectedTab,
			setSelectedTab,
			selection,
			setSelection,
			addToSelection,
			setAddToSelection,
		}}
	>
		<BrowserRouter>
		  <Routes>
			{/* Root layout */}
			<Route element={<RootLayout />}>
			  {/* Protected routes */}
			  <Route element={<ProtectedLayout />}>
				<Route element={<MainLayout />}>
				  <Route index element={<InventoryOverview />} />
				  <Route path="/diary" element={<Diary />} />
				  <Route path="/search" element={<Search />} />
				  <Route path="/recipes" element={<CreateRecipe />} />
				  <Route path="/account" element={<AccountSettings />} />
				</Route>
			  </Route>
	
			  {/* Public routes */}
			  <Route path="/signup" element={<Signup />} />
			  <Route path="/login" element={<Login />} />
			</Route>
		  </Routes>
		</BrowserRouter>
		</AppContext.Provider>

	  );
 
}
export default App;