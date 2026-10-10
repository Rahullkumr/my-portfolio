import { useEffect, useState } from "react";
import { profile } from "#/data/profile";
import { cn } from "#/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const sections = [
	{ id: "about", label: "About" },
	{ id: "experience", label: "Experience" },
	{ id: "work", label: "Work" },
	{ id: "stack", label: "Stack" },
];

// Highlights the nav link for whichever section sits in the middle of the viewport.
function useActiveSection() {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id);
				}
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		for (const { id } of [...sections, { id: "contact" }]) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, []);

	return active;
}

export function SiteHeader() {
	const active = useActiveSection();
	const initials = profile.name
		.split(" ")
		.map((part) => part[0])
		.join("");

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
			<nav className="page flex h-16 items-center justify-between">
				<a
					href="#top"
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
				</a>

				<div className="flex items-center gap-1">
					<ul className="hidden items-center gap-1 md:flex">
						{sections.map((section) => (
							<li key={section.id}>
								<a
									href={`#${section.id}`}
									className={cn(
										"rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
										active === section.id && "text-foreground",
									)}
								>
									{section.label}
								</a>
							</li>
						))}
					</ul>
					<ThemeToggle />
					<a
						href="#contact"
						className={cn(
							"ml-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground/25",
							active === "contact" && "border-brand/50 text-brand",
						)}
					>
						Contact
					</a>
				</div>
			</nav>
		</header>
	);
}
