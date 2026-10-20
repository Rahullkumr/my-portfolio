import type { ComponentType } from "react";
import type { BlogFeed } from "#/lib/devto";
import type { VersionId } from "./meta";
import { Blog as V1Blog } from "./v1/blog";
import { Home as V1Home } from "./v1/home";
import { Blog as V2Blog } from "./v2/blog";
import { Home as V2Home } from "./v2/home";

// The pages each version provides. Content comes from #/data/profile and dev.to;
// a version only decides how it looks.
export type VersionPages = {
	Home: ComponentType<{ feed: Promise<BlogFeed> }>;
	Blog: ComponentType<{ feed: BlogFeed }>;
};

export const pages: Record<VersionId, VersionPages> = {
	v1: { Home: V1Home, Blog: V1Blog },
	v2: { Home: V2Home, Blog: V2Blog },
};
