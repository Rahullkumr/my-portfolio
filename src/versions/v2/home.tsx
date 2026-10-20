import type { BlogFeed } from "#/lib/devto";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { ExperienceSection } from "./components/experience";
import { Hero } from "./components/hero";
import { Shell } from "./components/shell";
import { Stack } from "./components/stack";
import { Work } from "./components/work";
import { Writing } from "./components/writing";

export function Home({ feed }: { feed: Promise<BlogFeed> }) {
	return (
		<Shell>
			<Hero />
			<About />
			<ExperienceSection />
			<Work />
			<Stack />
			<Writing feed={feed} />
			<Contact />
		</Shell>
	);
}
