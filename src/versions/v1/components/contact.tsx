import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { useState } from "react";
import { profile } from "#/data/profile";
import { Section } from "./section";
import { SocialLinks } from "./social-links";

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
		<Section id="contact" index="06" label="Contact">
			<h2 className="max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
				Have a role, a project or an open-source idea in mind?
				<span className="block text-muted-foreground">Let's talk.</span>
			</h2>

			<div className="mt-10 flex flex-wrap items-center gap-3">
				{profile.email ? (
					<>
						<a href={`mailto:${profile.email}`} className="btn-primary">
							{profile.email}
							<ArrowUpRight className="size-4" />
						</a>
						<button type="button" onClick={copyEmail} className="btn-ghost">
							{copied ? (
								<Check className="size-4 text-brand" />
							) : (
								<Copy className="size-4" />
							)}
							<span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
						</button>
					</>
				) : (
					linkedin && (
						<a
							href={linkedin.href}
							target="_blank"
							rel="noreferrer"
							className="btn-primary"
						>
							Message me on LinkedIn
							<ArrowUpRight className="size-4" />
						</a>
					)
				)}
				{profile.resumeUrl && (
					<a
						href={profile.resumeUrl}
						target="_blank"
						rel="noreferrer"
						className="btn-ghost"
					>
						<FileText className="size-4" />
						Résumé
					</a>
				)}
			</div>

			<SocialLinks className="mt-8 -ml-3" />
		</Section>
	);
}

export function SiteFooter() {
	return (
		<footer className="border-t border-border py-10">
			<div className="page flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
				<p>
					© {new Date().getFullYear()} {profile.name}
					{profile.underDevelopment && (
						<span className="text-muted-foreground/70">
							{" "}
							· Site under development
						</span>
					)}
				</p>
				<a href="#top" className="transition-colors hover:text-foreground">
					Back to top ↑
				</a>
			</div>
		</footer>
	);
}
