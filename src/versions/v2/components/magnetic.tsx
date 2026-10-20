import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "#/lib/utils";

// Pulls its child a little toward the pointer while hovered.
export function Magnetic({
	children,
	strength = 0.35,
	className,
}: {
	children: ReactNode;
	strength?: number;
	className?: string;
}) {
	const reduceMotion = useReducedMotion();
	const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
	const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

	function onPointerMove(event: PointerEvent<HTMLDivElement>) {
		if (reduceMotion || event.pointerType !== "mouse") return;
		const rect = event.currentTarget.getBoundingClientRect();
		x.set((event.clientX - rect.left - rect.width / 2) * strength);
		y.set((event.clientY - rect.top - rect.height / 2) * strength);
	}

	function reset() {
		x.set(0);
		y.set(0);
	}

	return (
		<motion.div
			onPointerMove={onPointerMove}
			onPointerLeave={reset}
			style={{ x, y }}
			className={cn("inline-block", className)}
		>
			{children}
		</motion.div>
	);
}
