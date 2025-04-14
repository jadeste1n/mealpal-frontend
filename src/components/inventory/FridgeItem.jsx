import { useId } from "react";
import { Star, MoreHorizontal, X, Trash, ArrowRight } from "lucide-react";
import EnergySummaryChart from "./EnergySummaryChart";

const FridgeItem = ({
  name,
  isFavorite,
  onToggleFavorite,
  onOpenMenu,
  onDelete,
  nutrition,
}) => {
  const modalId = useId(); // Unique modal ID for each item

  return (
    <>
      {/* Item row (clicking anywhere does nothing now) */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black">
        <span className="text-lg font-medium">{name}</span>
        <div className="flex items-center gap-4">
          <button onClick={onToggleFavorite}>
            <Star
              className="w-6 h-6"
              fill={isFavorite ? "black" : "none"}
              stroke="black"
            />
          </button>

          {/* This button now opens the modal */}
          <button
            onClick={() => document.getElementById(modalId).showModal()}
            className="w-8 h-8 rounded-full border border-black flex items-center justify-center"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DaisyUI Modal */}
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* Top controls */}
          <div className="flex justify-between items-start mb-4">
            <form method="dialog">
              <button>
                <X className="w-5 h-5" />
              </button>
            </form>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onDelete();
                  document.getElementById(modalId).close();
                }}
              >
                <Trash className="w-5 h-5" />
              </button>
              <button onClick={onToggleFavorite}>
                <Star
                  className="w-5 h-5"
                  fill={isFavorite ? "black" : "none"}
                  stroke="black"
                />
              </button>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-sm mb-4">Nutritional information per 100g</p>

          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="text-sm font-medium mb-2">Energy Summary</p>
            <p className="text-sm font-medium mb-2">Energy Summary</p>
            <EnergySummaryChart nutrition={nutrition} />
          </div>

          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button className="btn btn-block bg-black text-white">
                ADD PRODUCT TO DIARY <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FridgeItem;
