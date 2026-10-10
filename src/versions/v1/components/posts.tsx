import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { type BlogPost, devtoProfileUrl, formatPostDate } from "#/lib/devto";

export function PostList({ posts }: { posts: BlogPost[] }) {
	return (
		<ol className="border-b border-border">
			{posts.map((post) => (
				<li key={post.id}>
					<PostRow post={post} />
				</li>
			))}
		</ol>
	);
}

function PostRow({ post }: { post: BlogPost }) {
	return (
		<a
			href={post.url}
			target="_blank"
			rel="noreferrer"
			className="group grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[8.5rem_1fr]"
		>
			<p className="flex gap-3 font-mono text-xs text-muted-foreground md:flex-col md:gap-1.5 md:pt-1.5">
				<time dateTime={post.publishedAt}>
					{formatPostDate(post.publishedAt)}
				</time>
				<span>{post.readingMinutes} min read</span>
			</p>

			<div className="min-w-0">
				<div className="flex items-start justify-between gap-6">
					<h3 className="text-xl leading-snug font-medium tracking-tight text-balance transition-colors group-hover:text-brand">
						{post.title}
					</h3>
					<ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
				</div>
				<p className="mt-2 max-w-2xl leading-relaxed text-pretty text-muted-foreground">
					{post.description}
				</p>
				<div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
					<ul className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<li key={tag} className="chip">
								#{tag}
							</li>
						))}
					</ul>
					<p className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
						<span className="flex items-center gap-1.5">
							<Heart aria-hidden className="size-3.5" strokeWidth={1.75} />
							{post.reactions}
							<span className="sr-only">reactions</span>
						</span>
						<span className="flex items-center gap-1.5">
							<MessageCircle
								aria-hidden
								className="size-3.5"
								strokeWidth={1.75}
							/>
							{post.comments}
							<span className="sr-only">comments</span>
						</span>
					</p>
				</div>
			</div>
		</a>
	);
}

export function PostListSkeleton({ count }: { count: number }) {
	return (
		<ol aria-hidden className="border-b border-border">
			{Array.from({ length: count }, (_, i) => (
				<li
					// biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
					key={i}
					className="grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[8.5rem_1fr]"
				>
					<div className="h-3 w-24 animate-pulse rounded bg-foreground/[0.06]" />
					<div className="space-y-3">
						<div className="h-5 w-3/4 animate-pulse rounded bg-foreground/[0.08]" />
						<div className="h-4 w-full animate-pulse rounded bg-foreground/[0.05]" />
						<div className="h-4 w-2/3 animate-pulse rounded bg-foreground/[0.05]" />
					</div>
				</li>
			))}
		</ol>
	);
}

// Shown when dev.to can't be reached or there are no posts yet.
export function PostsUnavailable({ error }: { error: boolean }) {
	return (
		<div className="rounded-xl border border-dashed border-border px-6 py-10 text-center">
			<p className="text-muted-foreground">
				{error
					? "Couldn't load posts from DEV right now."
					: "No posts published yet."}
			</p>
			<a
				href={devtoProfileUrl}
				target="_blank"
				rel="noreferrer"
				className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-brand"
			>
				Read on DEV
				<ArrowUpRight aria-hidden className="size-4" />
			</a>
		</div>
	);
}
