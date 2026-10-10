import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "#/lib/devto";
import type { VersionId } from "#/versions/meta";
import { pages } from "#/versions/pages";

export const Route = createFileRoute("/$version/")({
	loader: () => ({ feed: getPosts() }),
	component: VersionHome,
});

function VersionHome() {
	const { version } = Route.useParams();
	const { feed } = Route.useLoaderData();
	// The parent route has already rejected unknown versions.
	const { Home } = pages[version as VersionId];
	return <Home feed={feed} />;
}
