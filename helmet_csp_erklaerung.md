# Erklärung aller Helmet- und CSP-Optionen

```js

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        styleSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        reportUri: ["/csp-report"],
      },
    },
    referrerPolicy: { policy: "no-referrer" },
    hsts: {
      maxAge: 63072000, // 2 Jahre in Sekunden
      includeSubDomains: true,
      preload: true,
    },
    xssFilter: true,
    noSniff: true,
    frameguard: { action: "deny" },
    hidePoweredBy: true,
  })
);

```

Diese Datei erklärt jede Direktive und Regel aus der Helmet-Konfiguration im Detail.

---

## Content Security Policy (CSP) Direktiven

- **defaultSrc**: Gibt die Standardquelle für alle Ressourcen an, die nicht explizit durch andere Direktiven abgedeckt sind. `'self'` bedeutet, dass nur Inhalte von der eigenen Domain geladen werden dürfen.
- **scriptSrc**: Bestimmt, von welchen Quellen Skripte geladen werden dürfen. `'self'` erlaubt nur eigene Skripte.
- **connectSrc**: Regelt, wohin Verbindungen (z.B. via fetch, WebSocket, XHR) aufgebaut werden dürfen. `'self'` beschränkt dies auf die eigene Domain.
- **imgSrc**: Gibt an, von wo Bilder geladen werden dürfen. `'self'` für eigene Domain, `data:` erlaubt eingebettete Bilder (z.B. als Base64).
- **styleSrc**: Bestimmt, von wo CSS geladen werden darf. `'self'` erlaubt nur eigene Stylesheets.
- **fontSrc**: Gibt an, von wo Schriftarten geladen werden dürfen. `'self'` erlaubt nur eigene Fonts.
- **objectSrc**: Regelt, von wo Plugins wie Flash, Java oder andere eingebettete Objekte geladen werden dürfen. `'none'` verbietet dies komplett.
- **frameAncestors**: Gibt an, welche Seiten diese Seite in einem `<frame>`, `<iframe>`, `<object>`, `<embed>` oder `<applet>` einbetten dürfen. `'none'` verbietet jegliches Framing (Schutz vor Clickjacking).
- **baseUri**: Bestimmt, von wo das `<base>`-Element geladen werden darf. `'self'` beschränkt dies auf die eigene Domain.
- **reportUri**: Gibt eine URL an, an die der Browser Verstöße gegen die CSP melden soll. `/csp-report` ist ein Beispiel-Endpunkt.

---

## Weitere Helmet-Optionen

- **referrerPolicy**: Steuert, welche Referrer-Informationen (Herkunfts-URL) beim Laden von Ressourcen oder beim Navigieren an andere Seiten gesendet werden. `no-referrer` bedeutet, dass keine Referrer-Informationen übertragen werden.
- **hsts** (HTTP Strict Transport Security): Erzwingt die Nutzung von HTTPS. 
  - `maxAge`: Wie lange (in Sekunden) der Browser nur HTTPS akzeptiert (hier: 2 Jahre).
  - `includeSubDomains`: Gilt auch für alle Subdomains.
  - `preload`: Ermöglicht die Aufnahme in die HSTS-Preload-Liste der Browser.
- **xssFilter**: Aktiviert einen XSS-Filter im Browser (wird von modernen Browsern oft ignoriert, aber als zusätzliche Maßnahme enthalten).
- **noSniff**: Verhindert, dass der Browser den MIME-Type von Dateien "errät" (Schutz vor bestimmten Angriffen, z.B. MIME-Sniffing).
- **frameguard**: Verhindert, dass die Seite in einem Frame oder iFrame angezeigt wird (`deny` = komplett verbieten, Schutz vor Clickjacking).
- **hidePoweredBy**: Entfernt den `X-Powered-By`-Header, damit Angreifer nicht sehen, welche Technologie (z.B. Express) verwendet wird.

---

## Zusammenfassung

Diese Einstellungen sorgen für ein hohes Maß an Sicherheit, indem sie die erlaubten Ressourcen und das Verhalten des Browsers stark einschränken. Sie schützen vor XSS, Clickjacking, Datenlecks und anderen Angriffen.

**Tipp:** Passe die Direktiven an deine tatsächlichen Anforderungen an, falls du z.B. externe Skripte, Fonts oder APIs nutzen möchtest.
