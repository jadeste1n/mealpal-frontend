import IngredientSearchResult from "../../components/search/IngredientSearchResult";
import SearchBar from "../../components/search/SearchBar";
import TabsSelection from "../../components/search/TabSelection";
import BottomDrawer from "../../components/search/BottomDrawer";
import Modal from "../../components/general/Modal";
import { AppContext } from "../../App";
import { useState, useContext } from "react";

const Search = () => {
	const {
		searchResults,
		setSearchResults,
		selection,
		addToSelection,
		setAddToSelection,
		modalState,
		closeModal,
		content,
	} = useContext(AppContext);

	return (
		<div className="pb-32">
			{/* Selection Where to Add Items To -> Controls Conditional Rendering */}
			<select
				className="select select-ghost"
				value={addToSelection}
				onChange={(e) => setAddToSelection(e.target.value)}
			>
				<option>Add To Fridge</option>
				<option>Add To Diary</option>
			</select>
			<SearchBar /> {/* Search Bar Component */}
			<TabsSelection
				AddToSelection={addToSelection}
				ingredients={searchResults}
			/>
			{modalState && (
				<Modal isOpen={modalState} onClose={closeModal}>
					{content}
				</Modal>
			)}
			<BottomDrawer selection={selection} />
			{/* Tab Element w. individual List */}
			{/* List Element open/close */}
		</div>
	);
};

export default Search;
