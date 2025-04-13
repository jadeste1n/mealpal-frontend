import "./App.css";
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

function App() {
  return (
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
  );
}
export default App;
