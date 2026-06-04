export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="font-bold text-2xl tracking-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                турбо<span className="text-green-500">.</span>
              </span>
            </a>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Сервис аренды самокатов. Движение — это просто! Доступно, удобно и выгодно в любой точке города.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Навигация</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#promos" className="hover:text-foreground transition-colors">Акции</a></li>
              <li><a href="/booking" className="hover:text-foreground transition-colors">Бронирование</a></li>
              <li><a href="/parkings" className="hover:text-foreground transition-colors">Парковки</a></li>
              <li><a href="/profile" className="hover:text-foreground transition-colors">Личный кабинет</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="tel:88001111111" className="hover:text-foreground transition-colors">
                  8 (800) 111-11-11
                </a>
              </li>
              <li>
                <a href="mailto:hello@turbo.ru" className="hover:text-foreground transition-colors">
                  hello@turbo.ru
                </a>
              </li>
              <li><a href="#" className="hover:text-foreground transition-colors">Телеграм</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">ВКонтакте</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Турбо. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
