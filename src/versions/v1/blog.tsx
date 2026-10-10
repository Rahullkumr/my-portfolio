import { ArrowUpRight } from "lucide-react";
import { profile } from "#/data/profile";
import { type BlogFeed, devtoProfileUrl } from "#/lib/devto";
import { SiteFooter } from "./components/contact";
import { PostList, PostsUnavailable } from "./components/posts";
import { SiteHeader } from "./components/site-header";

export function Blog({ feed }: { feed: BlogFeed }) {
	const { posts, error } = feed;

	return (
		<>
			<SiteHeader />
			<main>
				<section
					id="top"
					className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20"
				>
					<div aria-hidden className="hero-grid" />
					<div className="page relative">
						<p className="rise font-mono text-xs uppercase tracking-widest text-muted-foreground">
							<span className="text-brand">Blog</span> / Writing
						</p>
						<h1
							className="rise mt-6 max-w-3xl text-[clamp(2.25rem,6vw,4rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance"
							style={{ animationDelay: "80ms" }}
						>
							Writing.
							<span className="block text-muted-foreground">
								{profile.blogIntro}
							</span>
						</h1>
						<div
							className="rise mt-8 flex flex-wrap items-center gap-4 md:mt-10"
							style={{ animationDelay: "160ms" }}
						>
							<a
								href={devtoProfileUrl}
								target="_blank"
								rel="noreferrer"
								className="btn-ghost"
							>
								Follow on DEV
								<ArrowUpRight className="size-4" />
							</a>
							{posts.length > 0 && (
								<p className="font-mono text-xs text-muted-foreground">
									{posts.length} {posts.length === 1 ? "post" : "posts"}
								</p>
							)}
						</div>
					</div>
				</section>

				<section className="pb-24 md:pb-32">
					<div className="page reveal">
						{posts.length === 0 ? (
							<PostsUnavailable error={error} />
						) : (
							<PostList posts={posts} />
						)}
					</div>
				</section>
			</main>
			<SiteFooter />
		</>
	);
}
