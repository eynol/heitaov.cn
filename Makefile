stop:
	@ docker compose down
deploy:
	@ docker compose up -d --force-recreate --build
