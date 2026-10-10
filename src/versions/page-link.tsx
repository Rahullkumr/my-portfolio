import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import type { SitePage } from "./use-current-version";

type PageLinkProps = Omit<ComponentProps<"a">, "href" | "ref"> & {
	page: SitePage;
	version?: string; // omit for the live site
	hash?: string;
};

// Links to a page of the site, either on the live site or inside a pinned version.
export function PageLink({ page, version, hash, ...props }: PageLinkProps) {
	if (version) {
		return page === "home" ? (
			<Link to="/$version" params={{ version }} hash={hash} {...props} />
		) : (
			<Link to="/$version/blog" params={{ version }} hash={hash} {...props} />
		);
	}
	return page === "home" ? (
		<Link to="/" hash={hash} {...props} />
	) : (
		<Link to="/blog" hash={hash} {...props} />
	);
}
