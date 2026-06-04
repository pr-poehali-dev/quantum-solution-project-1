import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

const bookings = [
  { id: "B001", scooter: "Турбо Сити", number: "АС1894", start: "02.06.2025, 10:00", end: "02.06.2025, 12:30", duration: "2.5 ч", cost: 900, status: "завершено", parking: "ул. Ленина, 12" },
  { id: "B002", scooter: "Турбо Макс", number: "БК2341", start: "28.05.2025, 15:00", end: "28.05.2025, 19:00", duration: "4 ч", cost: 1824, status: "завершено", parking: "пр. Мира, 5" },
  { id: "B003", scooter: "Турбо Трайк", number: "ВМ5512", start: "25.05.2025, 09:00", end: "25.05.2025, 10:00", duration: "1 ч", cost: 420, status: "отменено", parking: "ул. Гагарина, 3" },
  { id: "B004", scooter: "Турбо Сити", number: "АС1894", start: "20.05.2025, 18:00", end: "20.05.2025, 24:00", duration: "6 ч", cost: 3024, status: "завершено", parking: "ул. Ленина, 12" },
  { id: "B005", scooter: "Турбо Кидс", number: "ГН7823", start: "04.06.2025, 12:00", end: "—", duration: "—", cost: 0, status: "активно", parking: "пл. Победы, 1" },
]

const statusConfig: Record<string, { color: string; bg: string; icon: string }> = {
  "завершено": { color: "#4ade80", bg: "#4ade8020", icon: "CheckCircle" },
  "отменено": { color: "#f87171", bg: "#f8717120", icon: "XCircle" },
  "активно": { color: "#60a5fa", bg: "#60a5fa20", icon: "Zap" },
}

export default function History() {
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
            Личный кабинет
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">История бронирований</h1>
            <p className="text-muted-foreground text-sm">{bookings.length} поездок</p>
          </div>
          <Link
            to="/booking"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-400 text-primary font-bold text-sm hover:bg-green-300 transition-colors"
          >
            <Icon name="Plus" size={16} />
            Новое
          </Link>
        </div>

        <div className="space-y-4">
          {bookings.map((b) => {
            const st = statusConfig[b.status]
            return (
              <div key={b.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center flex-shrink-0 text-2xl">
                      🛴
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-bold">{b.scooter}</p>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{b.number}</span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Icon name="MapPin" size={12} />
                        {b.parking}
                      </p>
                    </div>
                  </div>

                  <span
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ color: st.color, background: st.bg }}
                  >
                    <Icon name={st.icon} size={12} />
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-border text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Начало</p>
                    <p className="font-semibold">{b.start}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Конец</p>
                    <p className="font-semibold">{b.end}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Длительность</p>
                    <p className="font-semibold">{b.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Стоимость</p>
                    <p className="font-bold text-green-600">{b.cost > 0 ? `${b.cost} ₽` : "—"}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
