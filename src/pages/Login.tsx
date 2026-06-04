import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

export default function Login() {
  const [form, setForm] = useState({ phone: "", password: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/profile"
  }

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2010 100%)" }}>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link to="/" className="inline-block mb-8">
              <span className="font-bold text-3xl tracking-tight text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                турбо<span className="text-green-400">.</span>
              </span>
            </Link>
            <h1 className="text-3xl font-extrabold text-white mb-2">Добро пожаловать!</h1>
            <p className="text-white/50 text-sm">Войдите в личный кабинет</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Телефон</label>
              <div className="relative">
                <Icon name="Phone" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="tel"
                  placeholder="+7 (999) 000-00-00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-green-400 text-primary font-bold text-base hover:bg-green-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Icon name="LogIn" size={18} />
              Войти
            </button>
          </form>

          <p className="text-center text-white/50 text-sm mt-6">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
