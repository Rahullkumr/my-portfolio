import { Moon, Sun } from "lucide-react";
import { type MouseEvent, useEffect } from "react";

const themeColors = { light: "#fafafa", dark: "#131317" };

// Points the browser UI colour (mobile address bar) at the active theme,
// not just the system one.
function syncThemeColor() {
	const isDark = document.documentElement.classList.contains("dark");
	for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
		meta.removeAttribute("media");
		meta.setAttribute("content", isDark ? themeColors.dark : themeColors.light);
	}
}

// The icon swaps through the `dark:` variant, so it is right on first paint
// without waiting for React to know the theme.
export function ThemeToggle() {
	useEffect(() => {
		syncThemeColor();
		// The class can also change when the system theme flips (see __root.tsx)
		const observer = new MutationObserver(syncThemeColor);
		observer.observe(document.documentElement, { attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	function toggle(event: MouseEvent<HTMLButtonElement>) {
		function apply() {
			const isDark = document.documentElement.classList.toggle("dark");
			try {
				localStorage.setItem("theme", isDark ? "dark" : "light");
			} catch {
				// Storage blocked (e.g. private mode); the theme still applies for this visit.
			}
		}

		const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!document.startViewTransition || reduceMotion) {
			apply();
			return;
		}

		// Grow the new theme out of the button
		const rect = event.currentTarget.getBoundingClientRect();
		const root = document.documentElement.style;
		root.setProperty("--theme-x", `${rect.left + rect.width / 2}px`);
		root.setProperty("--theme-y", `${rect.top + rect.height / 2}px`);
		document.startViewTransition(apply);
	}

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="Toggle dark mode"
			title="Toggle dark mode"
			className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
		>
			<Sun className="hidden size-[18px] dark:block" strokeWidth={1.75} />
			<Moon className="size-[18px] dark:hidden" strokeWidth={1.75} />
		</button>
	);
}
