export default function Pagination({ page, setPage, totalPages }) {

    const isLastPage = totalPages ? page >= totalPages - 1 : true;

    return (
        <div className="flex justify-center items-center mt-8 gap-3">

            <button
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
                className={`px-4 py-2 rounded-lg border ${page === 0 ? "bg-gray-200 text-gray-400" : "hover:bg-gray-100"
                    }`}
            >
                Prev
            </button>

            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Page {page + 1} {totalPages ? `of ${totalPages}` : ""}
            </div>

            <button
                disabled={isLastPage}
                onClick={() => setPage(p => p + 1)}
                className={`px-4 py-2 rounded-lg border ${isLastPage ? "bg-gray-200 text-gray-400" : "hover:bg-gray-100"
                    }`}
            >
                Next
            </button>

        </div>
    );
}