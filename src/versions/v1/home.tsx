import type { BlogFeed } from "#/lib/devto";
import { Contact, SiteFooter } from "./components/contact";
import { Hero } from "./components/hero";
import { About, ExperienceSection, Stack, Work } from "./components/sections";
import { SiteHeader } from "./components/site-header";
import { Writing } from "./components/writing";

export function Home({ feed }: { feed: Promise<BlogFeed> }) {
	return (
		<>
			<SiteHeader />
			<main>
				<Hero />
				<About />
				<ExperienceSection />
				<Work />
				<Stack />
				<Writing feed={feed} />
				<Contact />
			</main>
			<SiteFooter />
		</>
	);
}
