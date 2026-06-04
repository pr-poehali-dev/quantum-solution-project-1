import { useState } from "react"
import Icon from "@/components/ui/icon"

const faqs = [
  {
    question: "Как взять самокат в аренду?",
    answer: "Зарегистрируйтесь на сайте, выберите самокат и подходящую парковку, укажите дату и время — всё готово! Привяжите банковскую карту для быстрой оплаты.",
  },
  {
    question: "С какого возраста можно арендовать?",
    answer: "Услугами аренды самоката могут пользоваться лица от 16 лет. При регистрации необходимо указать дату рождения для подтверждения возраста.",
  },
  {
    question: "Как работает система скидок?",
    answer: "При бронировании от 3 часов вы получаете скидку 5%. За каждые следующие 3 часа скидка увеличивается ещё на 5%. Максимальная скидка — 25%.",
  },
  {
    question: "Что если самокат сломается во время поездки?",
    answer: "Свяжитесь с нашей службой поддержки по телефону 8 (800) 111-11-11. Мы оперативно решим проблему и при необходимости заменим самокат.",
  },
  {
    question: "Как найти ближайшую парковку?",
    answer: "В разделе «Парковки» на сайте отображается интерактивная карта со всеми доступными парковками. Вы можете найти ближайшую к вам точку.",
  },
  {
    question: "Как отменить бронирование?",
    answer: "Отменить бронирование можно в разделе «История бронирований» в личном кабинете. Отмена не менее чем за 1 час до начала аренды — бесплатно.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы и ответы</p>
          <h2 className="text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-green-600">
                  {faq.question}
                </span>
                <Icon
                  name="Plus"
                  size={24}
                  className={`text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45 text-green-500" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
