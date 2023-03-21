import { getServerSession } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "@/ui/Button";
import { SignInButton, SignOutButton, ThemeToggle } from "@/components";
import authOptions from "@/lib/auth";



const Navbar = async () => {
	const session = await getServerSession(authOptions);

	return (
		<nav className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
			<div className="container max-w-7xl mx-auto w-full flex items-center justify-between">
				<Link href="/" className={buttonVariants({ variant: "link" })}>
					Text Similarity 1.1
				</Link>

				{/* Mobile view theme toggle */}
				<div className="md:hidden">
					<ThemeToggle />
				</div>

				{/* Big devices theme toggle */}
				<div className="md:flex hidden gap-4">
					<ThemeToggle />
					<Link
						href="/documentation"
						className={buttonVariants({ variant: "ghost" })}
					>
						Documentation
					</Link>
					{session ? (
						<>
							<Link
								className={buttonVariants({ variant: "ghost" })}
								href="/dashboard"
							>
								Dashboard
							</Link>
							<SignOutButton />
						</>
					) : (
						<SignInButton />
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
