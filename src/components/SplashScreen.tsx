export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-lacquer">
      {/* diagonal pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)`,
        }}
      />
      {/* blur circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#8a6040]/40 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#5a3a28]/40 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6">
        <svg className="w-14 h-14 text-[#c9a45e] drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-tight">
          VN Voca
        </h1>
        <p className="text-white/70 text-sm font-light tracking-widest uppercase">Vietnamese Vocabulary</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#c9a45e] animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 rounded-full bg-[#c9a45e] animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 rounded-full bg-[#c9a45e] animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
