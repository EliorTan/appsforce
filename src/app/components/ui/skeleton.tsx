const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center space-y-4">

        <div className="relative w-32 h-32">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full" />
          <div className="absolute inset-[3px] bg-slate-800 rounded-full" />
        </div>
        
        <div className="h-5 bg-slate-700 rounded w-48" />
        
        <div className="h-3 bg-slate-700 rounded w-32" />
        
        <div className="h-4 bg-slate-700 rounded w-24 mt-4" />

        <div className="h-3 bg-slate-700 rounded w-56" />
        <div className="h-3 bg-slate-700 rounded w-48" />
        <div className="h-3 bg-slate-700 rounded w-40" />
      </div>
    </div>
  );
};

export default Skeleton;