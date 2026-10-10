import { createFileRoute, notFound } from "@tanstack/react-router";
import { isVersionId } from "#/versions/meta";

// /v1, /v2 ...: every version of the site stays reachable at its own URL.
export const Route = createFileRoute("/$version")({
	beforeLoad: ({ params }) => {
		if (!isVersionId(params.version)) throw notFound();
	},
	// The live site is the one to index; versioned copies would be duplicates.
	head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
});
