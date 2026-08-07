# Roadmap

## Player screen architecture

The current player is displayed over the existing app view. While it is open,
the view beneath it is intentionally hidden so iPhone's translucent status area
does not reveal episode-details content.

Consider moving the player to a dedicated app screen in a future update. That
would provide a more durable navigation model as the app grows, while preserving
playback, return-to-episode behavior, and listening progress.

## Reconcile the original roadmap

Find the fuller roadmap from the other computer, then merge or replace this
starter file so the project has one complete source of future work.

## Durable game progress with Google Sheets

Use the existing Google Sheets connection as the durable record for game
progress, while keeping the device copy available for offline use. Record the
player profile, permanent cassette-to-audio assignments, store inventory and
trades, and any progress that cannot be safely rebuilt from listening events.
This prevents a new cassette release from reshuffling an existing collection
and allows progress to follow the user across devices.

## Store upgrade and cassette universe

Replace the current shared three-item store assortment with metadata-driven
stores. Each store should be able to define its own inventory size, cassette
themes or tags, rarity preferences, rotation rules, and payment method such as
coins, duplicate trade-ins, achievements, or replay rewards. Extend cassette
metadata to support those rules and preserve the existing developer tools as
the place to manage content.

## Gradual code cleanup

The app currently keeps most of its styling, screens, player behavior, Google
Drive access, and game rules in one large file. Split it gradually into focused
parts, starting with game progress and reward rules, then stores and the
player. Add automated checks for content metadata, image pairs and dimensions,
unique cassette IDs, and release consistency.

## Archive folder integration

For now, exclude the Google Drive Archive folder and its audio from the active
library, collection counts, and ordinary app views. Later, consider an Archive
experience that can safely browse, restore, or otherwise incorporate those
audio files without treating them as active collection entries.


## Eliminate the recurring Google access button

The installed PWA currently keeps its Google access token only for the active
session. It remembers prior consent but does not attempt an automatic quiet
reconnection when the app reopens.

First, attempt a quiet reconnect at startup and clearly handle the cases where
iPhone or Google requires user interaction. If that still leaves an annoying
recurring prompt, evaluate a durable server-side connection for Drive and
Sheets. Keep audio streaming, privacy, and offline behavior in scope before
moving Drive access behind a service.

## Content-management saving

Replace the Cassette Editor's legacy JSON export/import workflow with a
one-button publishing flow. A private service should validate cassette,
achievement, and store metadata, then commit only the intended metadata file to
GitHub. Keep a download-for-Codex fallback until direct saving is fully
deployed.

Use a server-side GitHub credential, never a browser-held credential. A Google
Apps Script proof of concept may be suitable for metadata saves, but verify
cross-origin behavior and save-result reporting from the GitHub Pages editor
before relying on it. If it cannot provide a dependable browser API, use a
small CORS-capable service instead.
