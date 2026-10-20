// v2 colours. The spectrum runs through the aurora, the name and the stack
// bands; each project gets a "world" of its own for its card.

export const spectrum = [
	"#ff3d7f", // pink
	"#ff7a1a", // saffron
	"#ffb627", // marigold
	"#3ddc84", // leaf
	"#2ec4ff", // sky
	"#8b5cf6", // violet
] as const;

export type World = {
	from: string;
	to: string;
	accent: string;
	ink: string; // text on the card; contrasts with every gradient stop
	background?: string; // replaces the default from→to linear gradient
};

// In project order: Padh Ke Batao, Chalo Nana, Repairwala, then repeats.
export const worlds: World[] = [
	// Night flower: a cornflower-blue glow with a violet core, fading to deep
	// navy, so the light text sits on the dark side.
	{
		from: "#4f7bff",
		to: "#0a1033",
		accent: "#a78bfa",
		ink: "#eef1ff",
		background:
			"radial-gradient(120% 95% at 78% 48%, #a99bff 0%, #6d83ff 14%, #3d63f5 30%, #2340c9 46%, #12206e 66%, #070b26 100%)",
	},
	{ from: "#2fd07f", to: "#b6ec3f", accent: "#0f766e", ink: "#04170d" },
	{ from: "#4cc9f0", to: "#a78bfa", accent: "#facc15", ink: "#0b0820" },
	{ from: "#ff5c8a", to: "#ffa3c2", accent: "#7c3aed", ink: "#1f0510" },
];

export function worldAt(index: number) {
	return worlds[index % worlds.length];
}
