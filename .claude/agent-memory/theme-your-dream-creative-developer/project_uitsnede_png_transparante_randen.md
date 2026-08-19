---
name: uitsnede-png-transparante-randen
description: De Dionne-uitsnede-PNG heeft ongelijke transparante randen (18,1% links, 8,8% rechts) waardoor uitlijnen op het img-kader optisch fout uitpakt
metadata:
  type: project
---

`Dionne-removebg-preview.png` en `-v2.png` zijn identiek (408×612) en dragen
gemeten via alpha-bounds mee: **18,1% leeg links, 8,8% leeg rechts, 1,8% boven,
0% onder**. Alleen ~73% van de breedte is Dionne zelf.

**Why:** wie het `<img>`-kader uitlijnt op een as of het kader centreert, zet
niet Dionne op die as maar haar onzichtbare rand. Het verschil is bijna 10% van
de fotobreedte en dat zie je meteen. De onderkant staat op 0% lege ruimte: de
uitsnede eindigt hard halverwege haar onderbeen.

**How to apply:** compenseer met een negatieve marge die van een custom property
voor de fotobreedte wordt afgeleid, niet met een percentage-marge (die rekent
tegen de container, niet tegen de foto). Voor rechts uitlijnen op een as:
`margin-right: calc(var(--foto-breedte) * -0.088)`. Voor optisch centreren
gestapeld: `margin-right: calc(var(--foto-breedte) * 0.093)`. Vang de harde
onderrand af met een `mask-image: linear-gradient(to bottom, #000 84%, transparent)`,
in lijn met [[project-hero-split-homepage]] waar fotoranden ook gemaskeerd zijn.

Andere beeldbestanden op de site zijn niet vrijstaand; dit speelt alleen bij
deze uitsnede.
