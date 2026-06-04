import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

const parkings = [
  { id: 1, name: "Центральная", address: "ул. Ленина, 12", available: 5, total: 8, distance: "120 м" },
  { id: 2, name: "Мира Плаза", address: "пр. Мира, 5", available: 2, total: 6, distance: "340 м" },
  { id: 3, name: "Парк Победы", address: "пл. Победы, 1", available: 7, total: 10, distance: "520 м" },
  { id: 4, name: "Гагаринская", address: "ул. Гагарина, 3", available: 0, total: 4, distance: "780 м" },
  { id: 5, name: "Торговый центр", address: "ул. Садовая, 21", available: 3, total: 6, distance: "1.1 км" },
  { id: 6, name: "Студенческая", address: "ул. Университетская, 7", available: 4, total: 8, distance: "1.4 км" },
]

export default function Parkings() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "available">("all")

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

        {/* Map placeholder */}
        <div
          className="w-full h-48 rounded-2xl mb-8 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
        >
          <div className="text-center">
            <Icon name="Map" size={32} className="text-green-400 mx-auto mb-2" />
            <p className="text-white/50 text-sm">Интерактивная карта</p>
          </div>
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
