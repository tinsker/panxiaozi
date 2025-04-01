import { getCategoryList } from "@/lib/db/queries/category";
import CategoryButton from "./category-button";

export default async function Sidebar() {
  const categories = await getCategoryList()

  return (
    <div className="border rounded-lg p-2 text-sm">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryButton category={category} />
          </li>
        ))}
      </ul>
    </div>
  );
}
