import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "#/data/profile";
import { spectrum } from "../palette";
import { SectionTitle } from "./section-title";

export function ExperienceSection() {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.7", "end 0.6"],
	});
	// The timeline line draws itself as the roles scroll past.
	const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

	return (
		<section id="experience" className="py-20 md:py-28">
			<div className="v2-page">
				<SectionTitle index={2} title="Experience" />

				<div ref={ref} className="relative pl-8 md:pl-16">
					<div
						aria-hidden
						className="absolute top-0 bottom-0 left-[7px] w-0.5 rounded-full bg-border md:left-[15px]"
					/>
					<motion.div
						aria-hidden
						className="absolute top-0 bottom-0 left-[7px] w-0.5 origin-top rounded-full md:left-[15px]"
						style={{
							scaleY: draw,
							backgroundImage: `linear-gradient(${spectrum.join(", ")})`,
						}}
					/>

					{experience.map((role) => (
						<article key={role.company + role.period} className="relative">
							<span
								aria-hidden
								className="absolute top-2 -left-8 grid size-4 place-items-center rounded-full bg-background ring-2 ring-[#ff3d7f] md:-left-16 md:size-8"
							>
								<span className="size-1.5 rounded-full bg-[#ff3d7f] md:size-3" />
							</span>

							<p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
								{role.period}
							</p>
							<h3 className="v2-display mt-3 text-4xl font-bold tracking-[-0.03em] md:text-6xl">
								{role.company}
							</h3>
							<p className="mt-2 text-lg text-muted-foreground">{role.role}</p>
							<p className="mt-6 max-w-3xl text-xl leading-snug text-pretty md:text-2xl">
								{role.summary}
							</p>

							<ul className="mt-10 grid gap-3 md:grid-cols-2">
								{role.highlights.map((highlight, i) => (
									<motion.li
										key={highlight}
										initial={{ opacity: 0, y: 24 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "0px 0px -8% 0px" }}
										transition={{ delay: (i % 2) * 0.08, duration: 0.5 }}
										className="flex gap-4 rounded-2xl border border-border bg-card/60 p-5 leading-relaxed text-pretty"
									>
										<span
											aria-hidden
											className="mt-2 size-2 shrink-0 rounded-full"
											style={{ background: spectrum[i % spectrum.length] }}
										/>
										{highlight}
									</motion.li>
								))}
							</ul>

							<ul className="mt-8 flex flex-wrap gap-2">
								{role.stack.map((item) => (
									<li
										key={item}
										className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
									>
										{item}
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
