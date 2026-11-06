# Everyday test prompts

These checks use existing work and spend no generation credits.

## Connect and check balance

> Is my CreativeOtter account connected? How many credits do I have left?

Expect a short answer with the actual balance. If sign-in is needed, complete the assistant's CreativeOtter connection first. Never copy another client's tokens.

## Show saved images

> Show my three latest saved CreativeOtter images together, please. Don't create anything new.

Expect the CreativeOtter gallery when the host supports it. Replies should use image names or positions, with no internal IDs or technical details. An empty library should be explained without generating a replacement.

## Select and download

> Open the second picture.

> Download that picture for me, please.

Check that the selected image and downloaded file match. A link alone is not proof of a completed download. Viewing or downloading saved images should leave the balance unchanged.

## Refresh the saved preview

Leave the saved image open, switch away, then return later. The preview should recover without generating another image. In a host without embedded previews, use the returned CreativeOtter library link.

## Repeat in another assistant

Sign in with the same CreativeOtter account and repeat the account/gallery prompts. The same workspace library and current credit balance should be available. A different account must see only its own work.

## Optional generation test — spends credits

Only after the free checks pass, deliberately ask:

> Create one Instagram image for my bakery using CreativeOtter. Use the headline “Fresh mornings start here.”

This requests a new paid image. The backend currently charges 16 CreativeOtter credits for one standard native or API image; pricing may change, so use the live quote. The package does not include free credits. Skills for video, voice or music do not make those backend capabilities available.

## If a connection fails

Use the existing CreativeOtter connection's sign-in or reconnect control. Do not add a second duplicate connection or regenerate an image just to repair its preview. Some clients require tool discovery to refresh after permissions change.

## Backend-aligned everyday prompts

Use the current skill version in a fresh chat. Begin with read-only requests:

- “Show my three latest saved images together. Don't make any new ones.”
- “How much would one Instagram picture for my bakery cost? Just tell me the price.”
- “Can CreativeOtter make a video of my mascot waving?”
- “Can it record a welcome message in my own voice?”
- “Plan a six-shot cafe launch film, but don't generate or save anything.”

Expected: saved gallery only, an unexecuted image estimate, clear video/voice limitations, and a useful written plan. Never label a written plan as generated media. Record any actual quoted/reserved/charged state; do not create images for a display-only test. These prompts are separate from the offline schema examples in the source repository.
