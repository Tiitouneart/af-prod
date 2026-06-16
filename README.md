# AF Prod — Site vitrine

Site one-page cinématique pour **AF Prod**, agence créative à La Réunion (sites web · vidéo · branding).
HTML / CSS / JS pur, zéro dépendance. Ouvrir `index.html` dans un navigateur.

## Structure
```
af-prod/
├─ index.html         # Page unique (toutes les sections + SEO)
├─ css/style.css      # Design cinématique dark + bleu électrique + animations
├─ js/main.js         # Curseur custom, scroll reveals, marquee, compteurs, form
├─ image/
│  ├─ favicon.svg     # Favicon AF
│  ├─ logo-af.png     # ⚠️ À DÉPOSER : ton logo PNG (sinon fallback texte "AFPROD")
│  └─ og-cover.jpg    # ⚠️ À DÉPOSER : image de partage 1200×630 (aperçu réseaux)
├─ robots.txt
├─ sitemap.xml
└─ README.md
```

## À personnaliser (rapide)

| Quoi | Où |
|------|-----|
| **Logo** | recréé en vectoriel `image/logo-af.svg` (A bleu / F blanc). Pour ton PNG exact : dépose-le et remplace `logo-af.svg` par `logo-af.png` dans `index.html` (nav) |
| **Image de partage** | dépose `image/og-cover.jpg` (1200×630) |
| **Domaine** | remplace `af-prod.fr` dans `index.html` (SEO/OG/JSON-LD), `robots.txt`, `sitemap.xml` |
| **Tarifs** | section `#offers` dans `index.html` |
| **Réalisations** | section `#work` (titres + remplacer les dégradés par tes vidéos/photos) |
| **Réseau** | liens `@af.prod10` déjà branchés |

## Formulaire de contact (Web3Forms + anti-spam)
Le formulaire est branché sur **Web3Forms** (gratuit, sans back-end) avec validation, envoi AJAX et **honeypot anti-spam**.

**1 seule action pour l'activer :**
1. Va sur [web3forms.com](https://web3forms.com), entre ton email → tu reçois une **clé d'accès** gratuite.
2. Dans `index.html`, remplace `VOTRE_CLE_WEB3FORMS` par ta clé (ligne `name="access_key"`).
3. C'est tout — les messages arrivent dans ta boîte mail. Tant que la clé n'est pas mise, le formulaire affiche un message d'erreur clair au lieu d'échouer silencieusement.

## Sécurité & mise en ligne
- **HTTPS obligatoire** : active le certificat SSL chez ton hébergeur (gratuit).
- **En-têtes de sécurité fournis** (CSP, HSTS, anti-clickjacking, nosniff…) :
  - `_headers` → pour **Netlify / Cloudflare Pages / Vercel**
  - `.htaccess` → pour **OVH / o2switch / Apache** (force aussi le HTTPS + cache + gzip)
  - Garde celui qui correspond à ton hébergeur (les deux peuvent coexister).
- **Pages légales (RGPD)** : `mentions-legales.html` et `confidentialite.html` sont liées dans le footer.
  ⚠️ Elles contiennent des champs <span style="color:orange">[à compléter]</span> (nom, SIRET, adresse, email, hébergeur) — **remplis-les avant publication**.

## SEO inclus
- Meta title / description / keywords optimisés (agence créative Réunion)
- Open Graph + Twitter Card (aperçu réseaux)
- JSON-LD `ProfessionalService` + `WebSite` (rich results Google)
- HTML5 sémantique, `lang="fr"`, canonical, robots, sitemap
- Performance : fonts preconnect, animations GPU, `prefers-reduced-motion`

## Accessibilité
Contraste AA, focus clavier visible, alt text, labels de formulaire, respect de `reduced-motion`.
