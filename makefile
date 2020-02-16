
.PHONY: dev-up dev-down dev-load

dev-up:
	docker-compose -f docker-compose.dev.yml up -d --build

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-load:
	docker cp ./.mongo/games.json ngp-mongo-dev:/tmp/
	docker exec ngp-mongo-dev /usr/bin/mongoimport --jsonArray --db predictions --collection prediction --file /tmp/games.json
