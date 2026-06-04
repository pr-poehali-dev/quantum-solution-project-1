import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

const initialCards = [
  { id: "1", last4: "4242", brand: "Visa", expiry: "12/26", isDefault: true },
  { id: "2", last4: "5100", brand: "MasterCard", expiry: "08/25", isDefault: false },
]

const brandColors: Record<string, string> = {
  Visa: "#1a1f71",
  MasterCard: "#eb001b",
}

export default function Cards() {
  const [cards, setCards] = useState(initialCards)
  const [showForm, setShowForm] = useState(false)
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvv: "", name: "" })

  const setDefault = (id: string) => {
    setCards(cards.map((c) => ({ ...c, isDefault: c.id === id })))
  }

  const deleteCard = (id: string) => {
    setCards(cards.filter((c) => c.id !== id))
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const last4 = newCard.number.slice(-4)
    setCards([...cards, { id: Date.now().toString(), last4, brand: "Visa", expiry: newCard.expiry, isDefault: false }])
    setNewCard({ number: "", expiry: "", cvv: "", name: "" })
    setShowForm(false)
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
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Банковские карты</h1>
            <p className="text-muted-foreground text-sm">Управляйте способами оплаты</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-400 text-primary font-bold text-sm hover:bg-green-300 transition-colors"
          >
            <Icon name="Plus" size={16} />
            Добавить
          </button>
        </div>

        {/* Add card form */}
        {showForm && (
          <form onSubmit={handleAdd} className="bg-card border border-green-400/30 rounded-2xl p-6 mb-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Icon name="CreditCard" size={18} className="text-green-500" />
              Новая карта
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-muted-foreground text-xs mb-1.5">Номер карты</label>
                <input
                  type="text" maxLength={19} placeholder="0000 0000 0000 0000"
                  value={newCard.number} onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-green-400 transition-colors"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted-foreground text-xs mb-1.5">Срок действия</label>
                  <input
                    type="text" placeholder="MM/YY" maxLength={5}
                    value={newCard.expiry} onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-green-400 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground text-xs mb-1.5">CVV</label>
                  <input
                    type="password" placeholder="•••" maxLength={3}
                    value={newCard.cvv} onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-green-400 transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-muted-foreground text-xs mb-1.5">Имя держателя</label>
                <input
                  type="text" placeholder="IVAN IVANOV"
                  value={newCard.name} onChange={(e) => setNewCard({ ...newCard, name: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-green-400 transition-colors"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-3 rounded-xl bg-green-400 text-primary font-bold text-sm hover:bg-green-300 transition-colors">
                  Добавить карту
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 rounded-xl border border-border text-sm hover:bg-muted transition-colors">
                  Отмена
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Cards list */}
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: brandColors[card.brand] || "#555" }}
                  >
                    {card.brand}
                  </div>
                  <div>
                    <p className="font-bold">•••• •••• •••• {card.last4}</p>
                    <p className="text-xs text-muted-foreground">Действует до {card.expiry}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {card.isDefault ? (
                    <span className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-green-400/15 text-green-700">
                      <Icon name="Star" size={12} />
                      Основная
                    </span>
                  ) : (
                    <button
                      onClick={() => setDefault(card.id)}
                      className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full border border-border hover:border-green-400 transition-colors"
                    >
                      Сделать основной
                    </button>
                  )}
                  <button
                    onClick={() => deleteCard(card.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Icon name="Trash2" size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cards.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="CreditCard" size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">Нет привязанных карт</p>
            <p className="text-sm mt-1">Добавьте карту для быстрой оплаты</p>
          </div>
        )}
      </div>
    </div>
  )
}
