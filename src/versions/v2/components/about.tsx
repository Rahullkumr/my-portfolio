import {
	type MotionValue,
	motion,
	useScroll,
	useTransform,
} from "motion/react";
import { useRef } from "react";
import { profile } from "#/data/profile";
import { SectionTitle } from "./section-title";

// Words that get a colour once they light up.
const accents: Record<string, string> = {
	"full-stack": "var(--v2-pink)",
	ERP: "var(--v2-saffron)",
	HCM: "var(--v2-marigold)",
	MySQL: "var(--v2-sky)",
	Fastify: "var(--v2-leaf)",
	interface: "var(--v2-violet)",
};

export function About() {
	const [lead, ...rest] = profile.about;
	return (
		<section id="about" className="py-20 md:py-28">
			<div className="v2-page">
				<SectionTitle index={1} title="About" />
				<ScrollLitText text={`${lead} ${rest[0] ?? ""}`} />
				{rest.slice(1).map((paragraph) => (
					<motion.div
						key={paragraph}
						initial={{ opacity: 0, y: 40, rotate: -1.5 }}
						whileInView={{ opacity: 1, y: 0, rotate: 0 }}
						viewport={{ once: true, margin: "0px 0px -10% 0px" }}
						transition={{ type: "spring", stiffness: 70, damping: 16 }}
						className="relative mt-20 overflow-hidden rounded-[2rem] p-8 text-lg leading-relaxed text-pretty text-[#140c1c] md:mt-28 md:p-14 md:text-2xl md:leading-snug"
						style={{
							background:
								"linear-gradient(135deg, #ffb627 0%, #ff7a1a 45%, #ff3d7f 100%)",
						}}
					>
						<p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] opacity-70">
							Off the clock
						</p>
						<p className="relative max-w-4xl">{paragraph}</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}

// A paragraph whose words light up one after another as it scrolls through
// the viewport, like a transcript catching up with speech.
function ScrollLitText({ text }: { text: string }) {
	const ref = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.85", "end 0.45"],
	});
	const words = text.split(" ").filter(Boolean);

	return (
		<p
			ref={ref}
			className="v2-display max-w-5xl text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
		>
			{words.map((word, i) => (
				<Word
					// biome-ignore lint/suspicious/noArrayIndexKey: words of a fixed string
					key={i}
					word={word}
					progress={scrollYProgress}
					range={[i / words.length, (i + 1) / words.length]}
				/>
			))}
		</p>
	);
}

function Word({
	word,
	progress,
	range,
}: {
	word: string;
	progress: MotionValue<number>;
	range: [number, number];
}) {
	const opacity = useTransform(progress, range, [0.14, 1]);
	const bare = word.replace(/[^\w-]/g, "");
	const color = accents[bare];

	return (
		<>
			<motion.span style={{ opacity, color }}>{word}</motion.span>{" "}
		</>
	);
}
