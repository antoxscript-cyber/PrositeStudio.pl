# 🚀 Szybki Start - ProSite Studio

## ⚡ 5 Minut do Działającej Strony!

### Krok 1: Konfiguracja Formspree (2 minuty)
1. Idź na [formspree.io](https://formspree.io)
2. Zarejestruj się (darmowe)
3. Utwórz nowy formularz z emailem `antoxscript@gmail.com`
4. Skopiuj endpoint URL (np. `https://formspree.io/f/abc123`)
5. W pliku `script.js` znajdź linię:
   ```javascript
   ENDPOINT: 'https://formspree.io/f/antoxscript@gmail.com'
   ```
   I zamień na swój endpoint:
   ```javascript
   ENDPOINT: 'https://formspree.io/f/TWOJ_ENDPOINT'
   ```

### Krok 2: Test Strony (1 minuta)
1. Otwórz `index.html` w przeglądarce
2. Sprawdź czy wszystko wygląda dobrze
3. Kliknij "Rejestracja" - powinien otworzyć się modal

### Krok 3: Test Zamówienia (2 minuty)
1. Przewiń do sekcji "Złóż zamówienie"
2. Wypełnij formularz testowymi danymi:
   - Nick: TestUser
   - Inspiracja: https://example.com
   - Nazwa: Test Website
   - Opis: To jest test
3. Kliknij "Wyślij zamówienie"
4. Sprawdź Gmail - powinieneś otrzymać email!

## ✅ Gotowe!

Jeśli otrzymałeś email, wszystko działa! 🎉

## 🔧 Co Dalej?

### Opcjonalne Ulepszenia:
- **Własna Domena**: Kup domenę i hosting
- **SSL**: Dodaj certyfikat SSL
- **Analytics**: Dodaj Google Analytics
- **SEO**: Zoptymalizuj pod wyszukiwarki

### Personalizacja:
- Zmień logo w `index.html` (linia 19 i 45)
- Dostosuj kolory w `styles.css` (zmienne CSS na górze)
- Dodaj swoje zdjęcia i treści

## 🆘 Problemy?

### Email nie przychodzi?
1. Sprawdź folder SPAM
2. Zweryfikuj endpoint w `script.js`
3. Sprawdź czy formularz jest aktywny w Formspree

### Strona nie działa?
1. Otwórz konsolę przeglądarki (F12)
2. Sprawdź czy są błędy JavaScript
3. Upewnij się, że wszystkie pliki są w tym samym folderze

### Inne problemy?
- Sprawdź `README.md` - szczegółowe instrukcje
- Sprawdź `FORMSPREE_SETUP.md` - konfiguracja emaili

## 📞 Wsparcie

Jeśli masz problemy:
1. Sprawdź dokumentację w plikach `.md`
2. Otwórz konsolę przeglądarki i sprawdź błędy
3. Przetestuj za pomocą `TEST_EMAIL.html`

**Powodzenia z Twoją nową stroną! 🚀**