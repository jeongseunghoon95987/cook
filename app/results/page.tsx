import ResultsClient from "./ResultsClient";

/**
 * Results are driven entirely by the URL (?i=계란,대파,김치&basics=1) so the page
 * is reproducible from a link alone — the foundation v0.2's share/SEO features
 * build on.
 */
export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ i?: string; basics?: string }>;
}) {
  const sp = await searchParams;
  const ingredients = (sp.i ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const basics = sp.basics !== "0";

  return <ResultsClient ingredients={ingredients} basics={basics} />;
}
