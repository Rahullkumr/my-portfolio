import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "#/lib/devto";
import { latestVersion } from "#/versions/meta";
import { pages } from "#/versions/pages";

// The live home page: always the newest version.
export const Route = createFileRoute("/")({
	loader: () => ({ feed: getPosts() }),
	component: LiveHome,
});

function LiveHome() {
	const { feed } = Route.useLoaderData();
	const { Home } = pages[latestVersion.id];
	return <Home feed={feed} />;
}
