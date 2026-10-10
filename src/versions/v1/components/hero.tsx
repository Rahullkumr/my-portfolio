import { ArrowDown, ArrowRight, MapPin, Trophy } from "lucide-react";
import { profile } from "#/data/profile";
import { cn } from "#/lib/utils";
import { SocialLinks } from "./social-links";

export function Hero() {
	return (
		<section
			id="top"
			className="relative flex overflow-hidden pt-28 pb-20 md:pt-32 md:pb-28 lg:min-h-svh lg:items-center lg:pt-24 lg:pb-16"
		>
			<div aria-hidden className="hero-grid" />
			<div className="page relative grid items-center gap-x-16 lg:grid-cols-[1fr_auto]">
				{profile.photo && (
					<img
						src={profile.photo}
						alt={`Portrait of ${profile.name}`}
						width={256}
						height={256}
						fetchPriority="high"
						className="photo rise mb-6 size-24 rounded-full object-cover shadow-lg ring-1 ring-border ring-offset-4 ring-offset-background md:size-28 lg:order-last lg:mb-0 lg:size-[clamp(12rem,32vh,16rem)] lg:ring-offset-8"
					/>
				)}

				<div className="min-w-0">
					<div className="rise flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
						{profile.available && (
							<span className="flex items-center gap-2.5">
								<span className="status-dot" />
								Open to new opportunities
							</span>
						)}
						<span className="flex items-center gap-1.5">
							<MapPin className="size-3.5" strokeWidth={1.75} />
							{profile.location}
						</span>
					</div>

					{profile.spotlight && (
						<a
							href={profile.spotlight.href}
							className="rise group mt-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/[0.06] py-1.5 pr-3 pl-2.5 text-sm text-foreground transition-colors hover:border-brand/60"
							style={{ animationDelay: "40ms" }}
						>
							<Trophy aria-hidden className="size-4 text-brand" />
							{profile.spotlight.label}
							<ArrowRight
								aria-hidden
								className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
							/>
						</a>
					)}

					{/* Sized by width and height so the whole hero fits short laptop screens */}
					<h1
						className={cn(
							"rise text-[clamp(2.25rem,min(6vw,8.5vh),4rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-balance",
							profile.spotlight ? "mt-8 md:mt-10" : "mt-6 md:mt-8",
						)}
						style={{ animationDelay: "80ms" }}
					>
						{profile.name}.
						{/* Smaller than the name so the name stays the focus */}
						<span className="mt-1 block text-[0.72em] leading-[1.12] text-muted-foreground">
							{profile.headline}
						</span>
					</h1>

					<p
						className="rise mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground md:mt-8"
						style={{ animationDelay: "160ms" }}
					>
						{profile.intro}
					</p>

					<div
						className="rise mt-8 flex flex-wrap items-center gap-3 md:mt-10"
						style={{ animationDelay: "240ms" }}
					>
						<a href="#work" className="btn-primary">
							View my work
							<ArrowDown className="size-4" />
						</a>
						<a href="#contact" className="btn-ghost">
							Get in touch
						</a>
						<SocialLinks className="-ml-3 w-full sm:ml-1 sm:w-auto" />
					</div>
				</div>
			</div>
		</section>
	);
}
