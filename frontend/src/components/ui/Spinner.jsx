function Spinner() {
  return (
    <div role="status" className="flex items-center justify-center py-20">
      <div className="h-12 w-12 rounded-full border-4 border-slate-300 border-t-slate-700 animate-spin" />
    </div>
  );
}

export default Spinner;