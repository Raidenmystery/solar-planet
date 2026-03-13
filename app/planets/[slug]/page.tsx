import { PlanetDetailPage } from "@/components/templates/PlanetDetailPage";

type PlanetPageProps = {
	params: Promise<{ slug: string }>;
};

export default async function PlanetSlugPage({ params }: PlanetPageProps) {
	const { slug } = await params;

	return <PlanetDetailPage slug={slug} />;
}
