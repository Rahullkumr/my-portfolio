import { createServerFn } from "@tanstack/react-start";
import { profile } from "#/data/profile";

export type BlogPost = {
	id: number;
	title: string;
	description: string;
	url: string;
	publishedAt: string;
	readingMinutes: number;
	tags: string[];
	reactions: number;
	comments: number;
};

// `error` is true only when dev.to failed and there is no earlier copy to show.
export type BlogFeed = { posts: BlogPost[]; error: boolean };

type DevToArticle = {
	id: number;
	title: string;
	description: string;
	url: string;
	published_at: string;
	reading_time_minutes: number;
	tag_list: string[];
	public_reactions_count: number;
	comments_count: number;
};

export const devtoProfileUrl = `https://dev.to/${profile.devto}`;

const CACHE_MS = 30 * 60 * 1000;
let cache: { at: number; posts: BlogPost[] } | undefined;

// Runs on the server only. Results are cached in memory so most page loads
// don't wait on dev.to, and the last good copy is served if dev.to is down.
export const getPosts = createServerFn({ method: "GET" }).handler(
	async (): Promise<BlogFeed> => {
		if (cache && Date.now() - cache.at < CACHE_MS) {
			return { posts: cache.posts, error: false };
		}
		try {
			const res = await fetch(
				`https://dev.to/api/articles?username=${profile.devto}&per_page=100`,
				{
					headers: {
						accept: "application/json",
						"user-agent": "rahul-portfolio",
					},
					signal: AbortSignal.timeout(5000),
				},
			);
			if (!res.ok) throw new Error(`dev.to responded ${res.status}`);
			const articles = (await res.json()) as DevToArticle[];
			cache = { at: Date.now(), posts: articles.map(toPost) };
			return { posts: cache.posts, error: false };
		} catch {
			return { posts: cache?.posts ?? [], error: !cache };
		}
	},
);

function toPost(article: DevToArticle): BlogPost {
	return {
		id: article.id,
		title: article.title,
		description: article.description,
		url: article.url,
		publishedAt: article.published_at,
		readingMinutes: article.reading_time_minutes,
		tags: article.tag_list,
		reactions: article.public_reactions_count,
		comments: article.comments_count,
	};
}

// Fixed locale and time zone so the server and browser render the same text.
const dateFormat = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

export function formatPostDate(iso: string) {
	return dateFormat.format(new Date(iso));
}
