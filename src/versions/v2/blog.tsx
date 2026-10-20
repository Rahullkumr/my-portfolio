import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "#/data/profile";
import { type BlogFeed, devtoProfileUrl } from "#/lib/devto";
import { Magnetic } from "./components/magnetic";
import { PostsUnavailable, PostTiles } from "./components/post-tiles";
import { Shell } from "./components/shell";
import { spectrum } from "./palette";

export function Blog({ feed }: { feed: BlogFeed }) {
	const { posts, error } = feed;

	return (
		<Shell>
			<section
				id="top"
				className="relative isolate overflow-hidden pt-36 pb-16 md:pt-48 md:pb-24"
			>
				<div aria-hidden className="absolute inset-0 -z-10">
					<div
						className="v2-blob top-[-30%] left-[-10%] size-[40vmax]"
						style={{ background: spectrum[5] }}
					/>
					<div
						className="v2-blob top-[-20%] right-[-10%] size-[36vmax]"
						style={{ background: spectrum[1] }}
					/>
				</div>
				<div className="v2-page">
					<p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
						Blog · {posts.length} {posts.length === 1 ? "post" : "posts"}
					</p>
					<h1 className="v2-display mt-5 overflow-hidden pb-[0.16em] text-[clamp(4rem,15vw,12rem)] leading-[0.85] font-extrabold tracking-[-0.06em]">
						<motion.span
							className="v2-gradient-text inline-block"
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							transition={{ type: "spring", stiffness: 80, damping: 16 }}
						>
							Writing.
						</motion.span>
					</h1>
					<motion.div
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.35, duration: 0.6 }}
						className="mt-8 flex flex-wrap items-end justify-between gap-6"
					>
						<p className="max-w-xl text-xl text-pretty text-muted-foreground md:text-2xl">
							{profile.blogIntro}
						</p>
						<Magnetic>
							<a
								href={devtoProfileUrl}
								target="_blank"
								rel="noreferrer"
								className="v2-btn-primary"
							>
								Follow on DEV
								<ArrowUpRight className="size-4" />
							</a>
						</Magnetic>
					</motion.div>
				</div>
			</section>

			<section className="pb-28 md:pb-40">
				<div className="v2-page">
					{posts.length === 0 ? (
						<PostsUnavailable error={error} />
					) : (
						<PostTiles posts={posts} />
					)}
				</div>
			</section>
		</Shell>
	);
}
