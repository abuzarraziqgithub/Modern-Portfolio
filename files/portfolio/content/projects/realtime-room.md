---
# Copy to content/projects/<slug>.md, one file per project (3 to 5). Files starting with _ are ignored.
title: "Realtime Room"
order: 3
year: 2026
role: "Solo, built everything"
pitch: "A WebSocket chat app I am still building. One Express server, socket.io, rooms and history next."
stack: [Node.js, WebSockets, Express, Socket.IO]
hard_part: "The first version had the client emit greetings and the server answer response, so the two sides only ever talked to themselves. One message event on both ends, plus socket.broadcast.emit for everyone else, so a join reaches the room and is not echoed back to the sender. Express static files and socket.io share one HTTP server on one port."
links:
  live: ""
  repo: "https://github.com/abuzarraziqgithub/The-Chat-Application"
visual: terminal
shots:
  desktop: ""
  desktop_alt: ""
  mobile: ""
  mobile_alt: ""
logo: ""
terminal: |-
  $ PORT=3111 node src/index.js
  Server listening at port  3111

  # two clients connect, alice first, then bob
   0.08s  alice  transport open, sending engine.io handshake
   0.08s  alice  <- engine.io open
   0.09s  alice  <- socket.io connected to default namespace
   0.09s  alice  <- ["message","Welcome!"]
   0.98s  bob    transport open, sending engine.io handshake
   0.98s  bob    <- engine.io open
   0.98s  bob    <- socket.io connected to default namespace
   0.98s  alice  <- ["message","A new user has joined!"]
   0.98s  bob    <- ["message","Welcome!"]
diagram: ""
---
Still in progress. What works today: the Express + socket.io server on one port, and the
join broadcast. Next: rooms, then message history in MongoDB.
