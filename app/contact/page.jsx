import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoMail, GoPerson } from "react-icons/go";
import data from "../../data.json";
import { getSocialAccounts, getUser } from "../data";
import { Navigation } from "../components/nav";

// TODO: make it edge once Turbopack supports it.
export const runtime = "nodejs";

export default async function Contacts(props) {
	const searchParams = await props.searchParams;
	const customUsername = searchParams?.customUsername;
	const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;

	const [user, githubSocials] = await Promise.all([
		getUser(username).catch(() => ({ email: data.email })),
		getSocialAccounts(username).catch(() => []),
	]);
	const socials = Array.isArray(githubSocials) ? githubSocials : [];

	const contacts = [];
	const email = user?.email || data.email;

	if (email) {
		contacts.push({
			icon: <GoMail size={20} />,
			href: `mailto:${email}`,
			label: "Email",
			// handle: email,
		});
	}

	contacts.push({
		icon: <FaGithub size={20} />,
		href: `https://github.com/${username}`,
		label: "GitHub",
		// handle: username,
	});

	socials.forEach((social) => {
		switch (social.provider) {
			case "linkedin":
				contacts.push({
					icon: <FaLinkedin size={20} />,
					href: social.url,
					label: "LinkedIn",
					handle: social.url.split("/").filter(Boolean).pop(),
				});
				break;
			case "twitter":
				contacts.push({
					icon: <FaXTwitter size={20} />,
					href: social.url,
					label: "Twitter",
					handle: social.url.split("/").filter(Boolean).pop(),
				});
				break;
			default:
				contacts.push({
					icon: <GoPerson size={20} />,
					href: social.url,
					label: social.url.split("/")[2],
					handle: social.url.replace(/^https?:\/\//, ""),
				});
				break;
		}
	});

	// Ensure LinkedIn is always present
	if (!contacts.some((c) => c.label === "LinkedIn")) {
		contacts.push({
			icon: <FaLinkedin size={20} />,
			href: "https://linkedin.com/in/bhaveshgoel07",
			label: "LinkedIn",
			// handle: "bhaveshgoel07",
		});
	}

	return (
		<div className="pb-20">
			<Navigation />

			<div className="mx-auto max-w-7xl px-6 pt-14 sm:px-8 lg:px-10 lg:pt-24">
				<section className="rounded-[34px] border border-white/[0.1] bg-black/[0.28] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-10">
					<p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Contact</p>
					<h1 className="mt-4 max-w-3xl text-4xl font-display text-zinc-50 sm:text-5xl">
						If the work looks useful, reach out directly
					</h1>
					<p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
						I am easiest to reach through GitHub and any linked socials below. If an email is available on the profile, it is included too.
					</p>
				</section>

				<div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
					{contacts.map((contact) => (
						<Link
							key={`${contact.label}-${contact.handle}`}
							href={contact.href}
							target="_blank"
							rel="noreferrer"
							className="group rounded-[28px] border border-white/[0.1] bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-lg transition hover:-translate-y-1 hover:border-white/[0.2] hover:bg-white/[0.05]"
						>
							<div className="flex h-full flex-col">
								<span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.08] text-zinc-100">
									{contact.icon}
								</span>
								<p className="mt-8 text-xs uppercase tracking-[0.34em] text-zinc-500">
									{contact.label}
								</p>
								<p className="mt-3 break-all text-2xl font-display text-zinc-50">
									{contact.handle}
								</p>
								<p className="mt-4 text-sm text-zinc-400">
									Open {contact.label.toLowerCase()}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
