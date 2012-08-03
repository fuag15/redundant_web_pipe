all:
	./utils/automate
install:
	pip install coffeescript
	pip install slimit
clean:
	rm -rf ./build/*
