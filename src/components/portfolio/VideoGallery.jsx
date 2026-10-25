import videos from '../../data/videos.json'

export default function VideoGallery() {
  return (
    <section className="border-t border-stone-300 py-16">
      <p className="eyebrow">Moving pictures</p>
      <h2 className="editorial-serif mt-3 text-4xl text-stone-900">A few stories in motion.</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
        Pre-wedding films from the studio collection. Select play to watch a clip.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {videos.map((video) => (
          <article key={video.src}>
            <div className="relative overflow-hidden bg-stone-950">
              <video
                controls
                preload="none"
                playsInline
                poster={video.poster}
                className="aspect-video w-full"
                aria-label={video.title}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support video playback.
              </video>
              <img
                src="/images/swapna-logo.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 z-10 h-auto w-20 rounded bg-white/90 p-1.5 shadow-md"
              />
            </div>
            <p className="eyebrow mt-4">{video.category}</p>
            <h3 className="editorial-serif mt-1 text-2xl text-stone-900">{video.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
