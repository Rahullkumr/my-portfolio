// Every design of the site, newest first. The newest released entry is the
// live site at "/" and "/blog"; every entry is also kept at "/<id>" and
// "/<id>/blog". An `upcoming` entry is reachable at its own URL but never live.
// To add a version, add an entry here and its pages in ./pages.ts.

export type VersionInfo = {
	id: string; // URL segment, e.g. "v2"
	released: string;
	note: string; // one line shown in the version switcher
	upcoming?: true; // still in progress; not served at "/"
};

export const versions = [
	{
		id: "v2",
		released: "Coming soon",
		note: "New design in progress",
		upcoming: true,
	},
	{ id: "v1", released: "Oct 2026", note: "Dark minimal, single page" },
] as const satisfies readonly VersionInfo[];

export type VersionId = (typeof versions)[number]["id"];

type ReleasedVersion = Exclude<(typeof versions)[number], { upcoming: true }>;

function isReleased(
	version: (typeof versions)[number],
): version is ReleasedVersion {
	return !("upcoming" in version);
}

export const latestVersion = versions.filter(isReleased)[0];

export function isVersionId(id: string): id is VersionId {
	return versions.some((version) => version.id === id);
}
