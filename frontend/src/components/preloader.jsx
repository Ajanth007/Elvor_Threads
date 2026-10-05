const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F7F2EB]">
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8B9A6E] border-t-transparent"></div>

        <h1 className="mt-5 text-2xl font-semibold tracking-[0.2em] text-[#2F3A25]">
          ELVOR THREADS
        </h1>

        <p className="mt-2 text-sm text-[#3A362F]">
          Everyday, Elevated
        </p>
      </div>
    </div>
  );
};

export default Preloader;