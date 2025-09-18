# Cyber Security in Frontend und Backend Entwicklung

## 1. Bedeutung von Cyber Security in der Softwareentwicklung

Cyber Security (IT-Sicherheit) ist essenziell, um Software und Daten vor Angriffen, Missbrauch und Manipulation zu schützen. Ohne Sicherheitsmaßnahmen können Angreifer sensible Daten stehlen, Systeme lahmlegen oder Schadcode einschleusen. Besonders Webanwendungen sind beliebte Ziele, da sie öffentlich erreichbar sind und oft mit Benutzerdaten arbeiten.

**Wichtige Ziele:**
- Schutz von Benutzerdaten (z.B. Passwörter, persönliche Informationen)
- Verhinderung von Datenverlust oder -manipulation
- Sicherstellung der Verfügbarkeit der Anwendung

---

## 2. XSS / JS Injection

**XSS (Cross-Site Scripting):**
- Angreifer schleusen schädlichen JavaScript-Code in Webseiten ein, der dann im Browser anderer Nutzer ausgeführt wird.
- Ziel: z.B. Cookies stehlen, Nutzerkonten übernehmen, falsche Inhalte anzeigen.

**Beispiel:**  
Ein Nutzer gibt `<script>alert('Hacked!')</script>` als Kommentar ab. Wird dieser ungefiltert angezeigt, öffnet sich bei anderen Nutzern ein Popup.

**JS Injection:**  
Allgemeiner Begriff für das Einschleusen von JavaScript-Code in eine Anwendung, meist durch unsichere Benutzereingaben.

---

## 3. Schutzmaßnahmen im Beispiel-Projekt

### Frontend

- **Benutzereingaben niemals direkt als HTML anzeigen!**
  - In React werden Inhalte standardmäßig als Text gerendert, was XSS verhindert.
  - Nur in Ausnahmefällen `dangerouslySetInnerHTML` verwenden – und dann nur mit geprüften Inhalten.
- **Validierung und Escaping von Eingaben**
  - Eingaben auf erlaubte Zeichen prüfen (z.B. keine HTML-Tags erlauben).
- **Abhängigkeiten aktuell halten**
  - Sicherheitslücken in Bibliotheken werden regelmäßig geschlossen.

### Backend

- **Eingaben validieren und bereinigen**
  - Z.B. mit Bibliotheken wie `express-validator` oder eigenen Prüfungen.
- **Prepared Statements / ORM verwenden**
  - Prisma schützt vor SQL-Injection, indem es Parameter automatisch escaped.
- **HTTP-Header setzen**
  - Z.B. mit `helmet` wichtige Sicherheits-Header aktivieren:
    ```js
    import helmet from 'helmet';
    app.use(helmet());
    ```
- **Fehlermeldungen nicht zu detailliert ausgeben**
  - Stacktraces und interne Infos nicht an den Client senden.
- **CORS richtig konfigurieren**
  - Nur vertrauenswürdige Domains erlauben.

---

## Zusammenfassung

Cyber Security ist ein zentraler Bestandteil moderner Softwareentwicklung. Schon einfache Maßnahmen wie Validierung, Escaping und sichere Frameworks helfen, viele Angriffe zu verhindern. Im Beispiel-Projekt schützen wir uns vor allem durch:
- Sichere Datenbankzugriffe (Prisma)
- Validierung und Escaping von Eingaben
- Sichere Standardkonfigurationen in React und Express

**Weiterführende Links:**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security](https://react.dev/learn/security)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## XSS (Cross-Site Scripting) und JS Injection – Tiefergehende Erklärung

### Was ist XSS?

**Cross-Site Scripting (XSS)** ist eine Sicherheitslücke, bei der Angreifer schädlichen JavaScript-Code in Webseiten einschleusen, der dann im Browser anderer Nutzer ausgeführt wird. Das passiert meist, wenn Benutzereingaben ungeprüft oder unescaped in die Webseite eingebunden werden.

#### Arten von XSS

1. **Stored XSS (Gespeichertes XSS):**
   - Der Angreifer speichert den Schadcode dauerhaft auf dem Server (z.B. als Kommentar, Forenbeitrag).
   - Jeder Nutzer, der die Seite besucht, bekommt den Code ausgeliefert.

2. **Reflected XSS (Reflektiertes XSS):**
   - Der Schadcode wird über die URL oder ein Formular eingeschleust und direkt im Server-Response zurückgegeben.
   - Beispiel: Ein Suchfeld gibt die Suchanfrage ungefiltert im HTML zurück.

3. **DOM-based XSS:**
   - Der Angriff findet komplett im Browser statt, z.B. wenn JavaScript im Frontend unsichere Daten direkt ins DOM schreibt.

#### Was kann ein Angreifer mit XSS tun?

- Cookies und Session-Daten stehlen (Identitätsdiebstahl)
- Aktionen im Namen des Nutzers ausführen
- Falsche Inhalte anzeigen (Phishing)
- Schadcode nachladen

#### Beispiel für XSS

```html
<!-- Angreifer gibt als Kommentar ein: -->
<script>alert('Hacked!')</script>
<!-- Wird dieser Kommentar ungefiltert angezeigt, öffnet sich bei jedem Besucher ein Popup. -->
```

---

## CSRF (Cross-Site Request Forgery) und Schutzmechanismen

**CSRF** ist eine Angriffsmethode, bei der ein Angreifer einen eingeloggten Nutzer dazu bringt, unbeabsichtigt Aktionen auf einer Webseite auszuführen, ohne dessen Wissen. Zum Beispiel könnte ein Angreifer ein unsichtbares Formular auf einer fremden Seite einbinden, das im Hintergrund eine Anfrage an die Zielseite schickt, auf der der Nutzer eingeloggt ist.

### Schutz vor CSRF

#### 1. CSRF-Token

Ein CSRF-Token ist ein eindeutiger, zufällig generierter Wert, der bei jedem Formular oder jeder Anfrage mitgesendet wird. Der Server prüft, ob das Token gültig ist und nur dann wird die Anfrage akzeptiert. Da ein Angreifer das Token nicht kennt, kann er keine gültige Anfrage erzeugen.

#### 2. Double Cookie Pattern

Beim Double Cookie Pattern wird ein CSRF-Token sowohl als Cookie als auch als Wert im Request (z.B. als Header oder Formularfeld) vom Client an den Server gesendet. Der Server akzeptiert die Anfrage nur, wenn beide Werte übereinstimmen. So wird verhindert, dass ein Angreifer, der nur Zugriff auf die Cookies hat, eine gültige Anfrage erzeugen kann.

**Ablauf:**
- Server setzt ein CSRF-Token als Cookie.
- Client liest das Token aus dem Cookie und sendet es zusätzlich im Header/Formular.
- Server prüft, ob beide Werte identisch sind.

---

## Content Security Policy (CSP), Helmet und CORS

### Content Security Policy (CSP)

CSP ist ein HTTP-Header, der dem Browser mitteilt, welche Ressourcen (z.B. Skripte, Styles, Bilder) geladen werden dürfen. Damit kann man viele XSS-Angriffe verhindern, weil fremde Skripte blockiert werden.

**Beispiel mit Helmet in Express:**
```js
import helmet from "helmet";
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
  }
}));
```

### CORS (Cross-Origin Resource Sharing)

CORS ist ein Mechanismus, der steuert, welche Domains auf Ressourcen deines Servers zugreifen dürfen. Standardmäßig sind Anfragen von anderen Domains blockiert. Mit CORS kannst du gezielt erlauben, welche Frontends mit deinem Backend kommunizieren dürfen.

**Beispiel in Express:**
```js
import cors from "cors";
app.use(cors({
  origin: "http://localhost:5173", // Nur diese Domain darf zugreifen
  credentials: true
}));
```

---

## Rate Limiting, DDoS-Schutz und IP-Banning

### Rate Limiting

Rate Limiting begrenzt die Anzahl der Anfragen, die ein Nutzer (bzw. eine IP-Adresse) in einem bestimmten Zeitraum an den Server senden darf. Das schützt vor Missbrauch (z.B. Brute-Force-Angriffen) und entlastet den Server.

**Beispiel mit express-rate-limit:**
```js
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // max. 100 Anfragen pro IP
  message: 'Zu viele Anfragen, bitte später erneut versuchen.'
});
app.use(limiter);
```

### DDoS-Schutz

Ein DDoS-Angriff (Distributed Denial of Service) versucht, den Server mit sehr vielen Anfragen lahmzulegen. Rate Limiting hilft gegen einfache Angriffe, für größere Angriffe braucht man oft spezialisierte Dienste (z.B. Cloudflare, spezielle Firewalls).

### IP-Banning

Bei wiederholtem Missbrauch oder Angriffen kann es sinnvoll sein, bestimmte IP-Adressen temporär oder dauerhaft zu sperren. Das kann man z.B. mit einer Middleware oder durch Einträge in einer Datenbank/Blacklist umsetzen.

**Beispiel (einfach):**
```js
const bannedIps = ['1.2.3.4'];
app.use((req, res, next) => {
  if (bannedIps.includes(req.ip)) {
    return res.status(403).send('Deine IP ist gesperrt.');
  }
  next();
});
```

---

## HTTPS und Schutz vor Phishing

### HTTPS (TLS/SSL)

HTTPS verschlüsselt die Kommunikation zwischen Client und Server. So können Passwörter, Cookies und andere sensible Daten nicht von Dritten mitgelesen oder manipuliert werden. Jede produktive Webanwendung sollte HTTPS verwenden!

**Zertifikate mit Let's Encrypt und Certbot:**
- Let's Encrypt bietet kostenlose SSL-Zertifikate.
- Mit Certbot kann man Zertifikate einfach erstellen und automatisch erneuern.

**Beispiel (Linux, nginx):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d deine-domain.de
```
Danach ist die Seite über HTTPS erreichbar. Certbot kann auch für Apache oder standalone genutzt werden.

**Wichtig:**
- HTTP auf HTTPS umleiten
- Zertifikate regelmäßig erneuern (Certbot macht das meist automatisch)

### Schutz vor Phishing

Phishing bedeutet, dass Angreifer gefälschte Webseiten erstellen, die wie deine echte Seite aussehen, um an Passwörter oder andere Daten zu kommen.

**Schutzmaßnahmen:**
- Nutzer immer auf die richtige Domain achten lassen (z.B. durch Hinweise im Login-Formular)
- HTTPS verwenden und auf gültige Zertifikate achten
- Keine sensiblen Daten auf unsicheren Seiten eingeben
- Bei verdächtigen E-Mails/Links immer die URL prüfen
- Optional: Zwei-Faktor-Authentifizierung anbieten

**Für Entwickler:**
- Login-Formulare und sensible Seiten nur über HTTPS ausliefern
- Content Security Policy (CSP) nutzen, um das Nachladen fremder Inhalte zu verhindern
- Nutzer regelmäßig über Phishing-Gefahren informieren

---

Mit HTTPS und Aufklärung über Phishing schützt du deine Nutzer und ihre Daten effektiv vor vielen Angriffen im Web.
