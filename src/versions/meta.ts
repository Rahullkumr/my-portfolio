// Every design of the site, newest first. The first entry is the live site at
// "/" and "/blog"; every entry is also kept at "/<id>" and "/<id>/blog".
// To add a version, add an entry here and its pages in ./pages.ts.

export type VersionInfo = {
	id: string; // URL segment, e.g. "v2"
	released: string;
	note: string; // one line shown in the version switcher
};

export const versions = [
	{ id: "v1", released: "Oct 2026", note: "Dark minimal, single page" },
] as const satisfies readonly VersionInfo[];

export type VersionId = (typeof versions)[number]["id"];

export const latestVersion = versions[0];

export function isVersionId(id: string): id is VersionId {
	return versions.some((version) => version.id === id);
}
