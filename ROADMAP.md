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
