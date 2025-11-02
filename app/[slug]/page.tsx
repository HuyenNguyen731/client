import WeddingTheme from "@/[slug]/component/WeddingTheme";

export default async function Guess({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <WeddingTheme guessName={slug} />;
}
