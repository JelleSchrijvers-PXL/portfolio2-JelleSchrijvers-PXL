# Portfolio WPL2 - Jelle Schrijvers

Dit is mijn portfolio voor Werkplekleren 2. Voor deze opdracht vertrok ik vanuit mijn portfolio van WPL1, maar ik heb het project niet gewoon een kleine update gegeven. In plaats daarvan heb ik de nieuwe leerstof van WPL2 verwerkt en een nieuwe versie gebouwd met Vue.

Het doel van dit portfolio is om mijn werk, groei en reflecties overzichtelijk te tonen. De website bevat informatie over mezelf, mijn projecten, mijn cv en verschillende opdrachten of reflecties die tijdens WPL aan bod kwamen.

## Van WPL1 naar WPL2

Mijn portfolio van WPL1 was vooral gebaseerd op gewone webdevelopment met HTML, CSS en JavaScript. Voor WPL2 wilde ik tonen dat ik met modernere frontendtechnieken kan werken. Daarom heb ik het portfolio opnieuw opgebouwd als Vue-project.

Door Vue te gebruiken kon ik mijn website beter opdelen in componenten. Onderdelen zoals de navigatie, footer, projectweergaves en verschillende inhoudsblokken zijn daardoor overzichtelijker opgebouwd en makkelijker te onderhouden.

## Gebruikte technologieen

- Vue
- Vite
- Vue Router
- Vue I18n
- HTML
- CSS
- JavaScript
- GitHub Pages

## Belangrijke aanpassingen

Voor WPL2 heb ik vooral gewerkt aan een betere structuur en een professionelere opbouw van het project. De website gebruikt nu routing, herbruikbare componenten en meertaligheid via i18n. Daardoor is het project minder statisch dan mijn vorige portfolio en sluit het beter aan bij de leerstof van dit semester.

Ook de inhoud werd aangepast. Ik heb nieuwe projecten, reflecties en documenten toegevoegd zodat het portfolio beter weergeeft waar ik tijdens WPL2 mee bezig ben geweest.

## Problemen en uitdagingen

Tijdens het project ben ik vooral tegen twee grotere uitdagingen gelopen.

De eerste uitdaging was het deployen van de Vue-applicatie. Omdat het project niet in de rootmap staat maar in de map `portfolio`, moest de build- en deployconfiguratie juist ingesteld worden. Ook moest de `base` in Vite correct staan voor GitHub Pages, zodat de CSS, JavaScript en assets op de juiste locatie worden ingeladen.

De tweede uitdaging was i18n. Ik moest uitzoeken hoe Vue I18n precies werkt, hoe vertalingen worden ingeladen en hoe teksten op een nette manier in aparte taalbestanden geplaatst kunnen worden. Dat vroeg wat opzoekwerk, maar het heeft ervoor gezorgd dat mijn project beter gestructureerd is.

## Project lokaal starten

Ga eerst naar de projectmap:

```sh
cd portfolio
```

Installeer de dependencies:

```sh
npm install
```

Start de development server:

```sh
npm run dev
```

Maak een productiebuild:

```sh
npm run build
```

## Deployment

De website wordt gedeployed via GitHub Pages. Na een succesvolle build wordt de inhoud van de `dist` map online gezet.

Live website:

[https://jelleschrijvers-pxl.github.io/portfolio2-JelleSchrijvers-PXL/](https://jelleschrijvers-pxl.github.io/portfolio2-JelleSchrijvers-PXL/)

## Reflectie

Door dit portfolio opnieuw op te bouwen met Vue heb ik beter leren werken met componenten, routing, meertaligheid en deployment. Het project was niet altijd vanzelfsprekend, vooral bij GitHub Pages en i18n, maar net daardoor heb ik beter leren begrijpen hoe een moderne frontendapplicatie in elkaar zit.
