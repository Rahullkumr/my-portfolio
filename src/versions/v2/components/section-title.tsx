import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "#/lib/utils";
import { spectrum } from "../palette";

// Big section heading. The title rises out of a mask when it scrolls in, and
// a colour dot from the spectrum marks the section number.
export function SectionTitle({
	index,
	title,
	children,
	className,
}: {
	index: number;
	title: string;
	children?: ReactNode;
	className?: string;
}) {
	const color = spectrum[(index - 1) % spectrum.length];

	return (
		<div className={cn("mb-12 md:mb-16", className)}>
			<p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
				<span className="size-2.5 rounded-full" style={{ background: color }} />
				{String(index).padStart(2, "0")}
			</p>
			<h2 className="v2-display mt-4 overflow-hidden pb-[0.14em] text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] font-extrabold tracking-[-0.05em]">
				<motion.span
					className="inline-block"
					initial={{ y: "105%" }}
					whileInView={{ y: 0 }}
					viewport={{ once: true, margin: "0px 0px -15% 0px" }}
					transition={{ type: "spring", stiffness: 90, damping: 18 }}
				>
					{title}
					<span style={{ color }}>.</span>
				</motion.span>
			</h2>
			{children}
		</div>
	);
}
