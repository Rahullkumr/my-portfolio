import { Await } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { type BlogFeed, devtoProfileUrl } from "#/lib/devto";
import { PageLink } from "#/versions/page-link";
import { useCurrentVersion } from "#/versions/use-current-version";
import { Magnetic } from "./magnetic";
import { PostsUnavailable, PostTiles, PostTilesSkeleton } from "./post-tiles";
import { SectionTitle } from "./section-title";

const LATEST_COUNT = 3;

// Latest posts. The feed streams in after the page renders, so a slow dev.to
// never holds up the rest of the site.
export function Writing({ feed }: { feed: Promise<BlogFeed> }) {
	const { pinned } = useCurrentVersion();

	return (
		<section id="writing" className="py-20 md:py-28">
			<div className="v2-page">
				<SectionTitle index={5} title="Writing" />
				<Await
					promise={feed}
					fallback={<PostTilesSkeleton count={LATEST_COUNT} />}
				>
					{({ posts, error }) =>
						posts.length === 0 ? (
							<PostsUnavailable error={error} />
						) : (
							<PostTiles posts={posts.slice(0, LATEST_COUNT)} />
						)
					}
				</Await>

				<div className="mt-10 flex flex-wrap items-center gap-3">
					<Magnetic>
						<PageLink page="blog" version={pinned} className="v2-btn-primary">
							All posts
							<ArrowRight className="size-4" />
						</PageLink>
					</Magnetic>
					<a
						href={devtoProfileUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex h-12 items-center gap-1.5 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						Follow on DEV
						<ArrowUpRight className="size-4" />
					</a>
				</div>
			</div>
		</section>
	);
}
