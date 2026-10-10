import { createFileRoute } from "@tanstack/react-router";
import { profile } from "#/data/profile";
import { getPosts } from "#/lib/devto";
import { latestVersion } from "#/versions/meta";
import { pages } from "#/versions/pages";

export const Route = createFileRoute("/blog")({
	loader: () => getPosts(),
	head: () => ({ meta: [{ title: `Blog · ${profile.name}` }] }),
	component: LiveBlog,
});

function LiveBlog() {
	const feed = Route.useLoaderData();
	const { Blog } = pages[latestVersion.id];
	return <Blog feed={feed} />;
}
