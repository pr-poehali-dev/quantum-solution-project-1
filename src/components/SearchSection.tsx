import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

export function SearchSection() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ type: "", name: "", parking: "" })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/booking")
  }

  return (
    <section id="search" className="py-16 bg-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-3 text-center">Найти самокат</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-8">Начни поездку прямо сейчас</h2>

          <form onSubmit={handleSearch} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2">Вид самоката</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-green-400 transition-colors text-sm"
                >
                  <option value="" className="text-black">Любой</option>
                  <option value="2" className="text-black">Двухколёсный</option>
                  <option value="3" className="text-black">Трёхколёсный</option>
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2">Название модели</label>
                <div className="relative">
                  <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text" placeholder="Турбо Сити..."
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2">Адрес парковки</label>
                <div className="relative">
                  <Icon name="MapPin" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text" placeholder="ул. Ленина, 12..."
                    value={form.parking}
                    onChange={(e) => setForm({ ...form, parking: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-green-400 transition-colors text-sm"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-green-400 text-primary font-bold text-base hover:bg-green-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Icon name="Search" size={18} />
              Найти самокаты
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
