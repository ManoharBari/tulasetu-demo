# TulaSetu: Trust Verified

Build a web app called TulaSetu — a digital verification and certification platform for weighing/measuring instruments (like shop scales and fuel pumps) under India's Legal Metrology Act.

This is a UI/UX prototype only — use mock/hardcoded data throughout. No real database, no real authentication, no real hashing or QR validation logic. The goal is to demonstrate the workflow visually, not to build working backend functionality.

Screens to build, each pre-populated with realistic-looking mock data:

Owner Portal — a form to "submit" an instrument for verification (type, business name, location, photo upload placeholder). Below it, a mock list of 3–4 sample applications with different statuses (Pending, Verified, Rejected).

Officer Screen — a mock list of 3–4 pending applications. Clicking one opens a form to enter an inspection result (pass/fail, reading value, photo placeholder). On "submit," show a mock-generated certificate view with a placeholder QR code image and a fake certificate ID.

Public Scan & Verify page — a simple page simulating what happens after someone "scans" a QR code. Hardcode 2–3 example outcomes (Valid, Expired, Not Found) that can be triggered by clicking sample certificate IDs, showing the appropriate result each time. Include a "Report an issue" button that opens a short mock report form (reason + photo placeholder) and shows a fake confirmation message on submit — no need to actually store it anywhere real.

Enforcement Dashboard — a mock list of 4–5 sample reports (citizen complaint reason, date, status: Pending/Reviewed) with a button to toggle a report's status between Pending and Reviewed, just to show the interaction — state can reset on refresh.

Design: clean, trustworthy government-platform feel — navy blue (#121A3E) and teal (#0E7C86) as primary colors, orange (#F2811D) as a single accent, white backgrounds, rounded cards, minimal clutter. The Scan & Verify page is the most important screen — make it feel fast and clear.

Navigation: simple sidebar or top nav to switch between the four screens/roles, since this is for demoing the flow to judges, not for real multi-user login.

Use the uploaded image for UI reference and structure of the website.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f6cfbeff-d825-461a-a212-bdd306fc718a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
