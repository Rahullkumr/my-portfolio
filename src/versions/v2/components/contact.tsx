import {
	ArrowUpRight,
	Check,
	Copy,
	FileText,
	Github,
	Linkedin,
	Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { profile, type SocialIcon } from "#/data/profile";
import { Magnetic } from "./magnetic";

const icons: Record<SocialIcon, typeof Github> = {
	github: Github,
	linkedin: Linkedin,
	x: Twitter,
	link: ArrowUpRight,
};

// Primary contact button when no public email is set
const linkedin = profile.socials.find((social) => social.icon === "linkedin");

export function Contact() {
	const [copied, setCopied] = useState(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(profile.email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard unavailable (e.g. insecure context); the mailto link still works.
		}
	}

	return (
		<section id="contact" className="relative overflow-hidden py-28 md:py-44">
			<div className="v2-page text-center">
				<p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
					06 · Contact
				</p>
				<h2 className="v2-display mt-6 text-[clamp(3.5rem,14vw,12rem)] leading-[0.85] font-extrabold tracking-[-0.06em]">
					{["Let's", "talk."].map((word, i) => (
						<span key={word} className="block overflow-hidden pb-[0.06em]">
							<motion.span
								className="v2-gradient-text inline-block"
								initial={{ y: "100%" }}
								whileInView={{ y: 0 }}
								viewport={{ once: true }}
								transition={{
									delay: i * 0.12,
									type: "spring",
									stiffness: 80,
									damping: 16,
								}}
							>
								{word}
							</motion.span>
						</span>
					))}
				</h2>
				<p className="mx-auto mt-8 max-w-xl text-lg text-pretty text-muted-foreground md:text-xl">
					Have a role, a project or an open-source idea in mind? I'd love to
					hear about it.
				</p>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
					{profile.email ? (
						<>
							<Magnetic>
								<a href={`mailto:${profile.email}`} className="v2-btn-primary">
									{profile.email}
									<ArrowUpRight className="size-4" />
								</a>
							</Magnetic>
							<button
								type="button"
								onClick={copyEmail}
								className="v2-btn-ghost"
							>
								{copied ? (
									<Check className="size-4 text-brand" />
								) : (
									<Copy className="size-4" />
								)}
								<span aria-live="polite">
									{copied ? "Copied" : "Copy email"}
								</span>
							</button>
						</>
					) : (
						linkedin && (
							<Magnetic strength={0.5}>
								<a
									href={linkedin.href}
									target="_blank"
									rel="noreferrer"
									className="v2-btn-primary h-14 px-8 text-base"
								>
									Message me on LinkedIn
									<ArrowUpRight className="size-5" />
								</a>
							</Magnetic>
						)
					)}
					{profile.resumeUrl && (
						<a
							href={profile.resumeUrl}
							target="_blank"
							rel="noreferrer"
							className="v2-btn-ghost"
						>
							<FileText className="size-4" />
							Résumé
						</a>
					)}
				</div>

				<ul className="mt-10 flex items-center justify-center gap-2">
					{profile.socials.map((social) => {
						const Icon = icons[social.icon];
						return (
							<li key={social.label}>
								<Magnetic strength={0.6}>
									<a
										href={social.href}
										target="_blank"
										rel="noreferrer"
										aria-label={social.label}
										className="grid size-12 place-items-center rounded-full border border-border transition-colors hover:border-foreground/40"
									>
										<Icon className="size-5" strokeWidth={1.75} />
									</a>
								</Magnetic>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}

export function SiteFooter() {
	return (
		<footer className="border-t border-border py-10">
			<div className="v2-page flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
				<p>
					© {new Date().getFullYear()} {profile.name}
					{profile.underDevelopment && (
						<span className="opacity-70"> · Site under development</span>
					)}
				</p>
				<a href="#top" className="transition-colors hover:text-foreground">
					Back to top ↑
				</a>
			</div>
		</footer>
	);
}
