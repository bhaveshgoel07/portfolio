import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";
import data from "../data.json";
import LoadingIndicator from "./components/loading-indicator";
import TypingRotator from "./components/typing-rotator";

const navigation = [
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
];

export default async function Home(props) {
    const searchParams = await props.searchParams;

    return (
		<LandingComponent searchParams={searchParams} />
	)
}



const TryYourself = ({ customUsername }) => {

	const href = customUsername ? '/' : '/search';

	return <Link
		href={href}
		className="text-lg duration-500 text-zinc-500 hover:text-zinc-300 border-dashed p-2 rounded-sm border-2 border-zinc-500 hover:border-zinc-300"
	>
		{
			customUsername ? 'Showing: ' + customUsername + ', click to cancel ❌' : 'Try yourself'
		}
	</Link>;
};

const LandingComponent = async ({ searchParams: { customUsername } }) => {

	const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;

	return (
		<div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-y-auto">
			<nav className="my-16 animate-fade-in">
				<ul className="flex items-center justify-center gap-4">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href + (customUsername ? `?customUsername=${customUsername}` : '')}
							className="text-lg duration-500 text-zinc-500 hover:text-zinc-300"
						>
							<span className="inline-flex items-center">
								{item.name} <LoadingIndicator />
							</span>
						</Link>
					))}
					<TryYourself customUsername={customUsername} />
				</ul>
			</nav>
			{/* Decorative glow removed to keep background clean */}

			<h1 className="flex items-center z-10 text-4xl hover:scale-110 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text bg-white p-5">
				Bhavesh Goel
				{/* <Suspense fallback={<p>Loading...</p>}>
					<Image alt='👨‍💻' width={100} height={100} src={data.avatarUrl} className="float-right rounded-full mx-4" />
				</Suspense> */}
			</h1>

			{/* Rotating roles under the name */}
			<div className="z-10 -mt-6">
				<TypingRotator items={(data.heroRoles && data.heroRoles.length ? data.heroRoles : ["Full‑Stack Developer", "Data Scientist"])}/>
			</div>

			{/* Decorative glow removed to keep background clean */}
			<div className="my-16 text-center animate-fade-in">
				<h2 className="text-lg text-zinc-500">
					<p>{data.description}</p>
				</h2>
			</div>

		</div>
	);
}
