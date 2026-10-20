import { ArrowUpRight, Github, Link2, Trophy, Youtube } from "lucide-react";
import {
	type MotionValue,
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from "motion/react";
import { useRef } from "react";
import { type Project, type ProjectLink, projects } from "#/data/profile";
import { worldAt } from "../palette";
import { ProjectArt } from "./project-art";
import { SectionTitle } from "./section-title";

const linkIcons: Record<ProjectLink["icon"], typeof Github> = {
	github: Github,
	youtube: Youtube,
	link: Link2,
};

// In the order they were built; each new card slides over the last.
export function Work() {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"],
	});

	return (
		<section id="work" className="pt-20 pb-8 md:pt-28 md:pb-0">
			<div className="v2-page">
				<SectionTitle index={3} title="Work">
					<p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl">
						Everyday tools with AI that runs on a laptop, so people's data
						never leaves the machine.
					</p>
				</SectionTitle>

				<div ref={ref} className="flex flex-col gap-8 md:gap-0">
					{projects.map((project, i) => (
						<ProjectCard
							key={project.title}
							project={project}
							index={i}
							total={projects.length}
							progress={scrollYProgress}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

// On wide screens each card pins and shrinks a little as the next slides over.
function ProjectCard({
	project,
	index,
	total,
	progress,
}: {
	project: Project;
	index: number;
	total: number;
	progress: MotionValue<number>;
}) {
	const reduceMotion = useReducedMotion();
	const world = worldAt(index);
	const targetScale = 1 - (total - 1 - index) * 0.05;
	const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

	return (
		<div className="md:sticky md:top-0 md:flex md:h-svh md:items-center">
			<motion.article
				className="relative grid w-full origin-top gap-8 overflow-hidden rounded-[2rem] p-6 shadow-2xl shadow-black/20 md:min-h-[78svh] md:grid-cols-[1.1fr_1fr] md:p-10"
				style={{
					scale: reduceMotion ? 1 : scale,
					top: `${index * 28}px`,
					color: world.ink,
					backgroundImage:
						world.background ??
						`linear-gradient(135deg, ${world.from}, ${world.to})`,
				}}
				initial={{ opacity: 0, y: 60 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "0px 0px -10% 0px" }}
				transition={{ type: "spring", stiffness: 70, damping: 18 }}
			>
				<div className="flex flex-col">
					<div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.15em]">
						<span className="opacity-60">
							{String(index + 1).padStart(2, "0")}
						</span>
						<span className="opacity-80">{project.context}</span>
						{project.award && (
							<span
								className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 normal-case tracking-normal"
								style={{ background: world.ink, color: world.to }}
							>
								<Trophy aria-hidden className="size-3.5" />
								{project.award}
							</span>
						)}
					</div>

					<h3 className="v2-display mt-5 text-5xl leading-[0.92] font-extrabold tracking-[-0.045em] md:text-7xl">
						{project.title}
					</h3>
					<p className="mt-6 max-w-xl leading-relaxed text-pretty opacity-85 md:text-[1.05rem]">
						{project.description}
					</p>

					<ul className="mt-6 flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<li
								key={tag}
								className="rounded-full border px-3 py-1 font-mono text-xs"
								style={{ borderColor: `${world.ink}33` }}
							>
								{tag}
							</li>
						))}
					</ul>

					<div className="mt-auto flex flex-wrap gap-2 pt-8">
						{(project.links ?? []).map((link) => {
							const Icon = linkIcons[link.icon];
							return (
								<a
									key={link.href}
									href={link.href}
									target="_blank"
									rel="noreferrer"
									className="group inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-transform hover:-translate-y-0.5"
									style={{ background: world.ink, color: world.to }}
								>
									<Icon aria-hidden className="size-4" />
									{link.label}
									<ArrowUpRight
										aria-hidden
										className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									/>
								</a>
							);
						})}
						{!project.links && project.href && (
							<a
								href={project.href}
								target="_blank"
								rel="noreferrer"
								className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium"
								style={{ background: world.ink, color: world.to }}
							>
								Open project
								<ArrowUpRight aria-hidden className="size-4" />
							</a>
						)}
					</div>
				</div>

				<ProjectArt index={index} world={world} />
			</motion.article>
		</div>
	);
}
