import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

// A ring that trails the mouse and swells over anything clickable. It inverts
// what it passes over, so it shows on every colour. The system cursor stays,
// so nothing depends on it; touch screens and reduced motion skip it.
export function Cursor() {
	const [enabled, setEnabled] = useState(false);
	const [hovering, setHovering] = useState(false);
	const [shown, setShown] = useState(false);
	const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });
	const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });

	useEffect(() => {
		const query = matchMedia(
			"(pointer: fine) and (prefers-reduced-motion: no-preference)",
		);
		const update = () => setEnabled(query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		if (!enabled) return;
		function onMove(event: PointerEvent) {
			if (event.pointerType !== "mouse") return;
			x.set(event.clientX);
			y.set(event.clientY);
			setShown(true);
			const target = event.target as Element | null;
			setHovering(Boolean(target?.closest("a, button, [data-cursor]")));
		}
		function onLeave() {
			setShown(false);
		}
		addEventListener("pointermove", onMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", onLeave);
		return () => {
			removeEventListener("pointermove", onMove);
			document.documentElement.removeEventListener("pointerleave", onLeave);
		};
	}, [enabled, x, y]);

	if (!enabled) return null;

	return (
		<motion.div
			aria-hidden
			className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-white mix-blend-difference"
			style={{ x, y, translateX: "-50%", translateY: "-50%" }}
			animate={{
				width: hovering ? 56 : 14,
				height: hovering ? 56 : 14,
				opacity: shown ? 1 : 0,
			}}
			transition={{ type: "spring", stiffness: 400, damping: 28 }}
		/>
	);
}
