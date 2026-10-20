import { motion, useReducedMotion } from "motion/react";
import type { World } from "../palette";

// A small animated scene for each project card, in the card's own colours.
// Scenes are picked by position and repeat for any later projects.
export function ProjectArt({ index, world }: { index: number; world: World }) {
	const scenes = [ReadAloud, Walk, VoiceNote];
	const Scene = scenes[index % scenes.length];
	return (
		<div
			aria-hidden
			className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl border md:aspect-auto md:h-full"
			style={{
				borderColor: `${world.ink}22`,
				background: `${world.ink}0d`,
				color: world.ink,
			}}
		>
			<Scene world={world} />
		</div>
	);
}

const lines = [86, 72, 92, 64, 80, 58, 76];

// Padh Ke Batao: a letter being read line by line, and spoken aloud.
function ReadAloud({ world }: { world: World }) {
	const still = useReducedMotion();
	return (
		<div className="relative w-[62%] max-w-72">
			<div className="rotate-[-4deg] rounded-xl bg-white p-[9%] shadow-2xl shadow-black/20">
				<div className="mb-4 h-2.5 w-1/3 rounded-full bg-black/80" />
				<div className="relative space-y-2.5">
					{lines.map((width, i) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: static lines
							key={i}
							className="h-2 rounded-full bg-black/15"
							style={{ width: `${width}%` }}
						/>
					))}
					{!still && (
						<motion.div
							className="absolute -inset-x-1.5 top-[-3px] h-3.5 rounded-md mix-blend-multiply"
							style={{ background: world.from }}
							animate={{ y: lines.map((_, i) => i * 18) }}
							transition={{
								duration: 5,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
					)}
				</div>
			</div>

			<div className="absolute top-1/2 -right-[9%] -translate-y-1/2">
				{[0, 1, 2].map((i) => (
					<motion.span
						key={i}
						className="absolute top-1/2 left-0 block rounded-full border-[3px] border-l-0 border-y-transparent"
						style={{
							width: 22 + i * 18,
							height: 22 + i * 18,
							marginTop: -(11 + i * 9),
							borderRightColor: world.ink,
						}}
						animate={still ? undefined : { opacity: [0.2, 1, 0.2] }}
						transition={{
							duration: 1.4,
							delay: i * 0.2,
							repeat: Number.POSITIVE_INFINITY,
						}}
					/>
				))}
			</div>

			<motion.p
				className="absolute -bottom-6 -left-4 rounded-2xl rounded-bl-sm px-4 py-2 text-lg font-semibold shadow-lg"
				style={{ background: world.ink, color: world.to }}
				animate={still ? undefined : { y: [0, -6, 0] }}
				transition={{
					duration: 3,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				lang="hi"
			>
				पढ़ के बताओ
			</motion.p>
		</div>
	);
}

const walkPath =
	"M40 230 C 90 120, 170 260, 220 150 S 330 60, 360 120 S 300 250, 220 220 S 80 300, 40 230";
const pins: [number, number][] = [
	[220, 150],
	[360, 120],
	[220, 220],
];

// Chalo Nana: the day's walk drawing itself, with someone out on the loop.
function Walk({ world }: { world: World }) {
	const still = useReducedMotion();
	return (
		<div className="relative w-[82%]">
			<svg
				aria-hidden
				viewBox="0 0 400 300"
				className="w-full overflow-visible"
			>
				<title>Walk route</title>
				<path
					d={walkPath}
					fill="none"
					stroke={world.ink}
					strokeOpacity={0.15}
					strokeWidth={14}
					strokeLinecap="round"
				/>
				<motion.path
					d={walkPath}
					fill="none"
					stroke={world.ink}
					strokeWidth={4}
					strokeDasharray="2 12"
					strokeLinecap="round"
					initial={{ pathLength: still ? 1 : 0 }}
					animate={still ? undefined : { pathLength: [0, 1, 1] }}
					transition={{
						duration: 6,
						times: [0, 0.75, 1],
						repeat: Number.POSITIVE_INFINITY,
					}}
				/>
				{pins.map(([x, y], i) => (
					<motion.g
						// biome-ignore lint/suspicious/noArrayIndexKey: static pins
						key={i}
						initial={{ scale: still ? 1 : 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.4 + i * 0.25, type: "spring" }}
						style={{ originX: `${x}px`, originY: `${y}px` }}
					>
						<circle cx={x} cy={y} r={13} fill={world.accent} />
						<circle cx={x} cy={y} r={5} fill="white" />
					</motion.g>
				))}
				{!still && (
					<circle r={9} fill="white" stroke={world.ink} strokeWidth={3}>
						<animateMotion
							dur="9s"
							repeatCount="indefinite"
							path={walkPath}
							rotate="auto"
						/>
					</circle>
				)}
			</svg>
			<p
				className="absolute -top-4 right-0 rounded-full px-4 py-1.5 font-mono text-sm font-medium"
				style={{ background: world.ink, color: world.to }}
			>
				30 min · 2.1 km
			</p>
			<p className="absolute -bottom-2 left-0 text-lg font-semibold" lang="hi">
				चलो नाना
			</p>
		</div>
	);
}

const bars = [
	0.3, 0.55, 0.8, 0.45, 1, 0.7, 0.35, 0.9, 0.6, 0.4, 0.75, 0.5, 0.95, 0.3, 0.65,
	0.85, 0.4, 0.55, 0.3,
];
const qr = [
	1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0,
	1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1,
];

// Repairwala: the WhatsApp voice note and UPI code a customer receives.
function VoiceNote({ world }: { world: World }) {
	const still = useReducedMotion();
	return (
		<div className="flex w-[80%] max-w-80 flex-col gap-4">
			<div className="flex items-center gap-3 rounded-2xl rounded-tl-sm bg-white p-3 shadow-xl shadow-black/15">
				<span
					className="grid size-10 shrink-0 place-items-center rounded-full"
					style={{ background: world.ink }}
				>
					<span className="ml-0.5 size-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
				</span>
				<div className="flex h-10 flex-1 items-center gap-[3px]">
					{bars.map((height, i) => (
						<motion.span
							// biome-ignore lint/suspicious/noArrayIndexKey: static bars
							key={i}
							className="w-full rounded-full"
							style={{ background: world.ink, height: `${height * 100}%` }}
							animate={
								still ? undefined : { scaleY: [1, 0.35 + height * 0.4, 1] }
							}
							transition={{
								duration: 0.9 + (i % 4) * 0.15,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
								delay: i * 0.05,
							}}
						/>
					))}
				</div>
				<span className="font-mono text-xs text-black/60">0:07</span>
			</div>

			<div className="flex items-center gap-4 self-end rounded-2xl rounded-tr-sm bg-white p-3 shadow-xl shadow-black/15">
				<div className="grid grid-cols-7 gap-[3px]">
					{qr.map((on, i) => (
						<motion.span
							// biome-ignore lint/suspicious/noArrayIndexKey: static grid
							key={i}
							className="size-2.5 rounded-[2px]"
							style={{ background: on ? world.ink : "transparent" }}
							initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 0.4 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{
								delay: 0.3 + (i % 7) * 0.04 + Math.floor(i / 7) * 0.04,
							}}
						/>
					))}
				</div>
				<div className="text-black">
					<p className="font-mono text-[11px] uppercase tracking-wider text-black/55">
						UPI
					</p>
					<p className="text-2xl font-bold">₹450</p>
					<p className="text-sm text-black/60" lang="hi">
						तैयार है
					</p>
				</div>
			</div>
		</div>
	);
}
