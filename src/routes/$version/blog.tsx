import { createFileRoute } from "@tanstack/react-router";
import { profile } from "#/data/profile";
import { getPosts } from "#/lib/devto";
import type { VersionId } from "#/versions/meta";
import { pages } from "#/versions/pages";

export const Route = createFileRoute("/$version/blog")({
	loader: () => getPosts(),
	head: () => ({ meta: [{ title: `Blog · ${profile.name}` }] }),
	component: VersionBlog,
});

function VersionBlog() {
	const { version } = Route.useParams();
	const feed = Route.useLoaderData();
	const { Blog } = pages[version as VersionId];
	return <Blog feed={feed} />;
}
