import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

type Props = {
	title?: string;
	children: React.ReactNode;
};

const Layout = ({ title, children }: Props) => {
	return (
		<>
			{!title ? null : <title>{title}</title>}
			<Meta />
			<div className="flex flex-col min-h-screen">
				<Header />
				<main
					className="flex-1"
					role="main"
				>
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
