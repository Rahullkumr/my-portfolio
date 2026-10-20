import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "#/components/theme-toggle";
import { VersionSwitcher } from "#/components/version-switcher";
import { profile } from "#/data/profile";

// Placeholder for every v2 page until the new design lands.
export function ComingSoon() {
	return (
		<>
			<header className="fixed inset-x-0 top-0 z-50">
				<nav className="mx-auto flex h-16 w-[min(1080px,calc(100%-2.5rem))] items-center justify-end gap-1">
					<VersionSwitcher />
					<ThemeToggle />
				</nav>
			</header>
			<main className="grid min-h-svh place-items-center px-6 text-center">
				<div>
					<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
						<span className="text-brand">v2</span> / In progress
					</p>
					<h1 className="mt-4 text-[clamp(2.25rem,6vw,4rem)] leading-[1.04] font-semibold tracking-[-0.04em]">
						Coming soon
					</h1>
					<p className="mx-auto mt-4 max-w-md text-balance text-muted-foreground">
						{profile.name} is working on a new design for this site.
					</p>
					<Link
						to="/"
						className="mt-8 inline-flex h-11 items-center rounded-full border border-border px-5 text-sm transition-colors hover:border-foreground/25"
					>
						See the current site
					</Link>
				</div>
			</main>
		</>
	);
}
