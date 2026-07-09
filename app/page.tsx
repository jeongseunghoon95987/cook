import HomeClient from "./HomeClient";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ i?: string; basics?: string }>;
}) {
  const sp = await searchParams;
  const initial = (sp.i ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  // Default the "basics available" toggle on; honor an explicit basics=0.
  const initialBasics = sp.basics !== "0";

  return <HomeClient initial={initial} initialBasics={initialBasics} />;
}
