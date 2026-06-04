import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

const menuItems = [
  { icon: "LayoutDashboard", label: "Обзор", key: "overview" },
  { icon: "Calendar", label: "История бронирований", key: "history", href: "/history" },
  { icon: "MapPin", label: "Парковки", key: "parkings", href: "/parkings" },
  { icon: "CreditCard", label: "Банковские карты", key: "cards", href: "/cards" },
  { icon: "Settings", label: "Настройки", key: "settings" },
]

const stats = [
  { icon: "Zap", label: "Поездок", value: "12", color: "#4ade80" },
  { icon: "Clock", label: "Часов в пути", value: "8.5", color: "#60a5fa" },
  { icon: "MapPin", label: "Км пройдено", value: "47", color: "#f472b6" },
  { icon: "Tag", label: "Сэкономлено", value: "₽320", color: "#fb923c" },
]

export default function Profile() {
  const [activeMenu, setActiveMenu] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              турбо<span className="text-green-500">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-400/20 flex items-center justify-center">
              <Icon name="User" size={18} className="text-green-600" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-tight">Иван Иванов</p>
              <p className="text-xs text-muted-foreground">+7 (999) 000-00-00</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                item.href ? (
                  <Link
                    key={item.key}
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    <Icon name={item.icon} size={18} />
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.key}
                    onClick={() => setActiveMenu(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeMenu === item.key
                        ? "bg-green-400/15 text-green-700"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    {item.label}
                  </button>
                )
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-4">
                <Icon name="LogOut" size={18} />
                Выйти
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold mb-6">Привет, Иван! 👋</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.color + "20" }}>
                    <Icon name={stat.icon} size={20} style={{ color: stat.color }} />
                  </div>
                  <p className="text-2xl font-extrabold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Active booking */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                <Icon name="Zap" size={16} className="text-green-500" />
                Активное бронирование
              </h2>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-bold text-lg">Турбо Сити — АС1894</p>
                  <p className="text-sm text-muted-foreground">ул. Ленина, 12 · до 18:00</p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-400/15 text-green-700">Активно</span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/booking"
                className="bg-foreground text-primary-foreground rounded-2xl p-6 flex items-center gap-4 hover:opacity-90 transition-opacity"
              >
                <div className="w-12 h-12 rounded-xl bg-green-400/20 flex items-center justify-center">
                  <Icon name="Plus" size={22} className="text-green-400" />
                </div>
                <div>
                  <p className="font-bold">Новое бронирование</p>
                  <p className="text-sm text-primary-foreground/60">Выбрать самокат</p>
                </div>
              </Link>
              <Link
                to="/history"
                className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4 hover:bg-secondary transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center">
                  <Icon name="History" size={22} className="text-blue-500" />
                </div>
                <div>
                  <p className="font-bold">История поездок</p>
                  <p className="text-sm text-muted-foreground">12 бронирований</p>
                </div>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
