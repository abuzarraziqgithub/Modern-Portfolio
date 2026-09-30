---
# Copy to content/projects/<slug>.md, one file per project (3 to 5). Files starting with _ are ignored.
title: "Mapty"
order: 2
year: 2024
role: "Built from Jonas Schmedtmann's course project, then made it work on phones"
pitch: "Jonas Schmedtmann's course workout tracker, with a phone layout I added on top."
stack: [HTML5, CSS3, JavaScript, Leaflet.js, LocalStorage]
hard_part: "The course app is a fixed desktop grid: a 448px sidebar beside the map. Neither fits on a 320px phone, so I added the project's only media query, 320px to 426px, and inverted the layout. The map goes full-bleed at 100vh, the sidebar becomes an absolutely positioned panel above it at z-index 100, each workout row drops from two columns to one, and the list gets its own 77vh scroll so the form stays reachable. The form was also display:none behind the course's hidden class, so I dropped the class to keep it on screen."
links:
  live: "https://dreamy-parfait-65c0c5.netlify.app/"
  repo: "https://github.com/abuzarraziqgithub/Mapty"
visual: screenshot
shots:
  desktop: "assets/projects/mapty/desktop.png"
  desktop_alt: "Mapty workout tracker: a sidebar listing cycling and running workouts and a map with a marker for each"
  mobile: ""
  mobile_alt: ""
logo: ""
terminal: ""
diagram: ""
---