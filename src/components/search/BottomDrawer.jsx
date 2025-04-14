import { useState } from "react";
import IngredientSearchResult from "./IngredientSearchResult";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../App";

const BottomDrawer = ({ selection }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { addToSelection } = useContext(AppContext);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div
			className={`fixed left-0 right-0 bottom-0 z-30 pb-30 transition-all duration-300 ease-in-out ${
				isOpen ? "h-screen" : "h-24"
			} bg-base-200 shadow-2xl rounded-2xl`}
		>
			{/* handle */}
			<div
				className="p-4 text-center border-b border-base-300
 cursor-pointer"
				onClick={toggle}
			>
				<div className="flex flex-row justify-between items-center px-4">
					<p className="text-sm">{selection.length} Selected Items</p>
					<div
						className="w-fit flex flex-row gap-8
"
					>
						{addToSelection === "Add To Diary" ? (
							<button className="btn btn-sm btn-primary">Add To Diary</button>
						) : (
							<button className="btn btn-sm btn-primary">Add To Fridge</button>
						)}

						<p className="text-sm text-gray-500">
							{isOpen ? <ChevronUp /> : <ChevronDown />}
						</p>
					</div>
				</div>
			</div>

			{/* content */}
			<div
				className={`overflow-y-auto px-4 pt-4 ${
					isOpen ? "h-[calc(100%-5rem)]" : "hidden"
				} `}
			>
				{/* Bottom padding so content doesn’t overlap the nav */}
				<ul className="list bg-base-100 rounded-box shadow-md">
					{selection.map((item) => (
						<IngredientSearchResult
							key={item._id || item.id}
							ingredient={item}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BottomDrawer;
