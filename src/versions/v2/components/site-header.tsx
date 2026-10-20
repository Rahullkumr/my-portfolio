import {
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
} from "motion/react";
import { type ReactNode, useState } from "react";
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

// On the home page section links are plain anchors; elsewhere they go home first.
export function SectionLink({
	id,
	className,
	children,
	...props
}: {
	id: string;
	className?: string;
	children: ReactNode;
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

// A floating pill that tucks away while scrolling down and returns on the way
// up, with a spectrum bar along the top for reading progress.
export function SiteHeader() {
	const { pinned, page } = useCurrentVersion();
	const { scrollY, scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
	const [hidden, setHidden] = useState(false);

	useMotionValueEvent(scrollY, "change", (current) => {
		const previous = scrollY.getPrevious() ?? 0;
		setHidden(current > previous && current > 240);
	});

	const link =
		"rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground";

	return (
		<>
			<motion.div
				aria-hidden
				className="fixed inset-x-0 top-0 z-[60] h-1 origin-left"
				style={{ scaleX: progress, backgroundImage: "var(--v2-name)" }}
			/>
			<motion.header
				className="fixed inset-x-0 top-3 z-50 px-3"
				animate={{ y: hidden ? -96 : 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 32 }}
			>
				<nav className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-2 rounded-full border border-border bg-background/70 pr-2 pl-2 shadow-lg shadow-black/5 backdrop-blur-xl">
					<SectionLink
						id="top"
						className="flex items-center gap-2.5 rounded-full py-1 pr-3 text-sm font-medium"
						aria-label={`${profile.name}, back to top`}
					>
						<img
							src={profile.photo}
							alt=""
							width={36}
							height={36}
							className="size-9 rounded-full object-cover ring-2 ring-[#ffb627]"
						/>
						<span className="v2-display hidden text-base font-bold tracking-tight sm:inline">
							{profile.name}
						</span>
					</SectionLink>

					<div className="flex items-center gap-0.5">
						<ul className="hidden items-center lg:flex">
							{sections.map((section) => (
								<li key={section.id}>
									<SectionLink id={section.id} className={link}>
										{section.label}
									</SectionLink>
								</li>
							))}
						</ul>
						<PageLink
							page="blog"
							version={pinned}
							className={cn(link, page === "blog" && "text-foreground")}
						>
							Blog
						</PageLink>
						<VersionSwitcher className="ml-1" />
						<ThemeToggle />
						<SectionLink
							id="contact"
							className="ml-1 hidden h-10 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 sm:inline-flex"
						>
							Say hi
						</SectionLink>
					</div>
				</nav>
			</motion.header>
		</>
	);
}
