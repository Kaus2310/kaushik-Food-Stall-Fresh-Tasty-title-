# Swad Food Stall Website

## Pages
1. `index.html` — premium home/menu + gallery + cart
2. `auth.html` — Login / Sign Up flow
3. `confirm.html` — customer details + final order confirmation

## Food menu
- Vada — ₹20
- Idli — ₹30
- Puri Bhaji — ₹50
- Bread Pattis — ₹30
- Kanda Poha — ₹30

## Set your WhatsApp number
Open `script.js` and change:

`const WHATSAPP_NUMBER = "919999999999";`

For an Indian number, use country code 91 followed by the 10-digit mobile number, with no `+`, spaces or dashes.

Example:
`const WHATSAPP_NUMBER = "919876543210";`

## How ordering works
1. Customer selects multiple food items.
2. Items and quantities are stored in the browser cart.
3. Customer opens the confirmation page.
4. Customer enters name, mobile and pickup note.
5. Clicking **Confirm & Send on WhatsApp** opens WhatsApp with the complete order message pre-filled.
6. Customer presses Send in WhatsApp.

## Login / Sign Up
This demo uses browser `localStorage`. It is suitable for a front-end demo but is NOT secure enough for a real production account system because passwords are stored locally.

For a real business website, connect authentication to a secure backend/database.

## SSL + SEO
The included pages have responsive design, page titles, descriptions, keywords and mobile-friendly metadata.

SSL/HTTPS is provided by your hosting/server, not by HTML/CSS/JavaScript. When deploying, use a hosting provider with HTTPS enabled (for example, a platform that provides a free SSL certificate).

## Run
Open `index.html` in a browser, or upload all files to your web host.
