export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-[1200] bg-background">
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-[#00B8DB]/50 to-transparent"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 pb-12">
        <p className="font-mono text-xs text-muted-foreground">
          © {year} <span className="text-foreground">Andrew</span> — All rights reserved.
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })}
          className="cursor-pointer font-mono text-xs text-muted-foreground transition-colors hover:text-[#00B8DB]"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
