import Skeleton from "./skeleton";

export const SkeletonList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(10)].map((_, index) => (
          <div 
            key={index} 
            className="bg-slate-900 p-8 rounded-lg shadow-xl"
          >
            <Skeleton />
          </div>
        ))}
      </div>
    </div>
  );
};