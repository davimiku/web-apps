# Web Server

Web server in front, public facing

HTTPS terminates here
Authentication checked here
Static content served from here (HTML, CSS, JS)
Routing by subdomain to the app server

i.e.

foo.mikul.is --> localhost:XXXX/foo

# App Server

Serves data (dynamic HTML, JSON, etc.) for all the apps with dynamic content, not public facing
