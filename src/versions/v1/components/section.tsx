import type { ReactNode } from "react";

export function Section({
	id,
	index,
	label,
	children,
}: {
	id: string;
	index: string;
	label: string;
	children: ReactNode;
}) {
	return (
		<section id={id} className="border-t border-border py-16 sm:py-20 md:py-28">
			<div className="page grid gap-6 sm:gap-8 md:grid-cols-[180px_1fr] md:gap-16">
				<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground md:sticky md:top-28 md:self-start">
					<span className="text-brand">{index}</span> / {label}
				</p>
				<div className="reveal min-w-0">{children}</div>
			</div>
		</section>
	);
}
