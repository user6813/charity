#!/bin/bash

# Change this to your docker-compose file if it's not in the same directory
COMPOSE_FILE="infra/dev.yml"

case "$1" in
  up)
    docker compose -f $COMPOSE_FILE up -d
    ;;
  down)
    docker compose -f $COMPOSE_FILE down
    ;;
  build)
    docker compose -f $COMPOSE_FILE build --no-cache
    ;;
  restart)
    docker compose -f $COMPOSE_FILE down && docker compose -f $COMPOSE_FILE up -d
    ;;
  logs)
    docker compose -f $COMPOSE_FILE logs -f
    ;;
  ps)
    docker compose -f $COMPOSE_FILE ps
    ;;
  run)
    if [ -z "$2" ]; then
      echo "Usage: $0 run <service> <command...>"
      exit 1
    fi
    SERVICE=$2
    shift 2
    docker compose -f $COMPOSE_FILE run --rm $SERVICE "$@"
    ;;
  *)
    echo "Usage: $0 {up|down|build|restart|logs|ps|run}"
    exit 1
    ;;
esac
