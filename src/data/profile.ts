// All portfolio content lives in this file. Edit it to update the site.
// Search for "TODO" to find the details that still need your input.

export type SocialIcon = "github" | "linkedin" | "x" | "link";

export type Social = {
	label: string;
	href: string;
	icon: SocialIcon;
};

export type Experience = {
	company: string;
	role: string;
	period: string;
	summary: string;
	highlights: string[];
	stack: string[];
};

export type Project = {
	title: string;
	context: string;
	award?: string;
	description: string;
	tags: string[];
	href?: string; // makes the whole card a link; ignored when links is set
	links?: ProjectLink[];
};

export type ProjectLink = {
	label: string;
	href: string;
	icon: "github" | "youtube" | "link";
};

export type StackGroup = {
	label: string;
	items: string[];
};

export const profile = {
	name: "Rahul Kumar",
	role: "Full-Stack Engineer",
	location: "Ranchi, India",
	photo: "/rahullkumr.webp", // file in /public; set to "" to show initials instead
	available: true,
	underDevelopment: true, // shows a "Site under development" badge in the hero; set false when done
	siteUrl: "https://madebyrahul.tech",
	headline: "I build SaaS ERP and HCM software, and learn AI in the open.",
	intro:
		"By day I'm a Full-Stack Engineer at Oplandtech, shipping serverless APIs, MySQL data models and data-dense React screens. Off the clock I learn new tech by building open-source AI projects.",
	// Small link shown above the headline; set to null to hide it
	spotlight: {
		// The space after "DEV" is non-breaking, so the pill wraps after the "·" on phones
		label: "Won Best Use of ElevenLabs · Hacktoberfest: Build for a Friend",
		href: "#work",
	} as { label: string; href: string } | null,
	email: "", // TODO: your public email; until set, Contact points to LinkedIn
	resumeUrl: "", // TODO: put resume.pdf in /public, then set this to "/resume.pdf"
	devto: "rahullkumr", // dev.to username; the blog lists this account's articles
	blogIntro:
		"Notes on what I build and what I learn along the way, published on DEV.",
	socials: [
		{ label: "GitHub", href: "https://github.com/rahullkumr", icon: "github" },
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/rahullkumr",
			icon: "linkedin",
		},
	] satisfies Social[],
	about: [
		"I'm a full-stack engineer at Oplandtech, a SaaS company building an ERP and HCM platform.",
		"Most of my work sits where business rules meet the interface: modelling data in MySQL, exposing it through typed Fastify APIs, and turning it into tables, dashboards and workflows that stay fast and clear as the data grows.",
		"Outside work, I learn new technology by building with it in public. Hacktoberfest 2026 was about AI and open source, so I built Padh Ke Batao, an offline document explainer for my grandfather that runs a vision model on a laptop with no GPU. It won Best Use of ElevenLabs.",
	],
};

export const experience: Experience[] = [
	{
		company: "Oplandtech",
		role: "Junior Software Engineer",
		period: "August 2025 — Present",
		summary:
			"Building a modular SaaS ERP and HCM platform end to end, from the database and REST APIs to the React frontend and the company website.",
		highlights: [
			"Developed features for the recruitment module of the HCM category.",
			"Built pricing and plan management for the SaaS product, and instance creation that sets up the platform for each new customer.",
			"Implemented role-based and scope-based access control, so each user only sees and changes what their role allows, within the data they're scoped to.",
			"Fixed many bugs across the platform.",
			"Develop REST APIs on Fastify, deployed serverless on AWS Lambda, using MySQL through TypeORM and Sequelize, Redis, S3 and SQS.",
			"Build data-heavy React interfaces: sortable tables, dashboards and charts, rich-text editing and drag-and-drop layouts.",
			"Generate PDF and Excel reports from ERP data for business users.",
			"Built the company marketing website with React, Tailwind CSS and Framer Motion.",
		],
		stack: [
			"JavaScript",
			"React",
			"Fastify",
			"MySQL",
			"AWS Lambda",
			"Redux Toolkit",
			"MUI",
			"Tailwind CSS",
		],
	},
	// TODO: add earlier roles here, newest first
];

export const projects: Project[] = [
	{
		title: "Padh Ke Batao",
		context: "Hacktoberfest 2026",
		award: "Winner · Best Use of ElevenLabs",
		description:
			"Photograph a bank notice, hospital report or government letter and get a plain-language explanation in Hindi or English: what it says, what to do and by when, read aloud. Built for my grandfather. A local vision model reads the photo on a CPU-only laptop, so the document never leaves the machine; only the explanation text goes to ElevenLabs for the voice.",
		tags: [
			"Ollama",
			"Qwen 3.5",
			"ElevenLabs",
			"Fastify",
			"Node.js",
			"JavaScript",
		],
		links: [
			{
				label: "GitHub",
				href: "https://github.com/Rahullkumr/padh-ke-batao",
				icon: "github",
			},
			{
				label: "Demo video",
				href: "https://youtu.be/VO9MM8JvKCQ",
				icon: "youtube",
			},
			{
				label: "Write-up on DEV",
				href: "https://dev.to/rahullkumr/padh-ke-batao-an-ai-that-reads-my-grandfathers-documents-to-him-on-a-laptop-with-no-gpu-3818",
				icon: "link",
			},
		],
	},
];

export const stack: StackGroup[] = [
	{
		label: "Frontend",
		items: [
			"React",
			"TypeScript",
			"Redux Toolkit",
			"Zustand",
			"TanStack Query",
			"Tailwind CSS",
			"MUI",
			"Vite",
		],
	},
	{
		label: "Backend",
		items: [
			"Node.js",
			"Fastify",
			"TypeORM",
			"Sequelize",
			"MySQL",
			"Redis",
			"Zod",
			"REST APIs",
		],
	},
	{
		label: "Cloud",
		items: ["AWS Lambda", "S3", "SQS", "Serverless Framework"],
	},
	{
		label: "Data & UI",
		items: ["Recharts", "Chart.js", "TipTap", "dnd-kit"],
	},
	{
		label: "AI",
		items: [
			"Ollama",
			"Local vision models",
			"Qwen",
			"Prompt engineering",
			"Structured JSON output",
			"ElevenLabs TTS",
			"Web Speech API",
		],
	},
];
