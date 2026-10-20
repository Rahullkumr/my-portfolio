import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from "motion/react";
import type { PointerEvent } from "react";
import { type BlogPost, devtoProfileUrl, formatPostDate } from "#/lib/devto";
import { spectrum } from "../palette";

export function PostTiles({ posts }: { posts: BlogPost[] }) {
	return (
		<ol className="grid gap-5 [perspective:1200px] md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post, i) => (
				<motion.li
					key={post.id}
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "0px 0px -8% 0px" }}
					transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
				>
					<PostTile post={post} color={spectrum[i % spectrum.length]} />
				</motion.li>
			))}
		</ol>
	);
}

// A card that tilts toward the pointer, with a glare that follows it.
function PostTile({ post, color }: { post: BlogPost; color: string }) {
	const reduceMotion = useReducedMotion();
	const px = useMotionValue(0.5);
	const py = useMotionValue(0.5);
	const spring = { stiffness: 220, damping: 20 };
	const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
	const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
	const glareX = useTransform(px, (v) => `${v * 100}%`);
	const glareY = useTransform(py, (v) => `${v * 100}%`);
	const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, ${color}40, transparent 60%)`;

	function onPointerMove(event: PointerEvent<HTMLAnchorElement>) {
		if (reduceMotion || event.pointerType !== "mouse") return;
		const rect = event.currentTarget.getBoundingClientRect();
		px.set((event.clientX - rect.left) / rect.width);
		py.set((event.clientY - rect.top) / rect.height);
	}

	function reset() {
		px.set(0.5);
		py.set(0.5);
	}

	return (
		<motion.a
			href={post.url}
			target="_blank"
			rel="noreferrer"
			onPointerMove={onPointerMove}
			onPointerLeave={reset}
			style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
			className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-7"
		>
			<motion.span
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{ background: glare }}
			/>
			<span
				aria-hidden
				className="absolute inset-x-0 top-0 h-1.5"
				style={{ background: color }}
			/>

			<p className="relative flex items-center justify-between font-mono text-xs text-muted-foreground">
				<time dateTime={post.publishedAt}>
					{formatPostDate(post.publishedAt)}
				</time>
				<span>{post.readingMinutes} min read</span>
			</p>
			<h3 className="v2-display relative mt-5 text-2xl leading-tight font-bold tracking-[-0.02em] text-balance">
				{post.title}
			</h3>
			<p className="relative mt-3 line-clamp-3 leading-relaxed text-pretty text-muted-foreground">
				{post.description}
			</p>

			<div className="relative mt-auto flex items-end justify-between gap-4 pt-6">
				<ul className="flex flex-wrap gap-1.5">
					{post.tags.slice(0, 3).map((tag) => (
						<li
							key={tag}
							className="rounded-full bg-foreground/[0.06] px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
						>
							#{tag}
						</li>
					))}
				</ul>
				<span
					className="grid size-10 shrink-0 place-items-center rounded-full text-[#140c1c] transition-transform group-hover:rotate-45"
					style={{ background: color }}
				>
					<ArrowUpRight aria-hidden className="size-5" />
				</span>
			</div>
			<p className="relative mt-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
				<span className="flex items-center gap-1.5">
					<Heart aria-hidden className="size-3.5" strokeWidth={1.75} />
					{post.reactions}
					<span className="sr-only">reactions</span>
				</span>
				<span className="flex items-center gap-1.5">
					<MessageCircle aria-hidden className="size-3.5" strokeWidth={1.75} />
					{post.comments}
					<span className="sr-only">comments</span>
				</span>
			</p>
		</motion.a>
	);
}

export function PostTilesSkeleton({ count }: { count: number }) {
	return (
		<ol aria-hidden className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: count }, (_, i) => (
				<li
					// biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
					key={i}
					className="h-72 animate-pulse rounded-3xl border border-border bg-foreground/[0.04]"
				/>
			))}
		</ol>
	);
}

// Shown when dev.to can't be reached or there are no posts yet.
export function PostsUnavailable({ error }: { error: boolean }) {
	return (
		<div className="rounded-3xl border border-dashed border-border px-6 py-12 text-center">
			<p className="text-muted-foreground">
				{error
					? "Couldn't load posts from DEV right now."
					: "No posts published yet."}
			</p>
			<a
				href={devtoProfileUrl}
				target="_blank"
				rel="noreferrer"
				className="mt-4 inline-flex items-center gap-1.5 text-sm transition-colors hover:text-brand"
			>
				Read on DEV
				<ArrowUpRight aria-hidden className="size-4" />
			</a>
		</div>
	);
}
