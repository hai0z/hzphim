export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero section loading */}
      <div className="w-full h-[60vh] skeleton rounded-lg mb-8"></div>

      {/* Content section loading */}
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <span className="loading loading-dots loading-lg text-secondary"></span>
          <span className="loading loading-ring loading-lg text-accent"></span>
        </div>

        {/* Movie cards loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="skeleton h-48 w-full"></div>
              <div className="card-body">
                <div className="skeleton h-4 w-3/4 mb-2"></div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
