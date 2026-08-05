# Roadmap

## Player screen architecture

The current player is displayed over the existing app view. While it is open,
the view beneath it is intentionally hidden so iPhone's translucent status area
does not reveal episode-details content.

Consider moving the player to a dedicated app screen in a future update. That
would provide a more durable navigation model as the app grows, while preserving
playback, return-to-episode behavior, and listening progress.
