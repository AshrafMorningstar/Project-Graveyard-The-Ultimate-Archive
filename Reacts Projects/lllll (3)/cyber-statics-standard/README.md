/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

Append the following to the README (copy and paste the block):

---

## Local fixtures & offline dev

If GitHub API calls fail due to rate limits or you prefer offline development:

1. Create fixture data:

node scripts/generate-fixture.js


2. This will write `fixture/sample-data.json` which the fetcher will use as fallback.

## Running in Actions

- Add `PERSONAL_TOKEN` to repository secrets if you render frequently. The token should have minimal scopes (public access) to increase API rate limits.
- Trigger workflow via Actions -> Run workflow -> enter username (optional).