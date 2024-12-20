import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import "./App.css";
import Bananas from "./Bananas.tsx";
import Spinner from "./Spinner.tsx";
import Nav from "./Nav.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<Nav />}>
					<Route index element={<Bananas />} />
					<Route path="/spinner" element={<Spinner />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
