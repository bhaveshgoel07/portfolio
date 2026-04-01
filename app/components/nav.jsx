"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";

const items = [
	{ label: "Projects", href: "/projects" },
	{ label: "Contact", href: "/contact" },
];

export const Navigation = () => {
	const ref = useRef(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const searchParams = useSearchParams();
	const customUsername = searchParams.get("customUsername");

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting);
		});

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref} className="sticky top-0 z-50 px-6 pt-4 sm:px-8 lg:px-10">
			<div
				className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-5 py-3 transition duration-300 ${
					isIntersecting
						? "border-white/[0.08] bg-black/[0.25] backdrop-blur-lg"
						: "border-white/[0.12] bg-black/[0.55] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
				}`}
			>
				<Link
					href={"/" + (customUsername ? `?customUsername=${customUsername}` : "")}
					className="inline-flex items-center gap-3 text-sm font-medium text-zinc-100"
				>
					<span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.08] font-display text-base">
						BG
					</span>
					<div className="hidden sm:block">
						<p className="text-xs uppercase tracking-[0.34em] text-zinc-500">Portfolio</p>
						<p className="text-sm font-medium text-zinc-100">Bhavesh Goel</p>
					</div>
				</Link>

				<div className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
					{items.map((item) => (
						<Link
							key={item.href}
							href={item.href + (customUsername ? `?customUsername=${customUsername}` : "")}
							className="rounded-full px-4 py-2 transition hover:bg-white/[0.08] hover:text-zinc-50"
						>
							{item.label}
						</Link>
					))}
					<Link
						href="https://github.com/bhaveshgoel07"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.08] px-4 py-2 text-zinc-50 transition hover:border-white/[0.2] hover:bg-white/[0.12]"
					>
						<FaGithub className="h-4 w-4" />
						GitHub
					</Link>
				</div>
			</div>
		</header>
	);
};
