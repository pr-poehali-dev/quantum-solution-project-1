import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

export default function Register() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", birthDate: "", password: "", confirmPassword: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/profile"
  }

  const fields = [
    { key: "firstName", label: "Имя", placeholder: "Иван", icon: "User", type: "text" },
    { key: "lastName", label: "Фамилия", placeholder: "Иванов", icon: "User", type: "text" },
    { key: "phone", label: "Телефон", placeholder: "+7 (999) 000-00-00", icon: "Phone", type: "tel" },
    { key: "birthDate", label: "Дата рождения", placeholder: "", icon: "Calendar", type: "date" },
    { key: "password", label: "Пароль", placeholder: "••••••••", icon: "Lock", type: "password" },
    { key: "confirmPassword", label: "Повтор пароля", placeholder: "••••••••", icon: "Lock", type: "password" },
  ]

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
            <h1 className="text-3xl font-extrabold text-white mb-2">Создать аккаунт</h1>
            <p className="text-white/50 text-sm">Первые 30 минут — бесплатно!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {fields.slice(0, 2).map((field) => (
                <div key={field.key}>
                  <label className="block text-white/70 text-sm font-medium mb-2">{field.label}</label>
                  <div className="relative">
                    <Icon name={field.icon} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors text-sm"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            {fields.slice(2).map((field) => (
              <div key={field.key}>
                <label className="block text-white/70 text-sm font-medium mb-2">{field.label}</label>
                <div className="relative">
                  <Icon name={field.icon} size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors"
                    required
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-green-400 text-primary font-bold text-base hover:bg-green-300 transition-all duration-300 flex items-center justify-center gap-2 mt-2"
            >
              <Icon name="UserPlus" size={18} />
              Зарегистрироваться
            </button>
          </form>

          <p className="text-center text-white/50 text-sm mt-6">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
