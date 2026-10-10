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
	headline: "Full-stack engineer building the ERP software businesses run on.",
	intro:
		"I work across the stack: serverless APIs on AWS, relational data models, and data-dense React interfaces that people use all day.",
	email: "you@example.com", // TODO: your public email
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
		"I'm a full-stack engineer at Oplandtech, where I build and maintain an ERP platform covering inventory, procurement, wellbeing and organisation management.",
		"Most of my work sits where business rules meet the interface: modelling data in MySQL, exposing it through typed Fastify APIs, and turning it into tables, dashboards and workflows that stay fast and clear as the data grows.",
		// TODO: add a line about what you care about or what you're looking for next
	],
};

export const experience: Experience[] = [
	{
		company: "Oplandtech",
		role: "Junior Software Engineer",
		period: "August 2025 — Present",
		summary:
			"Building a modular ERP platform end to end, from the database and serverless API to the React front end and the company website.",
		highlights: [
			"Built ERP modules for inventory, procurement, wellbeing management and organisation structure.",
			"Develop TypeScript REST APIs on Fastify, deployed serverless on AWS Lambda, using MySQL through TypeORM and Sequelize, Redis, S3 and SQS.",
			"Build data-heavy React interfaces: sortable tables, dashboards and charts, interactive org charts, rich-text editing and drag-and-drop layouts.",
			"Generate PDF and Excel reports from ERP data for business users.",
			"Built the company marketing website with React, Tailwind CSS and Framer Motion.",
		],
		stack: [
			"TypeScript",
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
		context: "DEV Hacktoberfest 2026",
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
