const IngredientDetail = ({ ingredient }) => {
	const ingredientData = ingredient?.data || ingredient;
	const { name, brand, nutrition = {} } = ingredientData;

	return (
		<div className="p-4">
			<h3 className="text-lg font-bold">{name}</h3>
			<p className="text-sm text-gray-500">{brand}</p>

			<p className="text-xs text-gray-500 mt-4">
				Nutritional Data for <span className="font-bold">100 g / 100 ml</span>
			</p>

			<table className="mt-2 w-full text-sm border-collapse">
				<tbody>
					<tr className="border-b">
						<td className="py-2">Calories</td>
						<td className="py-2 text-right font-bold">
							{nutrition.calories ?? "-"}
						</td>
					</tr>
					<tr className="border-b">
						<td className="py-2 ">Protein</td>
						<td className="py-2 text-right font-bold">
							{nutrition.protein ?? "-"}
						</td>
					</tr>
					<tr className="border-b">
						<td className="py-2">Carbs</td>
						<td className="py-2 text-right font-bold">
							{nutrition.carbs ?? "-"}
						</td>
					</tr>
					<tr>
						<td className="py-2">Fat</td>
						<td className="py-2 text-right font-bold">
							{nutrition.fat ?? "-"}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default IngredientDetail;
