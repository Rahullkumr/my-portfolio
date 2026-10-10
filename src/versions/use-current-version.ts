import { useLocation, useParams } from "@tanstack/react-router";
import { isVersionId, latestVersion, type VersionId } from "./meta";

export type SitePage = "home" | "blog";

// Which version and page is showing. `pinned` is set when the URL names a
// version (/v1, /v1/blog); links then stay inside that version.
export function useCurrentVersion(): {
	id: VersionId;
	pinned: VersionId | undefined;
	page: SitePage;
} {
	const { version } = useParams({ strict: false });
	const pathname = useLocation({ select: (location) => location.pathname });
	const pinned = version && isVersionId(version) ? version : undefined;

	return {
		id: pinned ?? latestVersion.id,
		pinned,
		page: pathname.replace(/\/$/, "").endsWith("/blog") ? "blog" : "home",
	};
}
