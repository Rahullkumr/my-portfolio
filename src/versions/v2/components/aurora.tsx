import { useEffect, useRef } from "react";
import { cn } from "#/lib/utils";
import { spectrum } from "../palette";

// A voice spectrum drawn as silk: each ribbon is a bundle of thin lines
// following the same wave, and the bundle bends toward the pointer.
// One still frame when the visitor prefers reduced motion.

type Ribbon = {
	base: number; // vertical centre, as a share of the height
	amp: [number, number];
	freq: [number, number];
	speed: [number, number];
	spread: number;
	colors: [string, string, string];
};

const ribbons: Ribbon[] = [
	{
		base: 0.32,
		amp: [0.09, 0.05],
		freq: [3.1, 7.3],
		speed: [0.35, 0.22],
		spread: 2.2,
		colors: [spectrum[0], spectrum[1], spectrum[2]],
	},
	{
		base: 0.52,
		amp: [0.12, 0.04],
		freq: [2.3, 5.9],
		speed: [0.27, 0.41],
		spread: 2.8,
		colors: [spectrum[4], spectrum[5], spectrum[0]],
	},
	{
		base: 0.7,
		amp: [0.07, 0.06],
		freq: [4.2, 8.8],
		speed: [0.31, 0.18],
		spread: 1.8,
		colors: [spectrum[3], spectrum[4], spectrum[2]],
	},
];

const LINES = 22;
const STEPS = 90;

export function Aurora({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
		let width = 0;
		let height = 0;
		let gradients: CanvasGradient[] = [];
		let frame = 0;
		let visible = true;
		// Pointer position eases toward its target so the bend feels liquid.
		const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, pull: 0, tPull: 0 };

		function resize() {
			if (!canvas || !ctx) return;
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			gradients = ribbons.map((ribbon) => {
				const gradient = ctx.createLinearGradient(0, 0, width, 0);
				ribbon.colors.forEach((color, i) => {
					gradient.addColorStop(i / (ribbon.colors.length - 1), color);
				});
				return gradient;
			});
		}

		function draw(time: number) {
			if (!ctx) return;
			const t = time / 1000;
			const dark = document.documentElement.classList.contains("dark");
			ctx.clearRect(0, 0, width, height);
			ctx.globalCompositeOperation = dark ? "lighter" : "multiply";
			ctx.lineWidth = 1;

			pointer.x += (pointer.tx - pointer.x) * 0.06;
			pointer.y += (pointer.ty - pointer.y) * 0.06;
			pointer.pull += (pointer.tPull - pointer.pull) * 0.04;
			const px = pointer.x * width;
			const py = pointer.y * height;
			const reach = 2 * (width * 0.14) ** 2;

			ribbons.forEach((ribbon, r) => {
				ctx.strokeStyle = gradients[r];
				for (let l = 0; l < LINES; l++) {
					const fromCentre = Math.abs(l - LINES / 2) / (LINES / 2);
					ctx.globalAlpha = (dark ? 0.5 : 0.42) * (1 - fromCentre * 0.85);
					ctx.beginPath();
					for (let s = 0; s <= STEPS; s++) {
						const u = s / STEPS;
						const x = u * width;
						let y =
							height * ribbon.base +
							Math.sin(u * ribbon.freq[0] + t * ribbon.speed[0] + l * 0.07) *
								height *
								ribbon.amp[0] +
							Math.sin(u * ribbon.freq[1] - t * ribbon.speed[1] + l * 0.045) *
								height *
								ribbon.amp[1] +
							(l - LINES / 2) * ribbon.spread * (1 + 0.6 * Math.sin(u * 4 + t));
						const dx = x - px;
						y += (py - y) * Math.exp(-(dx * dx) / reach) * 0.4 * pointer.pull;
						if (s === 0) ctx.moveTo(x, y);
						else ctx.lineTo(x, y);
					}
					ctx.stroke();
				}
			});
			ctx.globalAlpha = 1;
		}

		function loop(time: number) {
			draw(time);
			if (visible && !reduceMotion.matches) frame = requestAnimationFrame(loop);
		}

		function start() {
			cancelAnimationFrame(frame);
			if (reduceMotion.matches) draw(8000);
			else frame = requestAnimationFrame(loop);
		}

		function onPointerMove(event: PointerEvent) {
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const inside =
				event.clientY >= rect.top &&
				event.clientY <= rect.bottom &&
				event.pointerType === "mouse";
			pointer.tx = (event.clientX - rect.left) / rect.width;
			pointer.ty = (event.clientY - rect.top) / rect.height;
			pointer.tPull = inside ? 1 : 0;
		}

		resize();
		start();

		const resizeObserver = new ResizeObserver(() => {
			resize();
			if (reduceMotion.matches) draw(8000);
		});
		resizeObserver.observe(canvas);

		// Stop drawing once the hero has scrolled away.
		const visibility = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) start();
		});
		visibility.observe(canvas);

		// The blend mode depends on the theme, so redraw the still frame on a switch.
		const themeObserver = new MutationObserver(() => {
			if (reduceMotion.matches) draw(8000);
		});
		themeObserver.observe(document.documentElement, {
			attributeFilter: ["class"],
		});

		reduceMotion.addEventListener("change", start);
		addEventListener("pointermove", onPointerMove, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			visibility.disconnect();
			themeObserver.disconnect();
			reduceMotion.removeEventListener("change", start);
			removeEventListener("pointermove", onPointerMove);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className={cn(
				"pointer-events-none absolute inset-0 size-full",
				className,
			)}
		/>
	);
}
