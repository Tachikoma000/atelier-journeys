# Atelier · Journeys

The eight journey films, as a static site. `index.html` is the screening page.

## Publish on GitHub Pages (a `marketing` branch)

```sh
git checkout --orphan marketing
git rm -rf .
# copy this folder's contents into the repo root, then:
git add -A
git commit -m "Journeys site"
git push -u origin marketing
```

Then: repo **Settings → Pages → Build and deployment → Deploy from a branch → `marketing` / root**. The URL appears there in a minute or two: `https://<owner>.github.io/<repo>/`.

`.nojekyll` keeps GitHub from processing the files. Fonts load from Google Fonts; everything else is in this folder.

Note: on a free plan, Pages from a private repo needs GitHub Pro/Team; otherwise the repo (or a separate public repo for the site) must be public.
