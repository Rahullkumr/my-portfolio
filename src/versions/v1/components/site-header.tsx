import { useEffect, useState } from "react";
import { ThemeToggle } from "#/components/theme-toggle";
import { VersionSwitcher } from "#/components/version-switcher";
import { profile } from "#/data/profile";
import { cn } from "#/lib/utils";
import { PageLink } from "#/versions/page-link";
import { useCurrentVersion } from "#/versions/use-current-version";

const sections = [
	{ id: "about", label: "About" },
	{ id: "experience", label: "Experience" },
	{ id: "work", label: "Work" },
	{ id: "stack", label: "Stack" },
];

// Highlights the nav link for whichever section sits in the middle of the viewport.
function useActiveSection(enabled: boolean) {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		if (!enabled) return;
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id);
				}
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		for (const { id } of [...sections, { id: "writing" }, { id: "contact" }]) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, [enabled]);

	return enabled ? active : null;
}

// On the home page section links are plain anchors; elsewhere they go home first.
function SectionLink({
	id,
	className,
	children,
	...props
}: {
	id: string;
	className?: string;
	children: React.ReactNode;
	"aria-label"?: string;
}) {
	const { pinned, page } = useCurrentVersion();
	if (page === "home") {
		return (
			<a href={`#${id}`} className={className} {...props}>
				{children}
			</a>
		);
	}
	return (
		<PageLink
			page="home"
			version={pinned}
			hash={id}
			className={className}
			{...props}
		>
			{children}
		</PageLink>
	);
}

export function SiteHeader() {
	const { pinned, page } = useCurrentVersion();
	const active = useActiveSection(page === "home");
	const initials = profile.name
		.split(" ")
		.map((part) => part[0])
		.join("");
	const navLink =
		"rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground";

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
			<nav className="page flex h-16 items-center justify-between">
				<SectionLink
					id="top"
					className="flex items-center gap-3 text-sm font-medium"
					aria-label={`${profile.name}, back to top`}
				>
					{profile.photo ? (
						<img
							src={profile.photo}
							alt=""
							width={32}
							height={32}
							className="size-8 rounded-full object-cover ring-1 ring-border"
						/>
					) : (
						<span className="grid size-8 place-items-center rounded-full border border-border font-mono text-xs">
							{initials}
						</span>
					)}
					<span className="hidden sm:inline">{profile.name}</span>
				</SectionLink>

				<div className="flex items-center gap-1">
					<ul className="hidden items-center gap-1 lg:flex">
						{sections.map((section) => (
							<li key={section.id}>
								<SectionLink
									id={section.id}
									className={cn(
										navLink,
										active === section.id && "text-foreground",
									)}
								>
									{section.label}
								</SectionLink>
							</li>
						))}
					</ul>
					<PageLink
						page="blog"
						version={pinned}
						className={cn(
							navLink,
							(page === "blog" || active === "writing") && "text-foreground",
						)}
					>
						Blog
					</PageLink>
					<VersionSwitcher className="ml-1" />
					<ThemeToggle />
					<SectionLink
						id="contact"
						className={cn(
							"ml-1 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground/25",
							active === "contact" && "border-brand/50 text-brand",
						)}
					>
						Contact
					</SectionLink>
				</div>
			</nav>
		</header>
	);
}
