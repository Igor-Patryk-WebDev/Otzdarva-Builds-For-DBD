export const WebsiteBanner = () => {
  return (
    <header className="mt-8 mb-4">
      <div className="flex center gap-2 mb-1">
        <a href="https://otzdarva.com/" target="_blank" className="flex center gap-1 sm:gap-2">
          <img src="/images/favicon.png" alt="OtzLogo" className="h-5 sm:h-8 md:h-10" />
          <span className="text-otz text-lg sm:text-2xl md:text-3xl font-bold leading-none">Otzdarva</span>
        </a>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold leading-none"> builds for</h2>
      </div>
      <h1 className="text-3xl sm:text-6xl md:text-7xl leading-none font-bold text-center mb-2">DEAD BY DAYLIGHT</h1>
      <p className="text-xs sm:text-base text-center text-neutral-200 max-w-110 sm:max-w-125 justify-self-center border-t border-b border-neutral-900 p-4">
        Search the <span className="text-otz font-bold">BIGGEST COLLECTION</span> of builds, ranging from most meta to straight up funny and troll ones!
      </p>
    </header>
  )
}