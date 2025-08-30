# 📧 Konfiguracja EmailJS dla ZyraSite Studio

## 🚀 Szybki Start

Twoja strona jest już skonfigurowana do automatycznego wysyłania zamówień na **antoxscript@gmail.com**!

## 📋 Instrukcja Konfiguracji EmailJS

### Krok 1: Rejestracja w EmailJS
1. Idź na [https://www.emailjs.com/](https://www.emailjs.com/)
2. Zarejestruj się lub zaloguj
3. Przejdź do Dashboard

### Krok 2: Konfiguracja Serwisu Email
1. Kliknij **"Add New Service"**
2. Wybierz **Gmail**
3. Podaj dane:
   - **Service ID**: `service_zyrasite`
   - **Email**: `antoxscript@gmail.com`
4. Autoryzuj dostęp do Gmail
5. Zapisz serwis

### Krok 3: Utworzenie Szablonu Email
1. Przejdź do zakładki **"Email Templates"**
2. Kliknij **"Create New Template"**
3. Ustaw:
   - **Template ID**: `template_zamowienie`
   - **Template Name**: `Zamówienie ZyraSite Studio`

### Krok 4: Konfiguracja Szablonu
W edytorze szablonu ustaw:

**Temat:**
```
{{subject}}
```

**Treść (HTML):**
```html
{{{message_html}}}
```

**Ustawienia:**
- **To Email**: `antoxscript@gmail.com`
- **From Name**: `{{from_name}}`
- **Reply To**: `noreply@zyrasite.com`

### Krok 5: Pobranie Klucza Publicznego
1. Przejdź do **"Account"** → **"General"**
2. Skopiuj **Public Key**
3. Jeśli klucz różni się od `qJzlJBBqLhYOKmQpH`, zaktualizuj go w pliku `script.js`

## 🎨 Jak Wygląda Email

Każde zamówienie zostanie wysłane jako elegancka wiadomość HTML zawierająca:

- 🎯 **Nagłówek** z logo i datą otrzymania
- 📊 **Tabelę** z danymi zamówienia:
  - 👤 Nick osoby
  - 🎨 Link do inspiracji
  - 🌐 Nazwa strony
  - 📝 Opis projektu
- 💡 **Sekcję** z następnymi krokami
- 🤖 **Stopkę** z informacją o automatycznym wysłaniu

## 🔧 Rozwiązywanie Problemów

### Problem: Emails nie docierają
1. Sprawdź folder SPAM w Gmail
2. Zweryfikuj autoryzację Gmail w EmailJS
3. Upewnij się, że Service ID i Template ID są poprawne

### Problem: Błąd wysyłania
1. Sprawdź konsolę przeglądarki (F12)
2. Zweryfikuj Public Key w EmailJS
3. Upewnij się, że szablon zawiera `{{{message_html}}}`

### Problem: Nieprawidłowe formatowanie
1. Upewnij się, że używasz `{{{message_html}}}` (3 nawiasy klamrowe)
2. Sprawdź czy szablon jest ustawiony na HTML

## 📞 Wsparcie

Jeśli masz problemy z konfiguracją:
1. Sprawdź dokumentację EmailJS: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Skontaktuj się z supportem EmailJS
3. Sprawdź logi w konsoli przeglądarki

## 🎉 Gotowe!

Po prawidłowej konfiguracji każde zamówienie złożone przez formularz na stronie zostanie automatycznie wysłane na **antoxscript@gmail.com** w pięknie sformatowanej wiadomości HTML!