import { Moon, Sun } from "lucide-react";

// The icon swaps through the `dark:` variant, so it is right on first paint
// without waiting for React to know the theme.
export function ThemeToggle() {
	function toggle() {
		const isDark = document.documentElement.classList.toggle("dark");
		try {
			localStorage.setItem("theme", isDark ? "dark" : "light");
		} catch {
			// Storage blocked (e.g. private mode); the theme still applies for this visit.
		}
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
