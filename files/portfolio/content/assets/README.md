# Drop raw files here. Do not optimize them, the build does that.

```
assets/
  portrait.jpg              optional, if you want a portrait used somewhere
  resume.pdf                optional
  og.png                    optional, 1200x630 social preview
  polaroids/                3-6 photos, at least 1200px on the long edge, any format
  projects/<slug>/
    desktop.png             browser screenshot, 1440x900 or larger
    mobile.png              phone screenshot, 390x844 or larger (optional)
    logo.svg                optional
```
- Use real screenshots and photos only. Blur or crop anything private (tokens, emails, other people's faces).
- Backend project without a UI? Use `visual: terminal` with real output, or `visual: diagram` with an SVG you drew.
- Every image needs alt text in its content file.
