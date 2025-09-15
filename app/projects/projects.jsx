import { Card } from "../components/card";
// import { UserTimeline } from "../components/timeline";
import { Article } from "./article";
import localProjects from "../../data/projects.json";
import chunk from 'lodash/chunk';

export default async function ProjectsComponent({ username }) {

	const repos = localProjects.map((p) => ({
		name: p.name,
		description: p.description,
		homepage: p.homepage || '',
		html_url: p.repo || '',
		created_at: p.created_at || new Date().toISOString(),
		stargazers_count: typeof p.stars === 'number' ? p.stars : 0,
		owner: { login: 'local' },
		image: p.image || null,
	}));

	const heroes = repos.filter((_, i) => localProjects[i]?.featured);
	const sorted = repos.filter((_, i) => !localProjects[i]?.featured);
	const chunkSize = Math.max(1, Math.ceil(sorted.length / 3));

	return (
		<>
			{heroes.length ? <>
				<div className="w-full h-px bg-zinc-800" />
				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
					<div className="grid grid-cols-1 gap-4">
						{[heroes[0], heroes[2]].map((project, idx) => (
							!project ? null : (
								<Card key={(project.name || 'hero') + idx}>
									<Article project={project} />
								</Card>
							)
						))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{[heroes[1], heroes[3]].map((project, idx) => (
							!project ? null : (
								<Card key={(project.name || 'hero') + idx}>
									<Article project={project} />
								</Card>
							)
						))}
					</div>
				</div>
				<div className="hidden w-full h-px md:block bg-zinc-800" />
			</> : null}

			<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
				<div className="grid grid-cols-1 gap-4">
					{chunk(sorted, chunkSize)[0]?.map((project) => (
						<Card key={project.name}>
							<Article project={project} />
						</Card>
					))}
				</div>
				<div className="grid grid-cols-1 gap-4">
					{chunk(sorted, chunkSize)[1]?.map((project) => (
						<Card key={project.name}>
							<Article project={project} />
						</Card>
					))}
				</div>
				<div className="grid grid-cols-1 gap-4">
					{chunk(sorted, chunkSize)[2]?.map((project) => (
						<Card key={project.name}>
							<Article project={project} />
						</Card>
					))}
				</div>
			</div>
		</>
	);
}