import { Check, ChevronDown, Layers } from "lucide-react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "#/lib/utils";
import { latestVersion, versions } from "#/versions/meta";
import { PageLink } from "#/versions/page-link";
import { useCurrentVersion } from "#/versions/use-current-version";

// Dropdown for switching between designs of the site. Shared by every version,
// so it only uses theme tokens and Tailwind utilities, never version CSS.
export function VersionSwitcher({ className }: { className?: string }) {
	const { id: currentId, page } = useCurrentVersion();
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const menuId = useId();

	useEffect(() => {
		if (!open) return;
		menuRef.current
			?.querySelector<HTMLElement>('[aria-current="true"]')
			?.focus({ preventScroll: true });

		// Close on a click outside, or when Tab moves focus out of the menu.
		const root = rootRef.current;
		function onPointerDown(event: PointerEvent) {
			if (!root?.contains(event.target as Node)) setOpen(false);
		}
		function onFocusOut(event: FocusEvent) {
			if (!root?.contains(event.relatedTarget as Node | null)) setOpen(false);
		}
		document.addEventListener("pointerdown", onPointerDown);
		root?.addEventListener("focusout", onFocusOut);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			root?.removeEventListener("focusout", onFocusOut);
		};
	}, [open]);

	function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		if (event.key === "Escape") {
			setOpen(false);
			buttonRef.current?.focus();
			return;
		}
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		event.preventDefault();
		const items = [
			...(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ??
				[]),
		];
		const index = items.indexOf(document.activeElement as HTMLElement);
		const step = event.key === "ArrowDown" ? 1 : -1;
		items[(index + step + items.length) % items.length]?.focus();
	}

	return (
		<div ref={rootRef} className={cn("relative", className)}>
			<button
				ref={buttonRef}
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={menuId}
				aria-label={`Site version: ${currentId}. Switch version`}
				onClick={() => setOpen((value) => !value)}
				className={cn(
					"inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground",
					open && "border-foreground/25 text-foreground",
				)}
			>
				<Layers aria-hidden className="size-3.5" strokeWidth={1.75} />
				{currentId}
				<ChevronDown
					aria-hidden
					className={cn("size-3.5 transition-transform", open && "rotate-180")}
					strokeWidth={1.75}
				/>
			</button>

			<div
				ref={menuRef}
				id={menuId}
				role="menu"
				aria-label="Site versions"
				onKeyDown={onMenuKeyDown}
				className={cn(
					"absolute right-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] origin-top-right rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl shadow-black/10 dark:shadow-black/50 transition-[opacity,scale,visibility] duration-150",
					open
						? "visible scale-100 opacity-100"
						: "invisible scale-95 opacity-0",
				)}
			>
				<p className="px-3 pt-2 pb-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					Site versions
				</p>
				{versions.map((version) => {
					const isCurrent = version.id === currentId;
					const isLive = version.id === latestVersion.id;
					return (
						<PageLink
							key={version.id}
							page={page}
							version={isLive ? undefined : version.id}
							role="menuitem"
							aria-current={isCurrent}
							onClick={() => setOpen(false)}
							className="flex items-start gap-3 rounded-lg px-3 py-2.5 outline-none transition-colors hover:bg-foreground/[0.05] focus-visible:bg-foreground/[0.06]"
						>
							<span className="mt-px w-7 font-mono text-sm font-medium">
								{version.id}
							</span>
							<span className="min-w-0 flex-1">
								<span className="flex items-center gap-2 text-sm">
									{version.released}
									{isLive && (
										<span className="rounded-full bg-brand/15 px-1.5 py-px font-mono text-[10px] uppercase tracking-wider text-brand">
											Live
										</span>
									)}
								</span>
								<span className="mt-0.5 block text-xs text-muted-foreground">
									{version.note}
								</span>
							</span>
							{isCurrent && (
								<Check aria-hidden className="mt-0.5 size-4 text-brand" />
							)}
						</PageLink>
					);
				})}
			</div>
		</div>
	);
}
