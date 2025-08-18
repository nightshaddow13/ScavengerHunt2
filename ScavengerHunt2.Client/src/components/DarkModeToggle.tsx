import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export default function DarkModeToggle() {
	const { setTheme } = useTheme();

	const pillButtonClass =
		"px-4 py-2 rounded-full border-2 border-blue-800 text-blue-800 bg-white dark:border-white dark:text-white dark:bg-gray-900 hover:border-yellow-400 hover:text-yellow-400 transition-colors duration-200 flex items-center justify-center relative";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className={pillButtonClass}
					aria-label="Toggle theme"
				>
					<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
