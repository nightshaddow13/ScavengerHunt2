import { useEffect, useState } from "react";
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
	const [year] = useState(new Date().getFullYear());
	const [qrResult, setQrResult] = useState("");

	useEffect(() => {
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

		const html5QrcodeScanner = new Html5QrcodeScanner(
			"qr-reader",
			{ fps: 10, qrbox: 250 },
			false
		);
		html5QrcodeScanner.render(onScanSuccess, onScanFailure);
	}, []);

	return (
		<Layout title="Cub Scout QR Adventure">
			<div className="bg-[#f4f1e8] text-[#2c2c1c] min-h-screen font-sans">
				<header className="sticky top-0 bg-[rgba(244,241,232,0.9)] backdrop-blur-md z-10 border-b-2 border-[#2c5e1a]">
					<div className="container mx-auto flex justify-between items-center p-4">
						<div className="flex items-center gap-3 font-bold text-[#2c5e1a]">
							<div className="w-10 h-10 grid place-items-center rounded-full bg-[#e67e22] text-white font-black">
								⛺
							</div>
							Cub Scout QR Adventure
						</div>
						<nav className="flex items-center gap-3">
							<a
								href="#how"
								className="px-4 py-2 border-2 border-[#2c5e1a] text-[#2c5e1a] rounded-full"
							>
								How it works
							</a>
							<a
								href="#leaderboard"
								className="px-4 py-2 bg-[#2c5e1a] text-white rounded-full"
							>
								Leaderboard
							</a>
						</nav>
					</div>
				</header>

				<main className="container mx-auto p-4">
					<section className="grid gap-6 text-center py-10">
						<div>
							<h1 className="text-3xl text-[#2c5e1a] font-bold mb-2">
								Begin Your Adventure
							</h1>
							<p className="text-[#5c5c4c] max-w-2xl mx-auto">
								Scan QR caches hidden around camp and earn points for your Den
								or Pack. Collect badges as you explore and see how your unit
								stacks up!
							</p>
							<button className="mt-4 px-4 py-2 bg-[#2c5e1a] text-white rounded-lg font-bold">
								🎯 Start Playing
							</button>
						</div>
						<div
							id="qr-reader"
							className="mx-auto max-w-xs border-4 border-[#2c5e1a] rounded-xl"
						></div>
						<div className="mt-2 font-bold text-[#e67e22]">{qrResult}</div>
					</section>

					<section
						id="leaderboard"
						className="py-10"
					>
						<h2 className="text-2xl text-[#2c5e1a] font-bold mb-2">
							Leaderboard
						</h2>
						<p className="text-[#5c5c4c] mb-6">
							See which Scouts, Units, Dens, and Packs are leading the
							adventure.
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

					<section
						id="how"
						className="py-10"
					>
						<h2 className="text-2xl text-[#2c5e1a] font-bold mb-2">
							How to Play
						</h2>
						<p className="text-[#5c5c4c] mb-6">
							Find QR codes around camp, scan them, and earn points. Each scan
							goes toward your total and your unit's score!
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-4 bg-[#fffaf0] border-2 border-[#2c5e1a] rounded-lg shadow">
								🗺️ Find a cache hidden at camp
							</div>
							<div className="p-4 bg-[#fffaf0] border-2 border-[#2c5e1a] rounded-lg shadow">
								📱 Scan the QR code to log your find
							</div>
							<div className="p-4 bg-[#fffaf0] border-2 border-[#2c5e1a] rounded-lg shadow">
								🏆 Earn points & badges
							</div>
							<div className="p-4 bg-[#fffaf0] border-2 border-[#2c5e1a] rounded-lg shadow">
								👥 Compete with your Den and Pack
							</div>
						</div>
					</section>
				</main>

				<footer className="py-10 text-center text-[#5c5c4c] text-sm">
					© {year} Cub Scout QR Adventure • Built for Scouting Fun
				</footer>
			</div>
		</Layout>
	);
}

function LeaderboardCard({ title, items }: LeaderboardCardProps) {
	return (
		<div className="p-4 bg-[#fffaf0] border-2 border-[#2c5e1a] rounded-lg shadow">
			<h3 className="text-xl text-[#2c5e1a] font-bold mb-2">{title}</h3>
			{items.map((item, idx) => (
				<div
					key={idx}
					className="flex items-center justify-between p-2 bg-white border border-[#2c5e1a] rounded-lg mb-2"
				>
					<div className="flex items-center gap-2">
						{item.avatar && (
							<div className="w-9 h-9 grid place-items-center rounded-full bg-[#e67e22] text-white font-black">
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
