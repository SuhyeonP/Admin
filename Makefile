export DOCKER_REGISTRY := fe
# ghcr.io 와 같은 image registry url 입력하여 사용
export DOCKER_IMAGE_TAG := $(shell git rev-parse --short HEAD)

docker_build:
	docker build -t $(DOCKER_REGISTRY):$(DOCKER_IMAGE_TAG) -f ./docker/Dockerfile .
docker_run:
	docker run -it -p 3000:3000 --name $(DOCKER_REGISTRY) $(DOCKER_REGISTRY):$(DOCKER_IMAGE_TAG)
docker_down:
	docker stop $(DOCKER_REGISTRY)
	docker rm $(DOCKER_REGISTRY)
docker_push:
	docker push $(DOCKER_REGISTRY):$(DOCKER_IMAGE_TAG)
