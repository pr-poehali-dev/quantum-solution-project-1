import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

const scooters = [
  { id: "SC001", name: "Турбо Сити", number: "АС1894", type: "Двухколёсный", price: 6, parking: "ул. Ленина, 12" },
  { id: "SC002", name: "Турбо Макс", number: "БК2341", type: "Двухколёсный", price: 8, parking: "пр. Мира, 5" },
  { id: "SC003", name: "Турбо Трайк", number: "ВМ5512", type: "Трёхколёсный", price: 7, parking: "ул. Гагарина, 3" },
  { id: "SC004", name: "Турбо Кидс", number: "ГН7823", type: "Трёхколёсный", price: 5, parking: "пл. Победы, 1" },
]

const cards = [
  { id: "1", last4: "4242", brand: "Visa" },
  { id: "2", last4: "5100", brand: "MasterCard" },
]

function calcDiscount(hours: number): number {
  const steps = Math.floor(hours / 3)
  return Math.min(steps * 5, 25)
}

export default function Booking() {
  const [selectedScooter, setSelectedScooter] = useState(scooters[0])
  const [selectedCard, setSelectedCard] = useState(cards[0])
  const [form, setForm] = useState({
    firstName: "Иван", lastName: "Иванов", phone: "+7 (999) 000-00-00",
    birthDate: "2000-01-01", startDate: "", startTime: "", endDate: "", endTime: "",
  })
  const [totalCost, setTotalCost] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [hours, setHours] = useState(0)

  useEffect(() => {
    if (form.startDate && form.startTime && form.endDate && form.endTime) {
      const start = new Date(`${form.startDate}T${form.startTime}`)
      const end = new Date(`${form.endDate}T${form.endTime}`)
      const diffMs = end.getTime() - start.getTime()
      if (diffMs > 0) {
        const diffMin = diffMs / 60000
        const diffHours = diffMin / 60
        setHours(diffHours)
        const disc = calcDiscount(diffHours)
        setDiscount(disc)
        const cost = diffMin * selectedScooter.price * (1 - disc / 100)
        setTotalCost(Math.round(cost))
      }
    }
  }, [form.startDate, form.startTime, form.endDate, form.endTime, selectedScooter])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/"
  }

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
            <Icon name="User" size={16} />
            Личный кабинет
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <h1 className="text-3xl font-extrabold mb-2">Бронирование самоката</h1>
        <p className="text-muted-foreground mb-8">Заполните данные и подтвердите бронирование</p>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              {/* Scooter selection */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Zap" size={18} className="text-green-500" />
                  Выбор самоката
                </h2>
                <div className="space-y-3">
                  {scooters.map((sc) => (
                    <label
                      key={sc.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedScooter.id === sc.id ? "border-green-400 bg-green-400/5" : "border-border hover:border-green-300"
                      }`}
                    >
                      <input type="radio" name="scooter" className="hidden" checked={selectedScooter.id === sc.id} onChange={() => setSelectedScooter(sc)} />
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${selectedScooter.id === sc.id ? "border-green-400 bg-green-400" : "border-muted-foreground"}`} />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{sc.name} <span className="text-muted-foreground font-normal">· {sc.number}</span></p>
                        <p className="text-xs text-muted-foreground">{sc.type} · {sc.parking}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">{sc.price} ₽/мин</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Scooter details */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Info" size={18} className="text-blue-500" />
                  Данные самоката
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Название</p>
                    <p className="font-semibold">{selectedScooter.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Номер</p>
                    <p className="font-semibold">{selectedScooter.number}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Адрес парковки</p>
                    <p className="font-semibold">{selectedScooter.parking}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Стоимость</p>
                    <p className="font-semibold">{selectedScooter.price} ₽/мин</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div>
                    <label className="block text-muted-foreground text-xs mb-1.5">Дата начала</label>
                    <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-green-400 transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-muted-foreground text-xs mb-1.5">Время начала</label>
                    <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-green-400 transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-muted-foreground text-xs mb-1.5">Дата возврата</label>
                    <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-green-400 transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-muted-foreground text-xs mb-1.5">Время возврата</label>
                    <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-green-400 transition-colors" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Client info */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="User" size={18} className="text-purple-500" />
                  Данные клиента
                </h2>
                <div className="space-y-4">
                  {[
                    { key: "firstName", label: "Имя", placeholder: "Иван" },
                    { key: "lastName", label: "Фамилия", placeholder: "Иванов" },
                    { key: "phone", label: "Телефон", placeholder: "+7 (999) 000-00-00" },
                    { key: "birthDate", label: "Дата рождения", placeholder: "", type: "date" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-muted-foreground text-xs mb-1.5">{field.label}</label>
                      <input
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-green-400 transition-colors"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card selection */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="CreditCard" size={18} className="text-orange-500" />
                  Банковская карта
                </h2>
                <div className="space-y-3">
                  {cards.map((card) => (
                    <label
                      key={card.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedCard.id === card.id ? "border-green-400 bg-green-400/5" : "border-border hover:border-green-300"
                      }`}
                    >
                      <input type="radio" name="card" className="hidden" checked={selectedCard.id === card.id} onChange={() => setSelectedCard(card)} />
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${selectedCard.id === card.id ? "border-green-400 bg-green-400" : "border-muted-foreground"}`} />
                      <Icon name="CreditCard" size={18} className="text-muted-foreground" />
                      <span className="text-sm font-semibold">{card.brand} •••• {card.last4}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cost summary */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Tag" size={18} className="text-green-500" />
                  Итоговая стоимость
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Продолжительность</span>
                    <span className="font-semibold">{hours > 0 ? `${hours.toFixed(1)} ч` : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Тариф</span>
                    <span className="font-semibold">{selectedScooter.price} ₽/мин</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-green-400/10">
                      <span className="text-green-700 font-semibold flex items-center gap-1">
                        <Icon name="Percent" size={14} />
                        Скидка за длительность
                      </span>
                      <span className="font-bold text-green-700">−{discount}%</span>
                    </div>
                  )}
                  {/* Discount progress bar */}
                  {hours > 0 && (
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Скидка {discount}%</span>
                        <span>Макс. 25%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-400 rounded-full transition-all duration-500"
                          style={{ width: `${(discount / 25) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-bold text-base">Итого</span>
                    <span className="font-extrabold text-xl text-green-600">{totalCost > 0 ? `${totalCost} ₽` : "—"}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-green-400 text-primary font-bold text-base hover:bg-green-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="CheckCircle" size={20} />
                Оформить бронирование
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
