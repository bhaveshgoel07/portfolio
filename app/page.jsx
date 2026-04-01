import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import data from "../data.json";
import projects from "../data/projects.json";
import TypingRotator from "./components/typing-rotator";
import { ProjectCard } from "./components/project-card";
import ScrollReveal from "./components/scroll-reveal";
import Parallax from "./components/parallax";
import HeroEntrance from "./components/hero-entrance";
import StaggerReveal from "./components/stagger-reveal";

const capabilities = [
	{
		title: "Agentic systems",
		copy: "Workflows with clear orchestration, persistence, and delivery paths instead of one-off demos.",
		icon: "🔗",
	},
	{
		title: "Applied ML",
		copy: "Projects that use models in real product loops, from STEM animation generation to computer-vision control.",
		icon: "🧠",
	},
	{
		title: "Product-minded delivery",
		copy: "Interfaces, APIs, and operational details designed so the build can be shown, tested, and extended.",
		icon: "🚀",
	},
];

function buildHref(path, customUsername) {
	return path + (customUsername ? `?customUsername=${customUsername}` : "");
}

export default async function Home(props) {
	const searchParams = await props.searchParams;
	const customUsername = searchParams?.customUsername;
	const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;

	const featuredProjects = projects.filter((project) => project.featured);
	const allProjects = projects;

	return (
		<div className="relative overflow-x-hidden">
			{/* ─── Hero Section ─── */}
			<section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-20 pt-8 sm:px-8 lg:px-10">
				<nav className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/[0.1] bg-black/[0.25] px-5 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
					<div className="flex items-center gap-3">
						<span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.08] font-display text-base text-zinc-100">
							BG
						</span>
						<div>
							<p className="text-xs uppercase tracking-[0.34em] text-zinc-500">Portfolio</p>
							<p className="text-sm font-medium text-zinc-100">Bhavesh Goel</p>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
						<Link
							href={buildHref("/projects", customUsername)}
							className="rounded-full px-4 py-2 transition hover:bg-white/[0.08] hover:text-zinc-50"
						>
							Projects
						</Link>
						<Link
							href={buildHref("/contact", customUsername)}
							className="rounded-full px-4 py-2 transition hover:bg-white/[0.08] hover:text-zinc-50"
						>
							Contact
						</Link>
						<Link
							href={`https://github.com/${username}`}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.08] px-4 py-2 text-zinc-50 transition hover:border-white/[0.2] hover:bg-white/[0.12]"
						>
							<FaGithub className="h-4 w-4" />
							GitHub
						</Link>
					</div>
				</nav>

				<div className="flex flex-1 items-center py-16 lg:py-24">
					<HeroEntrance className="max-w-4xl">
						<p className="text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
							AI engineer / builder / product-minded developer
						</p>
						<h1 className="mt-6 text-5xl font-display leading-[0.95] text-zinc-50 sm:text-7xl lg:text-[6.5rem]">
							Bhavesh Goel
						</h1>
						<div className="mt-5">
							<TypingRotator
								items={
									data.heroRoles && data.heroRoles.length
										? data.heroRoles
										: ["Full-Stack Developer", "ML Engineer"]
								}
							/>
						</div>
						<p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
							{data.description}
						</p>

						<div className="mt-10 flex flex-wrap gap-3">
							<Link
								href={buildHref("/projects", customUsername)}
								className="group/btn inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.1] px-5 py-3 text-sm font-medium text-zinc-50 transition hover:border-white/[0.3] hover:bg-white/[0.15]"
							>
								See projects
								<GoArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
							</Link>
							<Link
								href={buildHref("/contact", customUsername)}
								className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-zinc-50"
							>
								Get in touch
							</Link>
						</div>

						{customUsername ? (
							<div className="mt-6 inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-100">
								<span>Custom profile mode: {customUsername}</span>
								<Link href="/" className="font-medium text-amber-50 underline underline-offset-4">
									Reset
								</Link>
							</div>
						) : null}

						{/* Scroll indicator */}
						<div className="mt-20 hidden lg:block">
							<div className="flex items-center gap-3 text-zinc-500">
								<div className="h-8 w-px bg-gradient-to-b from-zinc-500/60 to-transparent animate-pulse" />
								<span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
							</div>
						</div>
					</HeroEntrance>
				</div>
			</section>

			{/* ─── Focus Areas ─── */}
			<section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-10">
				<Parallax speed={0.06}>
					<ScrollReveal>
						<p className="text-xs uppercase tracking-[0.34em] text-zinc-500">What I focus on</p>
						<h2 className="mt-3 text-3xl font-display text-zinc-50 sm:text-4xl">
							Areas of depth
						</h2>
					</ScrollReveal>

					<StaggerReveal className="mt-8 grid gap-5 lg:grid-cols-3" staggerMs={120}>
						{capabilities.map((item) => (
							<div
								key={item.title}
								className="group rounded-[28px] border border-white/[0.1] bg-white/[0.03] p-6 backdrop-blur-lg transition duration-500 hover:border-white/[0.18] hover:bg-white/[0.06]"
							>
								<span className="text-2xl">{item.icon}</span>
								<h3 className="mt-4 text-xl font-display text-zinc-50">{item.title}</h3>
								<p className="mt-3 text-sm leading-7 text-zinc-400">{item.copy}</p>
							</div>
						))}
					</StaggerReveal>
				</Parallax>
			</section>

			{/* ─── Projects Showcase (previously "Proof of Work" in hero — now down here) ─── */}
			<section className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
				<Parallax speed={0.04}>
					<ScrollReveal>
						<div className="flex flex-wrap items-end justify-between gap-4">
							<div className="max-w-2xl">
								<p className="text-xs uppercase tracking-[0.34em] text-zinc-500">Selected work</p>
								<h2 className="mt-3 text-3xl font-display text-zinc-50 sm:text-4xl">
									Projects that stand on their own
								</h2>
								<p className="mt-4 text-base leading-7 text-zinc-400">
									Real builds with enough detail for a recruiter, founder, or hiring manager to actually dig into.
								</p>
							</div>
							<Link
								href={buildHref("/projects", customUsername)}
								className="group/link inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-4 py-2 text-sm text-zinc-300 transition hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-zinc-50"
							>
								All projects
								<GoArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
							</Link>
						</div>
					</ScrollReveal>
				</Parallax>
			</section>

			{/* Featured projects */}
			<section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
				<StaggerReveal className="grid gap-5 xl:grid-cols-2" staggerMs={150}>
					{featuredProjects.map((project) => (
						<ProjectCard key={project.slug} project={project} />
					))}
				</StaggerReveal>
			</section>

			{/* Other projects — compact cards */}
			{allProjects.filter((p) => !p.featured).length > 0 && (
				<section className="mx-auto max-w-7xl px-6 pb-28 sm:px-8 lg:px-10">
					<ScrollReveal>
						<p className="text-xs uppercase tracking-[0.34em] text-zinc-500">More work</p>
						<h2 className="mt-3 text-2xl font-display text-zinc-50 sm:text-3xl">
							Supporting builds
						</h2>
					</ScrollReveal>

					<StaggerReveal className="mt-6 grid gap-5 lg:grid-cols-2" staggerMs={120}>
						{allProjects.filter((p) => !p.featured).map((project) => (
							<ProjectCard key={project.slug} project={project} />
						))}
					</StaggerReveal>
				</section>
			)}

			{/* ─── Footer ─── */}
			<footer className="border-t border-white/[0.06]">
				<div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 sm:px-8 lg:px-10">
					<p className="text-sm text-zinc-500">
						Built by Bhavesh Goel
					</p>
					<div className="flex items-center gap-4">
						<Link
							href={`https://github.com/${username}`}
							target="_blank"
							rel="noreferrer"
							className="text-zinc-500 transition hover:text-zinc-300"
						>
							<FaGithub className="h-5 w-5" />
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
