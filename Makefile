build:
	brunch build --production

fingerprint:
	./scripts/do_fingerprints.rb

compress:
	gzip -9kf public/*.{js,css}

upload:
	rsync -avz -e ssh ./public/ keita@messages.kkob.us:/var/www/kkob.us/unroll

deploy: build fingerprint compress upload
