import { useState } from "react";

export default () => {
	const [year] = useState(new Date().getFullYear());

	return (
		<footer className="bg-white dark:bg-gray-900 backdrop-blur-md border-t-2 border-blue-800 dark:border-white">
			<div className="container mx-auto flex flex-col items-center justify-center p-4 text-center">
				<p className="text-blue-800 dark:text-white">
					© 2025 Scavenger Hunt. All rights reserved.
				</p>
				<div className="mt-2 flex gap-3">
					<a
						href="/privacy"
						className="px-4 py-2 rounded-full border-2 border-blue-800 text-blue-800 bg-white dark:border-white dark:text-white dark:bg-gray-900 hover:border-yellow-400 hover:text-yellow-400 transition-colors duration-200"
					>
						Privacy Policy
					</a>
					<a
						href="/terms"
						className="px-4 py-2 rounded-full border-2 border-blue-800 text-blue-800 bg-white dark:border-white dark:text-white dark:bg-gray-900 hover:border-yellow-400 hover:text-yellow-400 transition-colors duration-200"
					>
						Terms of Service
					</a>
				</div>
			</div>
		</footer>
	);
};
