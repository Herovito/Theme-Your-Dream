---
name: reference-beeldconversie
description: WebP-conversie kan lokaal met de al geïnstalleerde Python 3.14 plus Pillow 12.3; ImageMagick, cwebp en ffmpeg ontbreken juist wel.
metadata:
  type: reference
---

Voor het omzetten van de PNG's naar WebP is **geen nieuwe projectafhankelijkheid
nodig en geen npm-install**. Op deze machine staat:

- `python` 3.14.6 met **Pillow 12.3.0** (`python -c "import PIL"` werkt), en
  Pillow kan WebP schrijven met kwaliteit en `resize`.
- Niet aanwezig: `magick`, `cwebp`, `ffmpeg`. `convert` bestaat wel maar dat is
  `C:/WINDOWS/system32/convert`, het schijfconversieprogramma van Windows, niet
  ImageMagick. Daar niet in trappen.

Dit is een conversie op de werkplek, geen buildstap: de resultaten komen als
bestanden in de repo en `package.json` blijft ongewijzigd. Er is dus geen
bundlekost en geen runtimeafhankelijkheid.

**Uitgangsmateriaal (2026-07-27):** dertien PNG's, samen circa 32MB. Twaalf zijn
1536x1024 (`Tafelstyling met linnen, servies en droogbloemen.png` is 1537x1023),
`Portret.png` is 1024x1536. `logo.png` is 720x380 met alfa en blijft PNG.

**Let op bij het schrijven van de `<img>`-tags:** alle fotoklassen zetten hun
verhouding in CSS (`.site-photo--cinematic` 4/3 en vanaf 640px 21/9,
`--landscape` 16/9, `--portrait` 2/3, `.mood-card__img` 4/5) met
`object-fit: cover`. De `width`/`height` attributen zijn daardoor puur een
CLS-plaatshouder en mogen op de werkelijke bestandsmaat gezet worden zonder dat
de weergave verandert. De huidige waarden 1344x576 kloppen niet met de bestanden.

De bestandsnamen bevatten spaties, komma's en een apostrof. Bij nieuwe afgeleide
bestanden schone slugs gebruiken.

Gerelateerd: [[project-openstaande-fase1-bevindingen]], [[reference-headless-controle]].
