import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Layout from "@/components/Layout";

interface LeaderboardItem {
	avatar?: string | number;
	name: string;
	points: number;
}

interface LeaderboardCardProps {
	title: string;
	items: LeaderboardItem[];
}

export default function QrCacheGame() {
	const [qrResult, setQrResult] = useState("");
	const [scannerStarted, setScannerStarted] = useState(false);
	const scannerRef = useRef<Html5QrcodeScanner | null>(null);
	const hasInitialized = useRef(false);
	const scannerContainerId = "qr-reader";

	// Pill button class matching header/footer
	const pillButtonClass =
		"px-4 py-2 rounded-full border-2 border-blue-800 text-blue-800 bg-white dark:border-white dark:text-white dark:bg-gray-900 hover:border-yellow-400 hover:text-yellow-400 transition-colors duration-200 flex items-center justify-center";

	useEffect(() => {
		if (!scannerStarted || hasInitialized.current) return;

		hasInitialized.current = true;

		const scouterId = "demo-scouter-id";
		const apiBase = "/api/caches";

		const onScanSuccess = (decodedText: string) => {
			setQrResult(`Scanned: ${decodedText}`);
			const qrCodeId = decodedText;
			navigator.geolocation.getCurrentPosition((pos) => {
				fetch(`${apiBase}/find`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						qrCodeId,
						scouterId,
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude,
					}),
				})
					.then((res) => res.json())
					.then((data) =>
						alert(`🎉 You found ${data.name}! +${data.basePoints} pts`)
					)
					.catch((err) => console.error(err));
			});
		};

		const onScanFailure = (error: any) => {
			console.warn(`QR Scan Error: ${error}`);
		};

		if (document.getElementById(scannerContainerId)) {
			scannerRef.current = new Html5QrcodeScanner(
				scannerContainerId,
				{ fps: 10, qrbox: 250 },
				false
			);
			scannerRef.current.render(onScanSuccess, onScanFailure);
		}

		return () => {
			if (scannerRef.current) {
				scannerRef.current.clear().catch(console.error);
				scannerRef.current = null;
			}
		};
	}, [scannerStarted]);

	return (
		<Layout title="Cub Scout QR Adventure">
			<main className="container mx-auto p-4">
				{/* Hero / QR Section */}
				<section className="grid gap-6 text-center py-10">
					<h1 className="text-3xl font-bold text-blue-800 dark:text-white mb-2">
						Begin Your Adventure
					</h1>
					<p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-4">
						Scan QR caches hidden around camp and earn points for your Den or
						Pack.
					</p>

					<button
						className={pillButtonClass + " mx-auto mb-4"}
						onClick={() => setScannerStarted(true)}
						disabled={scannerStarted}
					>
						🎯 Start Playing
					</button>

					<div
						id={scannerContainerId}
						className="mx-auto max-w-xs border-4 border-blue-800 dark:border-white rounded-xl"
					></div>

					{qrResult && (
						<div className="mt-2 font-bold text-yellow-400 dark:text-yellow-400">
							{qrResult}
						</div>
					)}
				</section>

				{/* Leaderboard Section */}
				<section
					id="leaderboard"
					className="py-10 text-center"
				>
					<h2 className="text-2xl font-bold text-blue-800 dark:text-white mb-2">
						Leaderboard
					</h2>
					<p className="text-gray-700 dark:text-gray-300 mb-6">
						See which Scouts, Units, Dens, and Packs are leading the adventure.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<LeaderboardCard
							title="Top Scouts"
							items={[
								{ name: "Aiden W.", points: 120, avatar: "1" },
								{ name: "Ella T.", points: 110, avatar: "2" },
								{ name: "Jacob M.", points: 100, avatar: "3" },
							]}
						/>
						<LeaderboardCard
							title="Top Units"
							items={[
								{ name: "Pack 541", points: 520, avatar: "P" },
								{ name: "Pack 212", points: 410, avatar: "P" },
								{ name: "Pack 118", points: 390, avatar: "P" },
							]}
						/>
						<LeaderboardCard
							title="Top Dens"
							items={[
								{ name: "Wolf Den 1", points: 210 },
								{ name: "Bear Den 1", points: 190 },
								{ name: "Tiger Den 2", points: 180 },
							]}
						/>
						<LeaderboardCard
							title="Top Packs"
							items={[
								{ name: "Pack 541", points: 520 },
								{ name: "Pack 212", points: 410 },
								{ name: "Pack 118", points: 390 },
							]}
						/>
					</div>
				</section>

				{/* How to Play Section */}
				<section
					id="how"
					className="py-10 text-center"
				>
					<h2 className="text-2xl font-bold text-blue-800 dark:text-white mb-2">
						How to Play
					</h2>
					<p className="text-gray-700 dark:text-gray-300 mb-6">
						Find QR codes around camp, scan them, and earn points. Each scan
						goes toward your total and your unit's score!
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{[
							"🗺️ Find a cache hidden at camp",
							"📱 Scan the QR code to log your find",
							"🏆 Earn points",
							"👥 Compete with your Den and Pack",
						].map((text, idx) => (
							<div
								key={idx}
								className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-800 dark:border-white rounded-lg shadow text-blue-800 dark:text-white font-semibold"
							>
								{text}
							</div>
						))}
					</div>
				</section>
			</main>
		</Layout>
	);
}

function LeaderboardCard({ title, items }: LeaderboardCardProps) {
	return (
		<div className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-800 dark:border-white rounded-lg shadow">
			<h3 className="text-xl font-bold text-blue-800 dark:text-white mb-2">
				{title}
			</h3>
			{items.map((item, idx) => (
				<div
					key={idx}
					className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 border border-blue-800 dark:border-white rounded-lg mb-2"
				>
					<div className="flex items-center gap-2">
						{item.avatar && (
							<div className="w-9 h-9 grid place-items-center rounded-full bg-yellow-400 text-white font-black">
								{item.avatar}
							</div>
						)}
						<strong>{item.name}</strong>
					</div>
					<div>{item.points} pts</div>
				</div>
			))}
		</div>
	);
}
