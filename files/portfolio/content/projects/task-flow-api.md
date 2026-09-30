---
# Copy to content/projects/<slug>.md, one file per project (3 to 5). Files starting with _ are ignored.
title: "Task Flow API"
order: 1
year: 2026
role: "Solo, built everything"
pitch: "REST task API where each JWT is stored on the user document, so logging out deletes it."
stack: [Node.js, Express, MongoDB, JWT, JavaScript]
hard_part: "Profile pictures were the awkward part of a JSON-only API. Multer holds the upload in memory, capped at 1 MB and png/jpeg/jpg only, then sharp resizes it to a 250x250 PNG and the bytes go into the user document as a Buffer. GET /users/me/avatar streams it back as image/png instead of JSON."
links:
  live: "https://task-manager-api-ten.vercel.app/"
  repo: "https://github.com/abuzarraziqgithub/Task-Manager-API"
visual: diagram
shots:
  desktop: ""
  desktop_alt: ""
  mobile: ""
  mobile_alt: ""
logo: ""
terminal: ""
diagram: "assets/projects/taskflow-api/diagram.svg"
---
