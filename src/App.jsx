import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import InventoryOverview from "./pages/inventory/InventoryOverview";
import Diary from "./pages/diary/diary";
import Search from "./pages/search/Search";
import CreateRecipe from "./pages/recipes/CreateRecipe";
import AccountSettings from "./pages/account/AccountSettings";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" index element={<InventoryOverview />} />
					<Route path="/diary" element={<Diary />} />
					<Route path="/search" element={<Search />} />
					<Route path="/recipes" element={<CreateRecipe />} />
					<Route path="/account" element={<AccountSettings />} />
				</Route>
				<Route path="/signup" element={<Login />} />
				<Route path="/login" element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
