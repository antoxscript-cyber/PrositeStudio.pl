# 🧪 Instrukcja Testowania Systemu Czatu z Zapamiętywaniem Stanu

## 🔍 Jak Przetestować System:

### Krok 1: Otwórz Konsolę Przeglądarki (OPCJONALNIE)
1. **Otwórz stronę** `index.html`
2. **Naciśnij F12** PRZED załadowaniem strony (lub Ctrl+Shift+I)
3. **Przejdź do zakładki "Console"**
4. **UWAGA**: Ochrona kodu jest włączona - F12 może być zablokowane

### Krok 2: Zaloguj się jako Administrator
1. **Kliknij "Zaloguj"** w prawym górnym rogu
2. **Wpisz email**: `antoxscript@gmail.com`
3. **Wpisz hasło**: dowolne (np. `123456`)
4. **Kliknij "Zaloguj się"**

### Krok 3: Sprawdź Logi w Konsoli
Po zalogowaniu powinieneś zobaczyć w konsoli:
```
Sprawdzanie dostępu administratora: {"email":"antoxscript@gmail.com","name":"antoxscript","loginTime":"..."}
Dane użytkownika: {email: "antoxscript@gmail.com", name: "antoxscript", loginTime: "..."}
Email użytkownika: antoxscript@gmail.com
Czy to admin? true
Pokazuję zakładkę administratora
```

### Krok 4: Sprawdź Zakładkę Administratora
Po zalogowaniu powinieneś zobaczyć:
- **Zakładkę "📋 Zamówienia"** w nawigacji (obok FAQ)
- **Twoje imię** w prawym górnym rogu zamiast przycisków logowania

### Krok 5: Przetestuj Złożenie Zamówienia
1. **Przewiń do sekcji "Złóż zamówienie"**
2. **Wypełnij formularz**:
   - Email: `test@gmail.com`
   - Inspiracja: `https://example.com`
   - Nazwa: `Test strony`
   - Opis: `To jest test`
3. **Kliknij "Wyślij zamówienie"**
4. **Sprawdź czy pojawił się widget czatu** w prawym dolnym rogu

### Krok 6: Przetestuj Panel Administratora
1. **Kliknij zakładkę "📋 Zamówienia"**
2. **Sprawdź czy widzisz**:
   - Panel z listą zamówień po lewej
   - Okno czatu po prawej
   - Zamówienie testowe na liście

### Krok 7: Przetestuj Szczegóły Zamówienia
1. **Kliknij na zamówienie** z listy po lewej
2. **Sprawdź czy widzisz**:
   - Szczegóły zamówienia na górze (email, inspiracja, nazwa, opis, data, status)
   - Możliwość zmiany statusu zamówienia
   - Przycisk do zwijania/rozwijania szczegółów (🔽)

### Krok 8: Przetestuj Czat Administratora
1. **Napisz wiadomość** w polu na dole panelu
2. **Sprawdź czy wiadomość się wysłała**
3. **Sprawdź czy wiadomość pojawia się** w widgecie klienta

### Krok 9: Przetestuj Zapamiętywanie Stanu
1. **Odśwież stronę** (F5 lub Ctrl+R)
2. **Sprawdź czy**:
   - Nadal jesteś zalogowany jako administrator
   - Zakładka "📋 Zamówienia" jest nadal widoczna
   - Ostatnio wybrane zamówienie jest nadal aktywne
   - Czat z wiadomościami jest zachowany

### Krok 10: Przetestuj Widget Klienta
1. **Otwórz nową kartę** z tą samą stroną
2. **Złóż nowe zamówienie** (bez logowania)
3. **Sprawdź czy pojawił się widget czatu**
4. **Napisz wiadomość** jako klient
5. **Odśwież stronę** - widget powinien zostać z wiadomościami

### Krok 11: Przetestuj Powiadomienia o Nowych Wiadomościach
1. **W karcie z panelem administratora** sprawdź listę zamówień
2. **W karcie z klientem** napisz nową wiadomość
3. **Przełącz się na kartę administratora**
4. **Sprawdź czy widzisz**:
   - Czerwony wskaźnik z liczbą nieprzeczytanych wiadomości
   - Zamówienie podświetlone na czerwono
   - Pogrubioną nazwę użytkownika
   - Tytuł karty zmieniony na "(!) ZyraSite Studio..."
5. **Kliknij na zamówienie** - wskaźnik powinien zniknąć
6. **Sprawdź czy słyszysz dźwięk powiadomienia** (jeśli masz włączony dźwięk)

### Krok 12: Przetestuj Automatyczne Odświeżanie
1. **Zostań w panelu administratora**
2. **W karcie z klientem** napisz kolejną wiadomość
3. **Poczekaj 5 sekund** (nie przełączaj kart)
4. **Sprawdź czy**:
   - Lista zamówień automatycznie się odświeżyła
   - Pojawił się wskaźnik nowej wiadomości
   - Tytuł karty zmienił się na "(!) ZyraSite Studio..."
5. **Przejdź do innej sekcji** (np. kliknij "Start")
6. **Sprawdź czy tytuł karty wrócił do normalnego**

### Krok 13: Przetestuj System Opinii
1. **Przejdź do sekcji "Opinie"**
2. **Sprawdź czy nie ma przykładowych opinii** (Anna, Marcin)
3. **Wypełnij formularz opinii**:
   - Email: test@example.com
   - Ocena: 5 gwiazdek
   - Treść: "Świetna strona, polecam!"
4. **Wyślij opinię**
5. **Sprawdź czy**:
   - Opinia pojawiła się na liście
   - Nick to "test" (z emaila test@example.com)
   - Ocena to 5 gwiazdek
6. **Odśwież stronę** - opinia powinna zostać

## 🚨 Możliwe Problemy:

### Problem: Nie widzę zakładki "📋 Zamówienia"
**Rozwiązanie**:
1. Sprawdź logi w konsoli
2. Upewnij się, że email to dokładnie `antoxscript@gmail.com`
3. Odśwież stronę po zalogowaniu

### Problem: Błędy w konsoli
**Rozwiązanie**:
1. Sprawdź czy wszystkie pliki są w tym samym folderze
2. Upewnij się, że otwierasz `index.html` (nie kopiujesz kod)
3. Spróbuj w innej przeglądarce

### Problem: Widget czatu nie pojawia się
**Rozwiązanie**:
1. Sprawdź czy formularz został wysłany pomyślnie
2. Sprawdź logi w konsoli
3. Odśwież stronę i spróbuj ponownie

### Problem: Nie mogę otworzyć F12
**To normalne!** Ochrona kodu blokuje Developer Tools. Aby przetestować:
1. **Tymczasowo wyłącz ochronę** - znajdź w `script.js` linię z `detectDevTools()` i ją zakomentuj
2. **Lub użyj innej przeglądarki** do testowania
3. **Lub otwórz F12 PRZED** załadowaniem strony

## ✅ Co Powinno Działać:

### Dla Administratora (antoxscript@gmail.com):
- ✅ Zakładka "📋 Zamówienia" widoczna po zalogowaniu
- ✅ Panel z listą zamówień z przewijaniem
- ✅ Szczegóły zamówienia (email, inspiracja, nazwa, opis, data, status)
- ✅ Możliwość zmiany statusu zamówienia
- ✅ Możliwość pisania wiadomości do klientów
- ✅ Zapamiętywanie wybranego zamówienia po odświeżeniu
- ✅ Zachowanie czatów po odświeżeniu

### Dla Klientów:
- ✅ Widget czatu pojawia się po złożeniu zamówienia
- ✅ Możliwość pisania wiadomości z awatarem
- ✅ Otrzymywanie odpowiedzi od "ZyraSiteStudio"
- ✅ Zapamiętywanie widgetu i czatu po odświeżeniu
- ✅ Ładowanie wszystkich poprzednich wiadomości

### System Opinii:
- ✅ Usunięto przykładowe opinie (Anna, Marcin)
- ✅ Opinie zapisywane w localStorage
- ✅ Automatyczne ładowanie opinii po odświeżeniu
- ✅ Nick generowany automatycznie z emaila
- ✅ Walidacja formularza opinii

### Zapamiętywanie Stanu:
- ✅ Login/logout zachowany po odświeżeniu
- ✅ Aktywne zamówienie administratora zachowane
- ✅ Widget czatu klienta zachowany
- ✅ Wszystkie wiadomości zachowane
- ✅ Status zamówień zachowany

### Powiadomienia:
- ✅ Wskaźnik nieprzeczytanych wiadomości (czerwona kropka z liczbą)
- ✅ Podświetlenie zamówień z nowymi wiadomościami
- ✅ Automatyczne oznaczanie jako przeczytane po kliknięciu
- ✅ Dźwięk powiadomienia o nowych wiadomościach
- ✅ Animacja pulsowania wskaźnika
- ✅ Powiadomienie w tytule karty "(!) ZyraSite Studio..."
- ✅ Automatyczne odświeżanie listy zamówień co 5 sekund
- ✅ Zatrzymywanie odświeżania po opuszczeniu panelu administratora

### Ochrona:
- ✅ F12, Ctrl+U, prawy przycisk wyłączone
- ✅ Wykrywanie Developer Tools
- ✅ Niemożliwe kopiowanie kodu

**Jeśli wszystko działa - system jest gotowy! 🎉**