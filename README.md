<div align="center">

# JENNIFER — CHAPTER 23

**Une expérience numérique immersive, imaginée par un frère pour sa sœur.**

Une célébration de ses 23 ans à travers le mouvement, la photographie, des vœux interactifs et une lettre scellée.

<br />

![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/Project-personal%20experience-C8A77B?style=flat-square)

[Voir le dépôt](https://github.com/KennethKpn/SISTER-Birthday) · [Signaler un problème](https://github.com/KennethKpn/SISTER-Birthday/issues)

</div>

---

## L'intention

**Chapter 23** transforme un message d'anniversaire en un petit parcours à explorer.

L'expérience commence par une ouverture festive, traverse une scène typographique en perspective, puis présente les photographies de Jennifer dans un ruban d'images incurvé. Le visiteur découvre ensuite des vœux, avant de terminer sur une lettre qui s'écrit progressivement et reçoit son sceau.

La direction artistique associe un fond noir profond, une typographie éditoriale, des accents champagne et une matière papier chaleureuse. Le résultat cherche l'équilibre entre esthétique glamour, émotion familiale et interactions sobres.

> Ce projet est une création personnelle. Il privilégie le récit et le soin apporté aux détails plutôt qu'une accumulation d'effets décoratifs.

## Parcours de l'expérience

| Séquence | Expérience |
| --- | --- |
| **01 — Ouverture** | Ballons animés et bouton d'entrée dans la surprise. |
| **02 — Poème cinématique** | Scène en perspective 3D, cube typographique, murs lumineux et sol en profondeur. |
| **03 — Portrait stream** | Ruban de photographies qui tourne autour d'un axe incurvé, avec fondu sur les bords. |
| **04 — Archive** | Galerie de portraits ouvrant une visionneuse accessible au clavier. |
| **05 — Vœux** | Quatre cartes interactives à révéler individuellement. |
| **06 — Lettre** | Papyrus qui se déroule, texte révélé progressivement, signature et sceau de cire. |
| **07 — Conclusion** | Dernier message et possibilité de rejouer le parcours. |

## Direction artistique & responsive

Le site est conçu pour les écrans larges comme pour les téléphones.

- Le ruban de portraits recalcule sa géométrie grâce à `ResizeObserver` et utilise les unités de conteneur pour conserver ses proportions.
- Le nombre de tuiles est plafonné afin de limiter le travail de rendu.
- Les galeries s'organisent différemment sur les petits écrans ; la visionneuse devient une colonne et reste défilable.
- Les tailles de titres et les espacements s'adaptent avec `clamp()`, sans dépendre d'une réduction uniforme de la mise en page.
- Les utilisateurs ayant activé la réduction des animations reçoivent une présentation moins animée.
- Les images de la galerie secondaire sont chargées à la demande et décodées de manière asynchrone.

## Stack technique

| Technologie | Utilisation |
| --- | --- |
| [React](https://react.dev/) | Composition de l'interface et interactions. |
| [TypeScript](https://www.typescriptlang.org/) | Typage strict des composants et des états. |
| [Vite](https://vite.dev/) | Serveur de développement et build de production. |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utilitaires de mise en page du composant de galerie. |
| [Lucide React](https://lucide.dev/) | Icônes de navigation et d'interaction. |
| [Google Fonts](https://fonts.google.com/) | DM Sans, DM Mono et Playfair Display. |

Aucun backend n'est nécessaire. Les interactions restent locales au navigateur et aucun compte utilisateur n'est demandé.

## Démarrage rapide

### Prérequis

- Node.js **20.19+** (Node.js 22 LTS recommandé).
- npm.
- Git.

### 1. Cloner le dépôt

```powershell
git clone https://github.com/KennethKpn/SISTER-Birthday.git
cd SISTER-Birthday
```

### 2. Installer les dépendances

```powershell
npm install --no-audit --no-fund
```

Sur les versions récentes de npm qui bloquent les scripts d'installation non approuvés, vérifier l'autorisation de `esbuild` :

```powershell
npm install-scripts ls
npm install-scripts approve esbuild
```

Cette autorisation concerne le script d'installation du binaire utilisé par Vite. Ne pas désactiver globalement les contrôles de scripts npm.

### 3. Ajouter les portraits

Les fichiers photographiques personnels ne sont pas intégrés au code source dans cette branche. Placer les sept fichiers WebP fournis dans :

```text
public/
└── images/
    ├── jennifer-01.webp
    ├── jennifer-02.webp
    ├── jennifer-03.webp
    ├── jennifer-04.webp
    ├── jennifer-05.webp
    ├── jennifer-06.webp
    └── jennifer-07.webp
```

Si l'archive des portraits a été téléchargée dans le dossier Téléchargements :

```powershell
Expand-Archive -LiteralPath "$HOME\Downloads\jennifer-portraits-retry.zip" -DestinationPath . -Force
```

Vérifier ensuite :

```powershell
Get-ChildItem .\public\images
```

Les chemins sont utilisés directement par le navigateur. Sans ces fichiers, les emplacements photo resteront vides ; le code peut néanmoins être vérifié et compilé.

### 4. Lancer le serveur local

```powershell
npm run dev
```

Vite affiche l'adresse locale, généralement [http://localhost:5173](http://localhost:5173).

## Commandes utiles

| Commande | Résultat |
| --- | --- |
| `npm run dev` | Démarre le serveur local. |
| `npm run typecheck` | Vérifie les types TypeScript. |
| `npm run build` | Génère le build de production. |
| `npm run check` | Exécute le contrôle TypeScript puis le build. |
| `npm run preview` | Sert localement le build généré. |

Avant de publier une modification :

```powershell
npm run check
```

## Structure du projet

```text
SISTER-Birthday/
├── .github/
│   └── workflows/
│       └── quality.yml
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/                  # portraits WebP fournis séparément
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── tilted-grid-hero.tsx
│   ├── App.tsx                  # parcours et états interactifs
│   ├── index.css                # direction artistique et responsive
│   └── main.tsx                 # entrée React
├── index.html                   # métadonnées et entrée Vite
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Qualité, accessibilité et visibilité

- **TypeScript strict** : les contrôles sont inclus dans la commande `check`.
- **Contrôle automatisé** : GitHub Actions exécute le contrôle TypeScript et le build sur les pushes et les pull requests vers `main`.
- **Navigation clavier** : la visionneuse se ferme avec `Échap` et passe au portrait précédent/suivant avec les flèches.
- **États de focus** : les boutons et liens présentent un contour de focus visible.
- **Motion** : prise en compte de `prefers-reduced-motion`.
- **Métadonnées** : titre, description, Open Graph et Twitter Card sont définis dans `index.html`.
- **Chargement des images** : préchargement du ruban principal et chargement différé de la galerie secondaire.

Le build automatisé ne remplace pas une vérification visuelle sur un vrai téléphone. Les dimensions, la fluidité des animations et le comportement tactile doivent aussi être contrôlés dans le navigateur.

## Confidentialité des photographies

Le dépôt GitHub est actuellement public. Les fichiers placés dans `public/images/` et tout site publié à partir de ces fichiers seront accessibles publiquement.

Ne placer dans ce dossier que des photographies que Jennifer accepte de voir publiées. Ne jamais y ajouter de documents personnels, de coordonnées privées ou de fichiers confidentiels.

## Statut du projet

Le projet évolue dans une branche de fonctionnalité avant intégration dans `main`. Les améliorations de design et les changements de comportement doivent être testés sur ordinateur et mobile avant fusion.

---

<div align="center">

**Conçu avec soin. Écrit avec affection.**

*For Jennifer — Chapter 23.*

</div>
