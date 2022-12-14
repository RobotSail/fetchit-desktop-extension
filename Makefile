IMAGE?=robotsail/fetchit-podman-desktop
TAG?=latest

BUILDER=buildx-multi-arch
ENVS?=DOCKER_BUILDKIT=1

INFO_COLOR = \033[0;36m
NO_COLOR   = \033[m

build-extension: ## Build service image to be deployed as a desktop extension
	$(ENVS) docker build --tag=$(IMAGE):$(TAG) .

install-extension: build-extension ## Install the extension
	$(ENVS) docker extension install $(IMAGE):$(TAG)

update-extension: build-extension ## Update the extension
	$(ENVS) docker extension update --force $(IMAGE):$(TAG)

prepare-buildx: ## Create buildx builder for multi-arch build, if not exists
	$(ENVS) docker buildx inspect $(BUILDER) || docker buildx create --name=$(BUILDER) --driver=docker-container --driver-opt=network=host

push-extension: prepare-buildx ## Build & Upload extension image to hub. Do not push if tag already exists: make push-extension tag=0.1
	$(ENVS) docker pull $(IMAGE):$(TAG) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=$(TAG) --tag=$(IMAGE):$(TAG) .

# just build & push
push: build-extension
	$(ENVS) docker push $(IMAGE):$(TAG)

help: ## Show this help
	$(ENVS) @echo Please specify a build target. The choices are:
	$(ENVS) @grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(INFO_COLOR)%-30s$(NO_COLOR) %s\n", $$1, $$2}'

.PHONY: help
