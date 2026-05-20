# Updating the upstream version

ThunderHub is packaged from a single upstream source: the prebuilt Docker image `apotdevin/thunderhub`, pinned by tag in the manifest. Use the GitHub release as the source of truth for the version number, and confirm the matching tag is published on Docker Hub before bumping.

## Determining the upstream version

- **ThunderHub** ([apotdevin/thunderhub](https://github.com/apotdevin/thunderhub))

  ```bash
  gh release view -R apotdevin/thunderhub --json tagName -q .tagName
  ```

  Confirm the same tag has been published to Docker Hub ([apotdevin/thunderhub](https://hub.docker.com/r/apotdevin/thunderhub/tags)):

  ```bash
  curl -fsSL "https://hub.docker.com/v2/repositories/apotdevin/thunderhub/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

  Pin lives in `startos/manifest/index.ts` as `images.thunderhub.source.dockerTag` (`apotdevin/thunderhub:<version>`).

## Applying the bump

- **ThunderHub** — in `startos/manifest/index.ts`, set `images.thunderhub.source.dockerTag` to `apotdevin/thunderhub:<new version>` (drop any leading `v` from the GitHub tag if present, to match the Docker Hub tag format).
