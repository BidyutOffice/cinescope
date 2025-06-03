import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import BaseLoadingUI from "./components/BaseLoadingUI";
const Movies = lazy(() => import("./pages/Movies"));
const Welcome = lazy(() => import("./pages/Welcome"));
const DraftMovieDetails = lazy(() => import("./draftpages/DraftMovieDetails"));
const WeatherApp = lazy(() => import("./draftpages/WeatherApp"));

function App() {
	return <Suspense fallback={<BaseLoadingUI />}>
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/explore-movies" element={<Movies />} />
			<Route path="/explore-movies/:movieid/:movietitle" element={<DraftMovieDetails />} />
			<Route path="/weather" element={<WeatherApp />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</Suspense>;
}

export default App;
