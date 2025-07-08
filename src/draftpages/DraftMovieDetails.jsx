import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { IoPlayOutline } from "react-icons/io5";
import ErrorUI from "../components/ErrorUI";
import DraftMDetailLoading from "../components/DraftMDetailLoading";
import RelatedMoviesSlider from "../components/RelatedMoviesSlider";
import useMovieDetails from "../hooks/useMovieDetails";

export default function DraftMovieDetails() {

    const { movieid } = useParams();
    const {
        movie,
        directors,
        similar,
        trailer,
        cast,
        loading,
        error,
        watchProviders,
    } = useMovieDetails(movieid);

    useEffect(() => { window.scrollTo({ top: 0, left: 0 }); }, [movieid]);

    if (loading || !movie) return <DraftMDetailLoading />;
    if (error || !movie.title) return <ErrorUI message="Movie not found." />;

    return (<div className="max-w-6xl py-10 px-4 mx-auto flex flex-col gap-10">
        <Link
            to="/explore-movies"
            className="text-sm text-blue-600 hover:underline inline-block"
        >
            ← Back to Movies
        </Link>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
            <img
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                alt={movie?.title}
            />

            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-4xl font-bold">{movie?.title}</h2>
                    {movie?.tagline && <p className="text-lg italic text-red-600 mt-1">&quot;{movie.tagline}&quot;</p>}
                    <p className="text-gray-600 mt-2">Released: {movie?.release_date}</p>
                </div>

                <p className="text-base text-gray-700">{movie?.overview}</p>

                {/* Tag Categories (same as before) */}
                <div className="flex flex-col gap-4 text-sm">
                    <div className="flex gap-4">
                        {trailer && (
                            <a
                                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all w-fit flex items-center gap-2">
                                <IoPlayOutline /> Watch Trailer
                            </a>
                        )}

                        {/* IMDb link (optional, add if you have imdb_id in movie data) */}
                        {movie?.imdb_id && (
                            <a
                                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-500 text-sm font-semibold mt-2 underline"
                                title="View on IMDb"
                            >
                                🎬 IMDb
                            </a>
                        )}
                    </div>

                    {/* Providers */}
                    {watchProviders && (
                        <div className="flex text-sm flex-col gap-4 text-slate-800">
                            {['flatrate', 'buy', 'rent'].map((type) => {
                                const providers = watchProviders[type];
                                if (!providers || providers.length === 0) return null;

                                // Emoji for each type
                                const labelEmoji = type === 'flatrate' ? '📺' : type === 'buy' ? '💰' : '🎬';
                                const labelText = type === 'flatrate' ? 'Streaming' : type === 'buy' ? 'Buy' : 'Rent';

                                return (
                                    <div key={type}>
                                        <h4 className="mb-2 font-semibold text-slate-700">
                                            {labelEmoji} {labelText}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {providers.map((p, i) => (
                                                <span
                                                    key={`${type}-${i}`}
                                                    className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full cursor-default"
                                                    title={p.provider_name}
                                                >
                                                    {p.provider_name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Genres */}
                    {movie?.genres?.length > 0 && (
                        <div>
                            <h3 className="text-slate-800 font-semibold mb-1">🎬 Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map(genre => (
                                    <span key={genre.id} className="bg-slate-200 px-3 py-1 rounded-full">{genre.name}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Language & Runtime */}
                    <div>
                        <h3 className="text-slate-800 font-semibold mb-1">🌐 Language & Runtime</h3>
                        <div className="flex flex-wrap gap-2">
                            {movie?.original_language && (
                                <span className="bg-sky-200 px-3 py-1 rounded-full">
                                    Language: {movie.original_language.toUpperCase()}
                                </span>
                            )}
                            {movie?.runtime && (
                                <span className="bg-emerald-200 px-3 py-1 rounded-full">
                                    Runtime: {movie.runtime} mins
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Director & Ratings */}
                    <div>
                        <h3 className="text-slate-800 font-semibold mb-1">🎯 Director & Rating</h3>
                        <div className="flex flex-wrap gap-2">
                            {directors.length > 0 && (
                                <span className="bg-purple-200 px-3 py-1 rounded-full">
                                    Director: {directors.map(d => d.name).join(', ')}
                                </span>
                            )}
                            {movie?.vote_average && (
                                <span className="bg-yellow-200 px-3 py-1 rounded-full">
                                    Rating: {movie.vote_average} / 10
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Production & Countries */}
                    <div>
                        <h3 className="text-slate-800 font-semibold mb-1">🎥 Production & Countries</h3>
                        <div className="flex flex-wrap gap-2">
                            {movie?.production_companies?.slice(0, 4).map((c, i) => (
                                <span key={i} className="bg-indigo-200 px-3 py-1 rounded-full">{c.name}</span>
                            ))}
                            {movie?.production_countries?.map((c, i) => (
                                <span key={i} className="bg-pink-200 px-3 py-1 rounded-full">Country: {c.name}</span>
                            ))}
                        </div>
                    </div>

                    {/* Financials */}
                    {(movie?.budget || movie?.revenue) ? (
                        <div>
                            <h3 className="text-slate-800 font-semibold mb-1">💸 Financials</h3>
                            <div className="flex flex-wrap gap-2">
                                {movie?.budget > 0 && (
                                    <span className="bg-red-200 px-3 py-1 rounded-full">
                                        Budget: ${movie.budget.toLocaleString()}
                                    </span>
                                )}
                                {movie?.revenue > 0 && (
                                    <span className="bg-green-200 px-3 py-1 rounded-full">
                                        Revenue: ${movie.revenue.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    ) : "No financial data available"}
                </div>
            </div>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
            <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">🎭 Cast</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {cast.slice(0, 12).map(actor => (
                        <div
                            key={actor.id}
                            className="flex flex-col items-center bg-slate-200 rounded-full p-3 shadow-sm hover:shadow-md transition-all"
                        >
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                        : "https://via.placeholder.com/150x225?text=No+Image"
                                }
                                alt={actor.name}
                                className="w-16 h-24 object-cover rounded-full mb-2 shadow"
                            />
                            <p className="text-sm font-semibold text-center leading-tight">{actor.name}</p>
                            <p className="text-xs text-gray-600 text-center leading-snug">as {actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Related Movies Section */}
        <RelatedMoviesSlider similar={similar} />
    </div>
    );
}
