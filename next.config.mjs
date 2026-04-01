import { readFileSync } from "fs";

const dataJson = JSON.parse(readFileSync("./data.json", "utf-8"));
const fallbackUsername = dataJson.githubUsername || "bhaveshgoel07";

async function resolveGitHubUsername() {
	if (!process.env.GH_TOKEN) {
		return process.env.GITHUB_USERNAME || fallbackUsername;
	}

	try {
		const response = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `token ${process.env.GH_TOKEN}`,
			},
			next: {
				tags: ["github", "github-username"],
			},
		});

		if (!response.ok) {
			return process.env.GITHUB_USERNAME || fallbackUsername;
		}

		const payload = await response.json();
		return payload.login || process.env.GITHUB_USERNAME || fallbackUsername;
	} catch {
		return process.env.GITHUB_USERNAME || fallbackUsername;
	}
}

const githubUsername = await resolveGitHubUsername();

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		// Caching all page.jsx files on the client for 5 minutes.
		// Resulting in immediate navigation and no loading time.
		staleTimes: {
			dynamic: 300,
			static: 300,
		},
	},
	env: {
		GITHUB_USERNAME: githubUsername,
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "**.githubusercontent.com" },
			{ protocol: "https", hostname: "**.github.com" },
		],
	},
};

export default nextConfig;
