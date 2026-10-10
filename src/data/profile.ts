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
	description: string;
	tags: string[];
	href?: string;
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
	headline: "Full-stack engineer building the ERP software businesses run on.",
	intro:
		"I work across the stack: serverless APIs on AWS, relational data models, and data-dense React interfaces that people use all day.",
	email: "you@example.com", // TODO: your public email
	resumeUrl: "", // TODO: put resume.pdf in /public, then set this to "/resume.pdf"
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
		title: "Serverless ERP API",
		context: "Oplandtech ERP",
		description:
			"A Fastify API running on AWS Lambda with JWT and OAuth auth, file storage on S3, queued jobs on SQS and PDF/Excel exports.",
		tags: ["Fastify", "AWS Lambda", "S3", "SQS", "Redis", "Zod"],
	},
	{
		title: "Company Website",
		context: "Oplandtech",
		description:
			"The marketing site for the ERP product: fast, responsive and animated, with a contact flow for sales enquiries.",
		tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
		// TODO: add href: "https://..." if the site is public
	},
	// TODO: add personal or open-source projects with an href to the repo or live site
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
];
