import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import type { Social, SocialIcon } from "#/data/profile";
import { profile } from "#/data/profile";
import { cn } from "#/lib/utils";

const icons: Record<SocialIcon, typeof Github> = {
	github: Github,
	linkedin: Linkedin,
	x: Twitter,
	link: ArrowUpRight,
};

export function SocialLinks({ className }: { className?: string }) {
	return (
		<ul className={cn("flex items-center gap-1", className)}>
			{profile.socials.map((social: Social) => {
				const Icon = icons[social.icon];
				return (
					<li key={social.label}>
						<a
							href={social.href}
							target="_blank"
							rel="noreferrer"
							aria-label={social.label}
							className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
						>
							<Icon className="size-[18px]" strokeWidth={1.75} />
						</a>
					</li>
				);
			})}
		</ul>
	);
}
