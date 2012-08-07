all:
	./utils/automate
install:
	pip install coffeescript
	pip install slimit
	pip install watchdog
serve:
	python -m SimpleHTTPServer 8888
watch:
	./utils/bark
clean:
	rm -rf ./build/*
