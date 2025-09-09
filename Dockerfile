FROM apotdevin/thunderhub:v0.14.6

RUN apk add --update --no-cache yq; \
    rm -f /var/cache/apk/*

COPY --chmod=755 ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
