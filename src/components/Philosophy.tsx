import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const steps = [
  {
    title: "Подобрать самокат",
    description: "Выбирай из двухколёсных и трёхколёсных моделей. Удобный фильтр поможет найти идеальный вариант прямо рядом с тобой.",
  },
  {
    title: "Выбрать место, время и дату",
    description: "Бронируй заранее или прямо сейчас. Укажи адрес ближайшей парковки, дату и время — всё займёт меньше минуты.",
  },
  {
    title: "Выбрать удобный тариф",
    description: "Тарифы от 6 рублей в минуту. Чем дольше аренда — тем выгоднее: скидка до 25% при бронировании от 3 часов.",
  },
  {
    title: "Удобная система оплаты",
    description: "Привяжи банковскую карту и оплачивай мгновенно. Вся история поездок и чеки — в личном кабинете.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Как это работает</p>
            <h2 className="text-6xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-balance lg:text-7xl">
              Аренда за
              <br />
              <HighlightedText>4 шага</HighlightedText>
            </h2>

            <div className="relative hidden lg:block mt-8">
              <div
                className="w-full h-64 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
              >
                <div className="text-center">
                  <div className="text-8xl mb-4">🛴</div>
                  <p className="text-white/60 text-sm">Турбо — едем с удовольствием</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Турбо — это быстро, удобно и выгодно. Никаких очередей, никаких залогов — просто выбери самокат и поехали!
            </p>

            {steps.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => { itemRefs.current[index] = el }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-green-500/70 text-sm font-bold mt-1">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
