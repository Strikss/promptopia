"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getSession, getProviders } from "next-auth/react";

const Nav = () => {
	const isLoggedIn = true;
	const [providers, setProviders] = useState(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		(async () => {
			const response = await getProviders();
			setProviders(response);
		})();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex items-center gap-2">
				<Image src="/assets/images/logo.svg" width={30} height={30} alt="logo" />
				<p className="logo_text">Promptopia</p>
			</Link>
			{/*Desktop navigation*/}
			<div className="sm:flex sm:gap-3 md:gap-5 hidden">
				{isLoggedIn ? (
					<>
						<Link className="black_btn" href={"/create-prompt"}>
							Create Post
						</Link>
						<button type="button" onClick={signOut} className="outline_btn">
							Sign Out
						</button>
						<Link href={"/profile"}>
							<Image
								src={"/assets/images/logo.svg"}
								width={37}
								height={37}
								className="rounded-full"
								alt="profile"
							/>
						</Link>
					</>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									key={provider.name}
									type="button"
									className="btn-black"
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
			{/*Mobile navigation*/}
			<div className="flex sm:hidden relative">
				{isLoggedIn ? (
					<>
						<Image
							src={"/assets/icons/menu.svg"}
							width={37}
							height={37}
							className="rounded-full"
							alt="menu"
							onClick={() => {
								setOpen((prev) => !prev);
							}}
						/>
						{open && (
							<div className="dropdown">
								<Link href="/profile" className="dropdown_link">
									My Profile
								</Link>
								<Link href="/create-prompt" className="dropdown_link">
									Create Post
								</Link>
								<button
									onClick={() => {
										setOpen(false);
										signOut();
									}}
									className="mt-3 w-full black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									key={provider.name}
									type="button"
									className="btn-black"
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
