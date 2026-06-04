import { useState, useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"

const scooters = [
  {
    id: 1,
    title: "Турбо Сити",
    category: "Двухколёсный",
    speed: "до 25 км/ч",
    emoji: "🛴",
    color: "#4ade80",
  },
  {
    id: 2,
    title: "Турбо Макс",
    category: "Двухколёсный",
    speed: "до 35 км/ч",
    emoji: "⚡",
    color: "#60a5fa",
  },
  {
    id: 3,
    title: "Турбо Трайк",
    category: "Трёхколёсный",
    speed: "до 20 км/ч",
    emoji: "🏎️",
    color: "#f472b6",
  },
  {
    id: 4,
    title: "Турбо Кидс",
    category: "Трёхколёсный",
    speed: "до 15 км/ч",
    emoji: "🌟",
    color: "#fb923c",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) setRevealedItems((prev) => new Set(prev).add(scooters[index].id))
          }
        })
      },
      { threshold: 0.2 },
    )
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="scooters" className="py-32 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наш парк</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">Наши самокаты</h2>
          </div>
          <a
            href="/booking"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-500 transition-colors group"
          >
            Забронировать сейчас
            <Icon name="ArrowUpRight" size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {scooters.map((scooter, index) => (
            <article
              key={scooter.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`group cursor-pointer rounded-2xl overflow-hidden border border-border transition-all duration-500 ${
                revealedItems.has(scooter.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${hoveredId === scooter.id ? "shadow-lg scale-[1.02]" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(scooter.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className="relative aspect-[4/3] flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, #0f172a, #1e293b)` }}
              >
                <div className="text-center">
                  <div
                    className="text-9xl mb-2 transition-transform duration-500"
                    style={{ transform: hoveredId === scooter.id ? "scale(1.2) rotate(-5deg)" : "scale(1)" }}
                  >
                    {scooter.emoji}
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: scooter.color + "22", color: scooter.color }}
                  >
                    {scooter.speed}
                  </span>
                </div>
              </div>

              <div className="p-6 flex items-start justify-between gap-4 bg-card">
                <div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-green-600 transition-colors">{scooter.title}</h3>
                  <p className="text-muted-foreground text-sm">{scooter.category}</p>
                </div>
                <a
                  href="/booking"
                  className="flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg bg-green-400/10 text-green-600 hover:bg-green-400/20 transition-colors"
                >
                  <Icon name="Zap" size={14} />
                  Взять
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
