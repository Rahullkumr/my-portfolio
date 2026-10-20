import {
	type MotionValue,
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

const RADIUS = 170; // px around the pointer that pushes letters
const PUSH = 46; // furthest a letter moves

// The name, one word per line. Letters drop in on load, then shy away from
// the pointer on springs. Each letter shows its slice of a single gradient.
export function SpringName({ text }: { text: string }) {
	const ref = useRef<HTMLHeadingElement>(null);
	const reduceMotion = useReducedMotion();
	// Pointer position relative to the heading; far away means "no pointer".
	const px = useMotionValue(-1e4);
	const py = useMotionValue(-1e4);

	useEffect(() => {
		if (reduceMotion) return;
		function onPointerMove(event: PointerEvent) {
			if (event.pointerType !== "mouse" || !ref.current) return;
			const rect = ref.current.getBoundingClientRect();
			px.set(event.clientX - rect.left);
			py.set(event.clientY - rect.top);
		}
		function onLeave() {
			px.set(-1e4);
			py.set(-1e4);
		}
		addEventListener("pointermove", onPointerMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", onLeave);
		return () => {
			removeEventListener("pointermove", onPointerMove);
			document.documentElement.removeEventListener("pointerleave", onLeave);
		};
	}, [reduceMotion, px, py]);

	const words = text.split(" ");
	const count = words.reduce((sum, word) => sum + word.length, 0);
	let index = 0;

	return (
		<h1
			ref={ref}
			aria-label={text}
			className="v2-display relative text-[clamp(4.5rem,22vw,15rem)] leading-[0.82] font-extrabold tracking-[-0.06em] uppercase select-none"
		>
			{words.map((word) => (
				<span key={word} aria-hidden className="block whitespace-nowrap">
					{[...word].map((char) => {
						const i = index++;
						return (
							<Letter
								key={i}
								char={char}
								index={i}
								count={count}
								px={px}
								py={py}
							/>
						);
					})}
				</span>
			))}
		</h1>
	);
}

function Letter({
	char,
	index,
	count,
	px,
	py,
}: {
	char: string;
	index: number;
	count: number;
	px: MotionValue<number>;
	py: MotionValue<number>;
}) {
	const ref = useRef<HTMLSpanElement>(null);

	// Offsets ignore transforms, so the letter's resting centre stays stable
	// while it moves.
	function push(axis: "x" | "y") {
		const el = ref.current;
		if (!el) return 0;
		const dx = el.offsetLeft + el.offsetWidth / 2 - px.get();
		const dy = el.offsetTop + el.offsetHeight / 2 - py.get();
		const distance = Math.hypot(dx, dy);
		if (distance > RADIUS || distance === 0) return 0;
		const force = (1 - distance / RADIUS) ** 2 * PUSH;
		return ((axis === "x" ? dx : dy) / distance) * force;
	}

	const x = useSpring(
		useTransform(() => push("x")),
		{ stiffness: 220, damping: 14, mass: 0.6 },
	);
	const y = useSpring(
		useTransform(() => push("y")),
		{ stiffness: 220, damping: 14, mass: 0.6 },
	);
	const rotate = useTransform(x, [-PUSH, PUSH], [-14, 14]);

	return (
		<motion.span
			className="inline-block"
			style={
				{
					"--v2-count": `${count * 100}%`,
					"--v2-pos": `${count > 1 ? (index / (count - 1)) * 100 : 0}%`,
				} as React.CSSProperties
			}
			initial={{ y: "70%", opacity: 0, rotate: 8 }}
			animate={{ y: 0, opacity: 1, rotate: 0 }}
			transition={{
				delay: 0.15 + index * 0.05,
				type: "spring",
				stiffness: 140,
				damping: 16,
			}}
		>
			<motion.span
				ref={ref}
				className="v2-name-letter inline-block px-[0.02em]"
				style={{ x, y, rotate }}
			>
				{char}
			</motion.span>
		</motion.span>
	);
}
