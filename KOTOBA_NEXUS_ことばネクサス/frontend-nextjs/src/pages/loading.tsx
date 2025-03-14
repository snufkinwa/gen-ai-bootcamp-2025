export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
