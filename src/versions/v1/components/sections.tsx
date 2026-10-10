import { ArrowUpRight, Github, Trophy, Youtube } from "lucide-react";
import type { ProjectLink } from "#/data/profile";
import { experience, profile, projects, stack } from "#/data/profile";
import { Section } from "./section";

export function About() {
	return (
		<Section id="about" index="01" label="About">
			<div className="max-w-2xl space-y-5 text-xl leading-relaxed text-pretty md:text-2xl md:leading-relaxed">
				{profile.about.map((paragraph, i) => (
					<p
						key={paragraph}
						className={i === 0 ? "text-foreground" : "text-muted-foreground"}
					>
						{paragraph}
					</p>
				))}
			</div>
		</Section>
	);
}

export function ExperienceSection() {
	return (
		<Section id="experience" index="02" label="Experience">
			<ol className="space-y-14">
				{experience.map((job) => (
					<li key={`${job.company}-${job.period}`}>
						<div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
							<h3 className="text-xl font-medium tracking-tight">
								{job.role}{" "}
								<span className="text-muted-foreground">at {job.company}</span>
							</h3>
							<p className="font-mono text-xs text-muted-foreground">
								{job.period}
							</p>
						</div>
						<p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
							{job.summary}
						</p>
						<ul className="mt-6 space-y-3">
							{job.highlights.map((item) => (
								<li
									key={item}
									className="flex gap-3 leading-relaxed text-foreground/85"
								>
									<span
										aria-hidden
										className="mt-[0.7em] h-px w-3 shrink-0 bg-brand"
									/>
									{item}
								</li>
							))}
						</ul>
						<ul className="mt-6 flex flex-wrap gap-2">
							{job.stack.map((tech) => (
								<li key={tech} className="chip">
									{tech}
								</li>
							))}
						</ul>
					</li>
				))}
			</ol>
		</Section>
	);
}

const linkIcons: Record<ProjectLink["icon"], typeof Github> = {
	github: Github,
	youtube: Youtube,
	link: ArrowUpRight,
};

export function Work() {
	return (
		<Section id="work" index="03" label="Selected work">
			<ul className="grid gap-4 sm:grid-cols-2">
				{projects.map((project, i) => {
					const body = (
						<>
							<div className="flex items-start justify-between gap-4">
								<p className="font-mono text-xs text-muted-foreground">
									{String(i + 1).padStart(2, "0")} · {project.context}
								</p>
								{project.href && !project.links && (
									<ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
								)}
							</div>
							<h3 className="mt-6 text-lg font-medium tracking-tight">
								{project.title}
							</h3>
							{project.award && (
								<p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
									<Trophy aria-hidden className="size-4" />
									{project.award}
								</p>
							)}
							<p className="mt-2 leading-relaxed text-muted-foreground">
								{project.description}
							</p>
							<ul className="mt-auto flex flex-wrap gap-2 pt-6">
								{project.tags.map((tag) => (
									<li key={tag} className="chip">
										{tag}
									</li>
								))}
							</ul>
							{project.links && (
								<ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 text-sm">
									{project.links.map((link) => {
										const Icon = linkIcons[link.icon];
										return (
											<li key={link.href}>
												<a
													href={link.href}
													target="_blank"
													rel="noreferrer"
													className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-brand"
												>
													<Icon aria-hidden className="size-4" />
													{link.label}
												</a>
											</li>
										);
									})}
								</ul>
							)}
						</>
					);
					const cardClass =
						"group flex h-full flex-col rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-foreground/20 hover:bg-card";

					return (
						<li
							key={project.title}
							className={projects.length === 1 ? "sm:col-span-2" : undefined}
						>
							{project.href && !project.links ? (
								<a
									href={project.href}
									target="_blank"
									rel="noreferrer"
									className={cardClass}
								>
									{body}
								</a>
							) : (
								<article className={cardClass}>{body}</article>
							)}
						</li>
					);
				})}
			</ul>
		</Section>
	);
}

export function Stack() {
	return (
		<Section id="stack" index="04" label="Stack">
			<dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
				{stack.map((group) => (
					<div key={group.label}>
						<dt className="text-sm font-medium">{group.label}</dt>
						<dd className="mt-4">
							<ul className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<li key={item} className="chip">
										{item}
									</li>
								))}
							</ul>
						</dd>
					</div>
				))}
			</dl>
		</Section>
	);
}
