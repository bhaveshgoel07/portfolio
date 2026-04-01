import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { GoArrowUpRight, GoLink } from "react-icons/go";

const monthFormatter = new Intl.DateTimeFormat("en", {
	month: "short",
	year: "numeric",
});

function formatUpdated(value) {
	if (!value) return "In progress";

	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) {
		return value;
	}

	return monthFormatter.format(parsed);
}

export function ProjectCard({ project }) {
	const accent = project.accent || {};
	const shellStyle = {
		backgroundImage: `radial-gradient(circle at top right, ${accent.glow || "rgba(255,255,255,0.12)"}, transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))`,
	};
	const bannerStyle = {
		background: `linear-gradient(135deg, ${accent.from || "#f59e0b"}, ${accent.to || "#fb7185"})`,
	};
	const bulletStyle = {
		background: accent.from || "#f59e0b",
	};

	// Determine the primary link (prefer homepage, fallback to repo)
	const primaryLink = project.homepage || project.repo;

	return (
		<article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.1] bg-black/[0.35] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl transition duration-500 hover:-translate-y-1.5 hover:border-white/[0.2] hover:bg-black/[0.4] md:p-8">
			<div className="absolute inset-0 opacity-90" style={shellStyle} />
			<div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

			<div className="relative flex h-full flex-col">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="flex flex-wrap items-center gap-2">
						<span className="rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-300">
							{project.category}
						</span>
						{project.featured ? (
							<span className="rounded-full border border-white/[0.15] bg-white/[0.1] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-100">
								Featured
							</span>
						) : null}
					</div>

					<span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
						Updated {formatUpdated(project.updated)}
					</span>
				</div>

				<div className="relative mt-6 overflow-hidden rounded-[24px] border border-white/[0.1] p-5" style={bannerStyle}>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.36),transparent_40%)]" />

					<div className="relative flex items-start justify-between gap-4">
						<div className="max-w-xl">
							<p className="text-xs font-medium uppercase tracking-[0.3em] text-black/[0.65]">
								{project.status}
							</p>
							<h3 className="mt-3 text-3xl font-display text-zinc-950 sm:text-4xl">
								{project.name}
							</h3>
						</div>

						{primaryLink ? (
							<Link
								href={primaryLink}
								target="_blank"
								rel="noreferrer"
								aria-label={`Open ${project.name}`}
								className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.15] bg-black/[0.1] text-zinc-950 transition hover:bg-black/[0.2] hover:scale-110"
							>
								<GoArrowUpRight className="h-5 w-5" />
							</Link>
						) : null}
					</div>

					<p className="relative mt-4 max-w-2xl text-sm leading-6 text-zinc-950/[0.78]">
						{project.tagline}
					</p>
				</div>

				<p className="mt-6 text-sm leading-7 text-zinc-300">
					{project.description}
				</p>

				<ul className="mt-6 space-y-3">
					{project.proof.map((item) => (
						<li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-200">
							<span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" style={bulletStyle} />
							<span>{item}</span>
						</li>
					))}
				</ul>

				<div className="mt-6 flex flex-wrap gap-2">
					{project.stack.map((item) => (
						<span
							key={item}
							className="rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-1 text-xs text-zinc-300 transition duration-300 hover:bg-white/[0.12] hover:text-zinc-100"
						>
							{item}
						</span>
					))}
				</div>

				{/* Simplified links — no more separate "Open demo" / "View source" categories */}
				<div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
					{project.homepage ? (
						<Link
							href={project.homepage}
							target="_blank"
							rel="noreferrer"
							className="group/link inline-flex items-center gap-2 text-sm font-medium text-zinc-200 transition hover:text-zinc-50"
						>
							<GoLink className="h-4 w-4 text-zinc-400 transition group-hover/link:text-zinc-200" />
							Live project
							<GoArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition group-hover/link:opacity-100 group-hover/link:translate-x-0" />
						</Link>
					) : null}

					{project.repo ? (
						<Link
							href={project.repo}
							target="_blank"
							rel="noreferrer"
							className="group/link inline-flex items-center gap-2 text-sm font-medium text-zinc-200 transition hover:text-zinc-50"
						>
							<FaGithub className="h-4 w-4 text-zinc-400 transition group-hover/link:text-zinc-200" />
							Source code
							<GoArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition group-hover/link:opacity-100 group-hover/link:translate-x-0" />
						</Link>
					) : !project.homepage ? (
						<span className="inline-flex items-center gap-2 text-sm text-zinc-500">
							<FaGithub className="h-4 w-4" />
							Repo coming soon
						</span>
					) : null}
				</div>
			</div>
		</article>
	);
}
