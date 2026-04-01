import projects from "../../data/projects.json";
import { ProjectCard } from "../components/project-card";

export default function ProjectsComponent() {
	const featuredProjects = projects.filter((project) => project.featured);
	const otherProjects = projects.filter((project) => !project.featured);

	return (
		<div className="space-y-12">
			{featuredProjects.length ? (
				<section className="space-y-5">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-xs uppercase tracking-[0.34em] text-zinc-500">Featured</p>
							<h2 className="mt-3 text-2xl font-display text-zinc-50 sm:text-3xl">
								Highlighted projects
							</h2>
						</div>
					</div>

					<div className="grid gap-5 xl:grid-cols-2">
						{featuredProjects.map((project) => (
							<ProjectCard key={project.slug} project={project} />
						))}
					</div>
				</section>
			) : null}

			{otherProjects.length ? (
				<section className="space-y-5">
					<div>
						<p className="text-xs uppercase tracking-[0.34em] text-zinc-500">More work</p>
						<h2 className="mt-3 text-2xl font-display text-zinc-50 sm:text-3xl">
							Supporting builds
						</h2>
					</div>

					<div className="grid gap-5 lg:grid-cols-2">
						{otherProjects.map((project) => (
							<ProjectCard key={project.slug} project={project} />
						))}
					</div>
				</section>
			) : null}
		</div>
	);
}
