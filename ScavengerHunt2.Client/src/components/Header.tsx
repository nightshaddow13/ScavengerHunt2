import { NavLink, Link } from "react-router-dom";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/useAuth";

export default () => {
	const { auth, signout } = useAuth();

	// NavLink styling using Tailwind defaults
	const navClass = ({ isActive }: any) =>
		[
			"px-4 py-2 rounded-full border-2 transition-colors duration-200",
			"hover:border-yellow-400 hover:text-yellow-400 dark:hover:text-yellow-400",
			isActive
				? "bg-blue-800 text-white dark:bg-blue-800 dark:text-white"
				: "border-blue-800 text-blue-800 dark:border-white dark:text-white",
		].join(" ");

	// Reusable pill-style button using Tailwind defaults
	const pillButtonClass =
		"px-4 py-2 rounded-full border-2 border-blue-800 text-blue-800 bg-white dark:border-white dark:text-white dark:bg-gray-900 hover:border-yellow-400 hover:text-yellow-400 transition-colors duration-200 flex items-center justify-center";

	return (
		<header className="sticky top-0 bg-white dark:bg-gray-900 backdrop-blur-md z-10 border-b-2 border-blue-800 dark:border-white">
			<div className="container mx-auto flex justify-between items-center p-4">
				{/* Logo */}
				<div className="flex items-center gap-3 font-bold text-blue-800 dark:text-white">
					<div className="w-10 h-10 grid place-items-center rounded-full bg-blue-800 text-white font-black">
						⛺
					</div>
					Scavenger Hunt
				</div>

				{/* Nav */}
				<nav className="flex items-center gap-3">
					<NavLink
						to="#how"
						className={navClass}
					>
						How it works
					</NavLink>
					<NavLink
						to="#leaderboard"
						className={navClass}
					>
						Leaderboard
					</NavLink>

					{/* Auth / Profile */}
					{auth ? (
						<div className="flex items-center gap-3">
							<Link
								to="/profile"
								className={`${pillButtonClass} lg:p-2 lg:rounded-md`}
							>
								<img
									className="h-8 w-8 rounded-full mr-2"
									src={auth.profileUrl}
									alt=""
								/>
								{auth.userName}
							</Link>
							<Button
								className={pillButtonClass}
								onClick={() => signout()}
							>
								Sign Out
							</Button>
						</div>
					) : (
						<Button
							className={pillButtonClass}
							asChild
						>
							<Link to="/signin">Sign In</Link>
						</Button>
					)}

					{/* Dark mode */}
					<DarkModeToggle />
				</nav>
			</div>
		</header>
	);
};
