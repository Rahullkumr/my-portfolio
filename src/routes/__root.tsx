import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";

import { useEffect } from "react";
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
			// Link previews on LinkedIn, X, WhatsApp and Slack
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: profile.siteUrl },
			{ property: "og:title", content: `${profile.name} · ${profile.role}` },
			{ property: "og:description", content: profile.headline },
			{ property: "og:image", content: `${profile.siteUrl}${profile.photo}` },
			{ name: "twitter:card", content: "summary" },
			{
				name: "theme-color",
				content: "#fafafa",
				media: "(prefers-color-scheme: light)",
			},
			{
				name: "theme-color",
				content: "#131317",
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
// Uses the saved choice if there is one, otherwise the system setting, and
// keeps following the system setting until the visitor picks a theme.
const themeScript = `(function(){var d=matchMedia('(prefers-color-scheme: dark)').matches;try{var t=localStorage.getItem('theme');if(t)d=t==='dark'}catch(e){}var r=document.documentElement;r.classList.toggle('dark',d);matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(e){try{if(localStorage.getItem('theme'))return}catch(x){}r.classList.toggle('dark',e.matches)})})()`;

// Runs before the router starts. A reload opens at the top instead of
// restoring the old position or sliding to a #section left in the URL; a
// shared link like /#work still opens at that section.
// Smooth scrolling (see styles.css) switches on at the first click or key
// press, so only scrolling the visitor asks for is animated.
const scrollScript = `(function(){var n=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'){history.scrollRestoration='manual';try{sessionStorage.removeItem('tsr-scroll-restoration-v1_3')}catch(e){}if(location.hash)history.replaceState(history.state,'',location.pathname+location.search)}function s(){document.documentElement.classList.add('smooth-scroll')}addEventListener('pointerdown',s,{once:true});addEventListener('keydown',s,{once:true})})()`;

function RootDocument({ children }: { children: React.ReactNode }) {
	// Version CSS is scoped under [data-version="vN"], so each design styles only itself.
	const { id } = useCurrentVersion();

	// The router hands scroll restoration back to the browser as the page
	// unloads, which would make a reload jump to the old position before
	// scrollScript can stop it. This listener is added after the router's,
	// so it runs last and keeps restoration manual.
	useEffect(() => {
		const keepManual = () => {
			history.scrollRestoration = "manual";
		};
		addEventListener("pagehide", keepManual);
		return () => removeEventListener("pagehide", keepManual);
	}, []);

	return (
		<html lang="en" data-version={id} suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static inline theme script */}
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static inline scroll script */}
				<script dangerouslySetInnerHTML={{ __html: scrollScript }} />
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
