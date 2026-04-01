import { Suspense } from "react";
import projects from "../../data/projects.json";
import data from "../../data.json";
import { Navigation } from "../components/nav";
import ProjectsComponent from "./projects";

export default async function ProjectsPage(props) {
	const searchParams = await props.searchParams;
	const customUsername = searchParams?.customUsername;

	return (
		<div className="pb-20">
			<Navigation />

			<div className="mx-auto max-w-7xl px-6 pt-14 sm:px-8 md:pt-20 lg:px-10 lg:pt-24">
				<section className="rounded-[34px] border border-white/[0.1] bg-black/[0.28] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-10">
					<p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Projects</p>
					<h1 className="mt-4 max-w-3xl text-4xl font-display text-zinc-50 sm:text-5xl">
						All builds
					</h1>
					<p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">
						{customUsername
							? `${customUsername}'s project view is active, but this section is pinned to my selected work.`
							: data.description}
					</p>
				</section>

				<div className="mt-12">
					<Suspense fallback={<div className="text-lg text-zinc-500">Loading projects...</div>}>
						<ProjectsComponent />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
