import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

const parkings = [
  { id: 1, name: "Центральная", address: "ул. Ленина, 12", available: 5, total: 8, distance: "120 м", x: 310, y: 180 },
  { id: 2, name: "Мира Плаза", address: "пр. Мира, 5", available: 2, total: 6, distance: "340 м", x: 480, y: 130 },
  { id: 3, name: "Парк Победы", address: "пл. Победы, 1", available: 7, total: 10, distance: "520 м", x: 160, y: 260 },
  { id: 4, name: "Гагаринская", address: "ул. Гагарина, 3", available: 0, total: 4, distance: "780 м", x: 580, y: 270 },
  { id: 5, name: "Торговый центр", address: "ул. Садовая, 21", available: 3, total: 6, distance: "1.1 км", x: 390, y: 330 },
  { id: 6, name: "Студенческая", address: "ул. Университетская, 7", available: 4, total: 8, distance: "1.4 км", x: 220, y: 120 },
]

export default function Parkings() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "available">("all")
  const [hoveredPin, setHoveredPin] = useState<number | null>(null)
  const [selectedPin, setSelectedPin] = useState<number | null>(null)

  const filtered = parkings.filter((p) => {
    const matchSearch = p.address.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || p.available > 0
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              турбо<span className="text-green-500">.</span>
            </span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <h1 className="text-3xl font-extrabold mb-2">Парковки</h1>
        <p className="text-muted-foreground mb-8">Все доступные точки аренды в вашем городе</p>

        {/* Search & filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по адресу..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:border-green-400 transition-colors text-sm"
            />
          </div>
          <div className="flex rounded-xl border border-border bg-card overflow-hidden">
            {(["all", "available"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-3 text-sm font-medium transition-colors ${
                  filter === f ? "bg-green-400 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "Все" : "Доступные"}
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="w-full rounded-2xl mb-8 overflow-hidden border border-border" style={{ background: "#1a2235" }}>
          <svg viewBox="0 0 740 420" className="w-full" style={{ display: "block" }}>
            {/* Background */}
            <rect width="740" height="420" fill="#1a2235" />

            {/* Grid lines (city blocks look) */}
            {[80, 160, 240, 320, 400, 480, 560, 640].map(x => (
              <line key={`vl${x}`} x1={x} y1="0" x2={x} y2="420" stroke="#ffffff08" strokeWidth="1" />
            ))}
            {[70, 140, 210, 280, 350].map(y => (
              <line key={`hl${y}`} x1="0" y1={y} x2="740" y2={y} stroke="#ffffff08" strokeWidth="1" />
            ))}

            {/* Roads */}
            <line x1="0" y1="180" x2="740" y2="180" stroke="#ffffff12" strokeWidth="18" strokeLinecap="round" />
            <line x1="0" y1="180" x2="740" y2="180" stroke="#ffffff06" strokeWidth="1" strokeDasharray="20 14" />
            <line x1="310" y1="0" x2="310" y2="420" stroke="#ffffff12" strokeWidth="14" />
            <line x1="0" y1="300" x2="740" y2="300" stroke="#ffffff0e" strokeWidth="10" />
            <line x1="480" y1="0" x2="480" y2="420" stroke="#ffffff0e" strokeWidth="10" />
            <line x1="160" y1="0" x2="160" y2="420" stroke="#ffffff08" strokeWidth="8" />
            <line x1="580" y1="0" x2="580" y2="420" stroke="#ffffff08" strokeWidth="8" />
            <line x1="0" y1="130" x2="740" y2="130" stroke="#ffffff08" strokeWidth="8" />

            {/* City blocks */}
            {[
              [20, 20, 120, 90], [180, 20, 100, 80], [360, 20, 80, 80], [520, 20, 40, 80],
              [20, 200, 110, 70], [180, 200, 100, 60], [360, 200, 80, 70], [530, 200, 30, 70],
              [20, 320, 110, 80], [180, 320, 100, 80], [360, 330, 80, 60], [530, 330, 30, 60],
              [630, 20, 80, 90], [630, 200, 80, 70], [630, 330, 80, 70],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#ffffff05" stroke="#ffffff08" strokeWidth="0.5" />
            ))}

            {/* Park */}
            <ellipse cx="160" cy="260" rx="55" ry="40" fill="#4ade8012" stroke="#4ade8030" strokeWidth="1" />
            <text x="160" y="265" textAnchor="middle" fill="#4ade8060" fontSize="10" fontFamily="system-ui">парк</text>

            {/* "You are here" dot */}
            <circle cx="310" cy="180" r="10" fill="#4ade8033" />
            <circle cx="310" cy="180" r="5" fill="#4ade80" />
            <circle cx="310" cy="180" r="10" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.5">
              <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Parking pins */}
            {parkings.map((p) => {
              const isHovered = hoveredPin === p.id
              const isSelected = selectedPin === p.id
              const active = p.available > 0
              const pinColor = active ? "#4ade80" : "#f87171"
              const scale = isHovered || isSelected ? 1.25 : 1

              return (
                <g
                  key={p.id}
                  style={{ cursor: "pointer", transition: "transform 0.15s", transformOrigin: `${p.x}px ${p.y}px`, transform: `scale(${scale})` }}
                  onMouseEnter={() => setHoveredPin(p.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                  onClick={() => setSelectedPin(selectedPin === p.id ? null : p.id)}
                >
                  {/* Shadow */}
                  <ellipse cx={p.x} cy={p.y + 20} rx="10" ry="4" fill="#00000040" />
                  {/* Pin body */}
                  <path
                    d={`M${p.x},${p.y + 18} C${p.x - 12},${p.y + 6} ${p.x - 14},${p.y - 10} ${p.x},${p.y - 16} C${p.x + 14},${p.y - 10} ${p.x + 12},${p.y + 6} ${p.x},${p.y + 18}Z`}
                    fill={pinColor}
                    opacity={active ? 1 : 0.7}
                  />
                  {/* Pin icon: P */}
                  <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="system-ui">P</text>

                  {/* Tooltip on hover */}
                  {(isHovered || isSelected) && (
                    <g>
                      <rect x={p.x - 58} y={p.y - 54} width="116" height="32" rx="8" fill="#0f172a" stroke={pinColor} strokeWidth="1.5" />
                      <text x={p.x} y={p.y - 43} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="system-ui">{p.name}</text>
                      <text x={p.x} y={p.y - 30} textAnchor="middle" fill={pinColor} fontSize="9" fontFamily="system-ui">{p.available} из {p.total} свободно</text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* Legend */}
            <rect x="12" y="380" width="130" height="30" rx="8" fill="#0f172a99" />
            <circle cx="28" cy="395" r="5" fill="#4ade80" />
            <text x="38" y="399" fill="#ffffff80" fontSize="9" fontFamily="system-ui">Есть самокаты</text>
            <circle cx="90" cy="395" r="5" fill="#f87171" />
            <text x="100" y="399" fill="#ffffff80" fontSize="9" fontFamily="system-ui">Занято</text>
          </svg>
        </div>

        {/* Parkings list */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold mb-1">{p.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    {p.address}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">{p.distance}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Icon name="Bike" size={14} className={p.available > 0 ? "text-green-500" : "text-red-400"} />
                    <span className={`text-sm font-bold ${p.available > 0 ? "text-green-600" : "text-red-500"}`}>
                      {p.available} из {p.total}
                    </span>
                    <span className="text-xs text-muted-foreground">доступно</span>
                  </div>
                  <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(p.available / p.total) * 100}%`,
                        background: p.available > 0 ? "#4ade80" : "#f87171",
                      }}
                    />
                  </div>
                </div>

                {p.available > 0 ? (
                  <Link
                    to="/booking"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-400 text-primary font-bold text-sm hover:bg-green-300 transition-colors"
                  >
                    <Icon name="Zap" size={14} />
                    Взять
                  </Link>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-medium">
                    Занято
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}