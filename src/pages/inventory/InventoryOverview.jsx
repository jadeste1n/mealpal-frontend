import { useEffect, useState } from "react";
import axios from "axios";
import FridgeItem from "../../components/inventory/FridgeItem"; // Adjust the path as needed
import { getFridgeItems } from "@/data";

const InventoryOverview = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchFridgeItems = async () => {
      try {
        const data = await getFridgeItems();
        setItems(data);
      } catch (err) {
        console.error("Error fetching fridge items:", err);
      }
    };

    fetchFridgeItems();
  }, []);

  const handleToggleFavorite = async (itemId, currentFavoriteState) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_MEALPAL_API_URL}/fridge/items/${itemId}`,
        { isFavorite: !currentFavoriteState },
        { withCredentials: true }
      );
      // Optimistically update UI
      setItems((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
        )
      );
    } catch (err) {
      console.error("Error updating favorite:", err);
    }
  };

  const handleOpenMenu = (itemId) => {
    console.log("Open menu for:", itemId);
    // Here you could open a modal or dropdown, depending on your design
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/fridge/items/${itemId}`,
        {
          withCredentials: true,
        }
      );

      // Optimistically update UI
      setItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="p-4">
      {items.map((item) => (
        <FridgeItem
          key={item._id}
          name={item.name}
          nutrition={item.nutrition}
          isFavorite={item.isFavorite}
          onToggleFavorite={() =>
            handleToggleFavorite(item._id, item.isFavorite)
          }
          onOpenMenu={() => handleOpenMenu(item._id)}
          onDelete={() => handleDeleteItem(item._id)}
        />
      ))}
    </div>
  );
};

export default InventoryOverview;
