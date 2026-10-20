import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "motion/react";
import { useRef } from "react";
import { type StackGroup, stack } from "#/data/profile";
import { spectrum } from "../palette";
import { SectionTitle } from "./section-title";

// Ink for text on each band; every spectrum colour is light enough for it.
const ink = "#140c1c";
const COPIES = 4;
const bandColors = [
	spectrum[0],
	spectrum[2],
	spectrum[4],
	spectrum[3],
	spectrum[1],
];

export function Stack() {
	return (
		<section id="stack" className="overflow-hidden py-20 md:py-28">
			<div className="v2-page">
				<SectionTitle index={4} title="Stack" />
			</div>
			<div className="-mx-[5vw] flex flex-col gap-4 md:gap-5">
				{stack.map((group, i) => (
					<Band
						key={group.label}
						group={group}
						color={bandColors[i % bandColors.length]}
						direction={i % 2 === 0 ? -1 : 1}
						tilt={i % 2 === 0 ? -2 : 1.5}
					/>
				))}
			</div>
		</section>
	);
}

function wrap(min: number, max: number, value: number) {
	const range = max - min;
	return ((((value - min) % range) + range) % range) + min;
}

// A coloured ribbon of tools that drifts sideways and speeds up with the
// scroll, flipping direction when the page scrolls back up.
function Band({
	group,
	color,
	direction,
	tilt,
}: {
	group: StackGroup;
	color: string;
	direction: 1 | -1;
	tilt: number;
}) {
	const reduceMotion = useReducedMotion();
	const offset = useMotionValue(0);
	const { scrollY } = useScroll();
	const velocity = useSpring(useVelocity(scrollY), {
		damping: 50,
		stiffness: 400,
	});
	const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
	const heading = useRef(direction);
	// One copy is a quarter of the track, so wrapping at -25% is seamless.
	const x = useTransform(offset, (value) => `${wrap(-25, 0, value)}%`);

	useAnimationFrame((_, delta) => {
		if (reduceMotion) return;
		if (boost.get() < 0) heading.current = -direction as 1 | -1;
		else if (boost.get() > 0) heading.current = direction;
		const step = heading.current * 2.2 * (delta / 1000);
		offset.set(offset.get() + step + step * Math.abs(boost.get()));
	});

	// Short groups repeat so each copy is wider than the screen.
	const items = Array.from(
		{ length: Math.ceil(10 / group.items.length) },
		() => group.items,
	).flat();

	return (
		<div
			className="overflow-hidden py-4 shadow-lg shadow-black/10 md:py-5"
			style={{ background: color, color: ink, rotate: `${tilt}deg` }}
		>
			<p className="sr-only">
				{group.label}: {group.items.join(", ")}
			</p>
			<motion.div aria-hidden className="flex w-max" style={{ x }}>
				{Array.from({ length: COPIES }, (_, copy) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: identical copies
						key={copy}
						className="flex shrink-0 items-center"
					>
						<span className="v2-display px-6 text-3xl font-extrabold tracking-[-0.03em] uppercase md:text-5xl">
							{group.label}
						</span>
						{items.map((item, i) => (
							<span
								// biome-ignore lint/suspicious/noArrayIndexKey: repeated items
								key={i}
								className="flex items-center"
							>
								<span className="text-xl opacity-40 md:text-2xl">✦</span>
								<span className="px-5 text-xl font-medium whitespace-nowrap md:text-2xl">
									{item}
								</span>
							</span>
						))}
					</div>
				))}
			</motion.div>
		</div>
	);
}
