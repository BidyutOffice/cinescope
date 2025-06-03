import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
            <h1 className="text-8xl font-extrabold text-red-600 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-6">
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
                to="/"
                className="text-sm text-blue-600 hover:underline inline-block"
            >
                &larr; Back to Home
            </Link>
        </div>
    );
}
