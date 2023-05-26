"use client";

import { Dialog } from "@headlessui/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
	href: string;
	text: string;
};

function NavItem({ href, text }: Props) {
	const router = useRouter();
	const [isActive, setIsActive] = useState(false);
	const pathname = usePathname();
	useEffect(() => {
		setIsActive(pathname === href);
	}, [pathname, href]);

	return (
		<Link href={href} passHref>
			<span
				className={`${
					isActive
						? "font-bold text-red-500 dark:text-red-500"
						: "font-normal text-black dark:text-black"
				} 'hidden md:inline-block rounded-full hover:text-gray-900 dark:hover:text-gray-200 transition-all`}
			>
				{text}
			</span>
		</Link>
	);
}

export function NavMenu({}) {
	const [mounted, setMounted] = useState(false);
	let [isOpen, setIsOpen] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	// A flag to know when the page has mounted so the theme can be accessed
	useEffect(() => setMounted(true), []);

	return (
		<div className="fixed z-50 w-full text-gray-900 bg-white bg-opacity-50 dark:bg-dark dark:text-gray-100 backdrop-filter backdrop-blur-lg dark:bg-opacity-50`">
			<div className="flex items-center justify-between max-w-6xl px-4 py-3 mx-auto sm:px-6 md:space-x-10 m-5">
				<div className="flex justify-start lg:w-0 lg:flex-1">
					<span className="sr-only">Profile Picture</span>
					<Link href="/" passHref>
						<span className="block">
							<Image
								alt="German Polymers"
								height={38}
								width={38}
								src="/logo.svg"
								className="rounded-full"
							/>
						</span>
					</Link>
				</div>
				<div
					className="-my-2 -mr-2 md:hidden"
					onClick={() => setIsOpen(true)}
				>
					<div className="bg-gray-200 dark:bg-midnight text-gray-600 dark:text-gray-300 rounded-full p-3.5 inline-flex items-center justify-center hover:text-gray-700 hover:bg-gray-300 cursor-pointer focus:outline-none general-ring-state">
						<span className="sr-only">Open menu</span>
						<svg
							width="24"
							height="24"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								d="M4.75 5.75H19.25"
							></path>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								d="M4.75 18.25H19.25"
							></path>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								d="M4.75 12H19.25"
							></path>
						</svg>
					</div>
				</div>
				<nav className="hidden space-x-8 text-lg md:flex">
					<NavItem href="/" text="Home" />
					<NavItem href="/about" text="About" />
					<NavItem href="/products" text="Products" />
					<NavItem href="/contact" text="Contact" />
				</nav>

				<div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
					{/* Placeholder */}
					<nav className="hidden space-x-8 text-lg md:flex">
						<NavItem href="/german-solar" text="German Solar" />
					</nav>
				</div>
			</div>

			{/* Conditional rendering here to ensure that dialog portal isn't removed on route change. */}
			{isOpen && (
				<Dialog
					open={isOpen}
					onClose={() => setIsOpen(false)}
					className="fixed inset-0 z-50 md:hidden"
				>
					<Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-gray-900/80" />

					<div className="fixed w-full max-w-xs p-6 text-base font-semibold text-gray-900 bg-white shadow-lg rounded-3xl top-4 right-4 dark:bg-gray-800 dark:text-gray-400 dark:highlight-white/5">
						<button
							onClick={() => setIsOpen(false)}
							className="absolute flex items-center justify-center w-8 h-8 text-gray-500 top-5 right-5 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
						>
							<span className="sr-only">Close navigation</span>
							<svg
								viewBox="0 0 10 10"
								className="w-2.5 h-2.5 overflow-visible"
								aria-hidden="true"
							>
								<path
									d="M0 0L10 10M10 0L0 10"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								></path>
							</svg>
						</button>
						<ul className="space-y-6">
							<li>
								<Link href="/" passHref>
									<span className="hover:text-teal-400 dark:hover:text-teal-500">
										Home
									</span>
								</Link>
							</li>
							<li>
								<Link href="/about" passHref>
									<span className="hover:text-teal-400 dark:hover:text-teal-500">
										About
									</span>
								</Link>
							</li>
							<li>
								<Link href="/projects" passHref>
									<span className="hover:text-teal-400 dark:hover:text-teal-500">
										Projects
									</span>
								</Link>
							</li>
							<li>
								<Link href="/blog" passHref>
									<span className="hover:text-teal-400 dark:hover:text-teal-500">
										Blog
									</span>
								</Link>
							</li>
							<li>
								<Link href="/community-wall" passHref>
									<span className="hover:text-teal-400 dark:hover:text-teal-500">
										Community wall
									</span>
								</Link>
							</li>
						</ul>
					</div>
				</Dialog>
			)}
		</div>
	);
}
