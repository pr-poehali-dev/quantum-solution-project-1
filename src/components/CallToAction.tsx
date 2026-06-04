import Icon from "@/components/ui/icon"
import { HighlightedText } from "./HighlightedText"

export function CallToAction() {
  return (
    <section id="contact" className="py-32 md:py-24 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Поехали вместе</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-8 text-balance">
            Готов к
            <br />
            <HighlightedText>первой поездке</HighlightedText>?
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Зарегистрируйся сейчас и получи первые 30 минут бесплатно. Движение — это просто!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center gap-3 bg-green-400 text-primary font-bold px-8 py-4 rounded-xl text-sm tracking-wide hover:bg-green-300 transition-colors duration-300 group"
            >
              Зарегистрироваться
              <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:88001111111"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-8 py-4 rounded-xl text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              <Icon name="Phone" size={16} />
              8 (800) 111-11-11
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
