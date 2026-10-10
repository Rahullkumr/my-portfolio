import { createFileRoute } from "@tanstack/react-router";
import { Contact, SiteFooter } from "#/components/contact";
import { Hero } from "#/components/hero";
import { About, ExperienceSection, Stack, Work } from "#/components/sections";
import { SiteHeader } from "#/components/site-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<SiteHeader />
			<main>
				<Hero />
				<About />
				<ExperienceSection />
				<Work />
				<Stack />
				<Contact />
			</main>
			<SiteFooter />
		</>
	);
}
