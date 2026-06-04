import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const promos = [
  {
    title: "Первая поездка бесплатно",
    description: "Зарегистрируйся в приложении и получи первые 30 минут в подарок. Без условий, без ограничений.",
    icon: "Gift",
    badge: "Для новых",
    color: "#4ade80",
  },
  {
    title: "Утренний тариф",
    description: "С 7:00 до 9:00 скидка 20% на все поездки. Начинай день энергично вместе с Турбо!",
    icon: "Sunrise",
    badge: "Каждый день",
    color: "#fb923c",
  },
  {
    title: "Скидка за длительность",
    description: "При аренде от 3 часов — скидка 5% за каждые 3 часа. Максимальная скидка 25%!",
    icon: "Clock",
    badge: "Выгода до 25%",
    color: "#60a5fa",
  },
  {
    title: "Приведи друга",
    description: "Поделись своим промокодом с другом. Оба получите по 60 минут бесплатной езды.",
    icon: "Users",
    badge: "60 минут",
    color: "#f472b6",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) setVisibleItems((prev) => [...new Set([...prev, index])])
        })
      },
      { threshold: 0.2 },
    )
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="promos" ref={sectionRef} className="py-32 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Специальные предложения</p>
          <h2 className="text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-balance lg:text-7xl">
            <HighlightedText>Акции</HighlightedText> и скидки
            <br />
            для вас
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ездите выгоднее — у нас всегда есть актуальные акции для новых и постоянных клиентов.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {promos.map((promo, index) => (
            <div
              key={promo.title}
              ref={(el) => { itemRefs.current[index] = el }}
              data-index={index}
              className={`relative p-6 rounded-2xl border border-border bg-card transition-all duration-700 hover:shadow-md ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: promo.color + "20" }}
                >
                  <Icon name={promo.icon} size={22} style={{ color: promo.color }} />
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full mt-1"
                  style={{ background: promo.color + "20", color: promo.color }}
                >
                  {promo.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{promo.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{promo.description}</p>
              <button className="mt-4 text-sm font-semibold text-green-600 hover:text-green-500 transition-colors flex items-center gap-1">
                Подробнее <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}