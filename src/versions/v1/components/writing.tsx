import { Await } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { type BlogFeed, devtoProfileUrl } from "#/lib/devto";
import { PageLink } from "#/versions/page-link";
import { useCurrentVersion } from "#/versions/use-current-version";
import { PostList, PostListSkeleton, PostsUnavailable } from "./posts";
import { Section } from "./section";

const LATEST_COUNT = 3;

// Latest posts on the home page. The feed streams in after the page renders,
// so a slow dev.to never holds up the rest of the site.
export function Writing({ feed }: { feed: Promise<BlogFeed> }) {
	const { pinned } = useCurrentVersion();

	return (
		<Section id="writing" index="05" label="Writing">
			<Await promise={feed} fallback={<PostListSkeleton count={2} />}>
				{({ posts, error }) =>
					posts.length === 0 ? (
						<PostsUnavailable error={error} />
					) : (
						<PostList posts={posts.slice(0, LATEST_COUNT)} />
					)
				}
			</Await>

			<div className="mt-8 flex flex-wrap items-center gap-3">
				<PageLink page="blog" version={pinned} className="btn-ghost">
					All posts
					<ArrowRight className="size-4" />
				</PageLink>
				<a
					href={devtoProfileUrl}
					target="_blank"
					rel="noreferrer"
					className="inline-flex h-11 items-center gap-1.5 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					Follow on DEV
					<ArrowUpRight className="size-4" />
				</a>
			</div>
		</Section>
	);
}
