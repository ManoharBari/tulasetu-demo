# TulaSetu UI Prototype

## Goal
Build a polished, responsive demo platform with four switchable role screens and realistic hardcoded data. No backend, authentication, persistence, QR verification, or real uploads will be added.

## Screens
- **Owner Portal:** submission form with instrument type, business details, location, and photo placeholder; pre-filled application table/cards showing Pending, Verified, and Rejected states.
- **Officer Screen:** pending inspection queue; selecting an item opens pass/fail, reading, remarks, and photo controls; submission reveals a generated certificate with a mock QR graphic and certificate ID.
- **Scan & Verify:** prominent certificate lookup with three sample IDs for Valid, Expired, and Not Found outcomes; issue-report dialog with reason/photo fields and an in-page confirmation.
- **Enforcement Dashboard:** complaint summary and five mock reports with local Pending/Reviewed status toggles.

## Shared Experience
- Use a compact collapsible sidebar inspired by the uploaded dashboard reference, with role navigation and strong active states.
- Apply the specified navy, teal, orange, and white palette through semantic design tokens.
- Use rounded, restrained cards, clear status badges, crisp government-service typography, and responsive layouts.
- Add only subtle transitions and clear interaction feedback; prioritize speed and clarity on Scan & Verify.

## Technical Details
- Keep all mock interactions in React component state so they reset on refresh.
- Build the experience at `/` with client-side screen switching for a judge-friendly demo.
- Use accessible labels, keyboard-friendly controls, and responsive sidebar behavior.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify the completed UI in desktop and mobile-sized browser views.
