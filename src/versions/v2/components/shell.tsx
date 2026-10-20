import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { SiteFooter } from "./contact";
import { Cursor } from "./cursor";
import { SiteHeader } from "./site-header";

// The v2 display face. React hoists this link into <head> and loads it once.
const displayFont =
	"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap";

// Everything every v2 page shares. MotionConfig turns movement off for
// visitors who prefer reduced motion; fades still run.
export function Shell({ children }: { children: ReactNode }) {
	return (
		<MotionConfig reducedMotion="user">
			<link rel="stylesheet" href={displayFont} precedence="default" />
			<Cursor />
			<SiteHeader />
			<main>{children}</main>
			<SiteFooter />
		</MotionConfig>
	);
}
