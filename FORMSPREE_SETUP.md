# 📧 Konfiguracja Formspree dla ProSite Studio

## 🚀 Szybka Konfiguracja

Aby zamówienia naprawdę przychodziły na Twój Gmail **antoxscript@gmail.com**, wykonaj te kroki:

### Krok 1: Rejestracja w Formspree
1. Idź na [https://formspree.io/](https://formspree.io/)
2. Kliknij **"Get Started"**
3. Zarejestruj się za pomocą swojego Gmail

### Krok 2: Utworzenie Formularza
1. Po zalogowaniu kliknij **"New Form"**
2. Podaj:
   - **Form Name**: `ProSite Studio - Zamówienia`
   - **Email**: `antoxscript@gmail.com`
3. Kliknij **"Create Form"**

### Krok 3: Skopiowanie Endpoint URL
1. Po utworzeniu formularza zobaczysz **Endpoint URL**
2. Będzie wyglądać tak: `https://formspree.io/f/XXXXXXXX`
3. Skopiuj ten URL

### Krok 4: Aktualizacja Kodu
1. Otwórz plik `script.js`
2. Znajdź linię z `FORMSPREE_CONFIG`
3. Zamień endpoint na swój:

```javascript
const FORMSPREE_CONFIG = {
    ENDPOINT: 'https://formspree.io/f/TWOJ_ENDPOINT_ID'  // Wklej tutaj swój endpoint
};
```

### Krok 5: Test
1. Otwórz stronę w przeglądarce
2. Wypełnij formularz zamówienia
3. Wyślij formularz
4. Sprawdź Gmail - powinieneś otrzymać email!

## 🎯 Co Otrzymasz w Email

Każde zamówienie będzie zawierać:

```
🚀 NOWE ZAMÓWIENIE - PROSITE STUDIO
Otrzymano: [data i czas]

═══════════════════════════════════════

👤 NICK OSOBY: [nick klienta]
🎨 INSPIRACJA: [link do strony]
🌐 NAZWA STRONY: [nazwa projektu]

📝 OPIS PROJEKTU:
[szczegółowy opis]

═══════════════════════════════════════

💡 NASTĘPNE KROKI:
• Skontaktuj się z klientem w ciągu 24h
• Omów szczegóły projektu
• Ustal harmonogram realizacji
• Rozpocznij pracę nad projektem

🤖 Wiadomość wygenerowana automatycznie przez system ProSite Studio
```

## 🎉 Powiadomienia o Rejestracji

System również wyśle Ci powiadomienie gdy ktoś się zarejestruje:

```
🎉 NOWA REJESTRACJA - PROSITE STUDIO
Data: [data i czas]

═══════════════════════════════════════

👤 NOWY UŻYTKOWNIK:
• Imię i nazwisko: [imię]
• Email: [email]

═══════════════════════════════════════

💡 AKCJE DO WYKONANIA:
• Wyślij email powitalny
• Dodaj do listy mailingowej
• Przygotuj materiały promocyjne
```

## 🔧 Rozwiązywanie Problemów

### Problem: Nie otrzymuję emaili
1. Sprawdź folder SPAM w Gmail
2. Zweryfikuj endpoint URL w `script.js`
3. Upewnij się, że formularz jest aktywny w Formspree

### Problem: Błąd 403 Forbidden
1. Sprawdź czy endpoint URL jest poprawny
2. Upewnij się, że formularz nie jest zablokowany

### Problem: Błąd CORS
1. Formspree automatycznie obsługuje CORS
2. Jeśli problem występuje, sprawdź konsolę przeglądarki

## 💰 Limity Formspree

**Plan Darmowy:**
- 50 submisji miesięcznie
- Podstawowe funkcje
- Email notifications

**Plan Płatny ($8.25/miesiąc):**
- 1000 submisji miesięcznie
- Zaawansowane funkcje
- Integracje

## ✅ Gotowe!

Po wykonaniu tych kroków:
1. ✅ Zamówienia będą przychodziły na antoxscript@gmail.com
2. ✅ Powiadomienia o rejestracji będą wysyłane
3. ✅ Wszystko będzie działać automatycznie
4. ✅ Nie będzie błędów wysyłania

**Ważne:** Pamiętaj, żeby zastąpić `https://formspree.io/f/antoxscript@gmail.com` swoim prawdziwym endpoint URL z Formspree!