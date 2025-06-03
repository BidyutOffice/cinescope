export default function BaseLoadingUI() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div
                className="w-12 h-12 border-4 border-red-600 border-t-transparent border-solid rounded-full animate-spin"
                aria-label="Loading spinner"
            />
        </div>
    );
}
