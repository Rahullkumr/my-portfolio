import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile } from "#/data/profile";
import { spectrum } from "../palette";
import { Aurora } from "./aurora";
import { Magnetic } from "./magnetic";
import { SectionLink } from "./site-header";
import { SpringName } from "./spring-name";

const linkedin = profile.socials.find((social) => social.icon === "linkedin");

export function Hero() {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	// The hero sinks and fades as the page scrolls over it.
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
	const words = profile.headline.split(" ");

	return (
		<section
			ref={ref}
			id="top"
			className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pt-28 pb-10 md:pb-14"
		>
			<div aria-hidden className="absolute inset-0 -z-10">
				<div
					className="v2-blob top-[-10%] left-[-10%] size-[45vmax]"
					style={{ background: spectrum[0] }}
				/>
				<div
					className="v2-blob top-[10%] right-[-15%] size-[40vmax]"
					style={{ background: spectrum[4] }}
				/>
				<div
					className="v2-blob bottom-[-20%] left-[25%] size-[38vmax]"
					style={{ background: spectrum[2] }}
				/>
				<Aurora />
			</div>

			<motion.div style={{ y, opacity }} className="v2-page">
				{profile.spotlight && (
					<motion.a
						href={profile.spotlight.href}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.6 }}
						className="group mb-8 inline-flex max-w-full items-center gap-2.5 rounded-full border border-border bg-background/60 py-1.5 pr-4 pl-1.5 text-sm backdrop-blur-md"
					>
						<span className="rounded-full bg-[#ffb627] px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-[#1d0f05]">
							Award
						</span>
						<span className="truncate">{profile.spotlight.label}</span>
						<ArrowUpRight
							aria-hidden
							className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						/>
					</motion.a>
				)}

				<SpringName text={profile.name} />

				<div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-[1fr_auto]">
					<p className="max-w-xl text-xl leading-snug text-balance md:text-2xl">
						{words.map((word, i) => (
							<motion.span
								// biome-ignore lint/suspicious/noArrayIndexKey: words of a fixed string
								key={i}
								className="inline-block"
								initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
								animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
								transition={{ delay: 0.75 + i * 0.04, duration: 0.5 }}
							>
								{word}&nbsp;
							</motion.span>
						))}
					</p>

					<motion.div
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.2, duration: 0.6 }}
						className="flex flex-col items-start gap-5 md:items-end"
					>
						<p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
							{profile.available && (
								<span className="relative flex size-2">
									<span className="absolute inset-0 animate-ping rounded-full bg-[#3ddc84] motion-reduce:animate-none" />
									<span className="relative size-2 rounded-full bg-[#3ddc84]" />
								</span>
							)}
							{profile.role}
							<MapPin aria-hidden className="ml-2 size-3.5" />
							{profile.location}
						</p>
						<div className="flex flex-wrap gap-3">
							<Magnetic>
								<SectionLink id="work" className="v2-btn-primary">
									See my work
									<ArrowDown className="size-4" />
								</SectionLink>
							</Magnetic>
							{linkedin && (
								<Magnetic>
									<a
										href={linkedin.href}
										target="_blank"
										rel="noreferrer"
										className="v2-btn-ghost"
									>
										LinkedIn
										<ArrowUpRight className="size-4" />
									</a>
								</Magnetic>
							)}
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
