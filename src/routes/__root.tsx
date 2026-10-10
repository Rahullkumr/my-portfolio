import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";

import { profile } from "#/data/profile";
import { useCurrentVersion } from "#/versions/use-current-version";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: `${profile.name} · ${profile.role}`,
			},
			{
				name: "description",
				content: `${profile.headline} ${profile.intro}`,
			},
			{
				name: "theme-color",
				content: "#fafafa",
				media: "(prefers-color-scheme: light)",
			},
			{
				name: "theme-color",
				content: "#0e0e10",
				media: "(prefers-color-scheme: dark)",
			},
		],
		links: [
			{ rel: "icon", href: "/favicon.ico", sizes: "48x48" },
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png",
				sizes: "192x192",
			},
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Geist+Mono:wght@400;500&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

// Runs before first paint so the page never flashes the wrong theme.
// Uses the saved choice if there is one, otherwise the system setting.
const themeScript = `(function(){var d=matchMedia('(prefers-color-scheme: dark)').matches;try{var t=localStorage.getItem('theme');if(t)d=t==='dark'}catch(e){}document.documentElement.classList.toggle('dark',d)})()`;

function RootDocument({ children }: { children: React.ReactNode }) {
	// Version CSS is scoped under [data-version="vN"], so each design styles only itself.
	const { id } = useCurrentVersion();

	return (
		<html lang="en" data-version={id} suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static inline theme script */}
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	return (
		<main className="grid min-h-svh place-items-center px-6 text-center">
			<div>
				<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
					404
				</p>
				<h1 className="mt-4 text-3xl font-semibold tracking-tight">
					Page not found
				</h1>
				<Link
					to="/"
					className="mt-8 inline-flex h-11 items-center rounded-full border border-border px-5 text-sm transition-colors hover:border-foreground/25"
				>
					Go home
				</Link>
			</div>
		</main>
	);
}
