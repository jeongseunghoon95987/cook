import DishClient from "./DishClient";
import { normalizeDishName } from "@/lib/normalize";

/**
 * /dish/[name] — the dish name in the route segment is normalized with the same
 * function the video cache uses, so a shared link resolves to identical data.
 */
export default async function DishPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ i?: string; basics?: string }>;
}) {
  const { name } = await params;
  const sp = await searchParams;

  const dishName = normalizeDishName(decodeURIComponent(name));
  const ingredients = (sp.i ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const basics = sp.basics !== "0";

  return <DishClient dishName={dishName} ingredients={ingredients} basics={basics} />;
}
