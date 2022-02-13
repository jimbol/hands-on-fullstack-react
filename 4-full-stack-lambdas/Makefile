deploy-backend:
	make build
	make build-postconfirmation
	make deploy

build-postconfirmation:
	cd back-end && yarn build
	cp -r back-end/build front-end/amplify/backend/function/4fullstacklambdascc18ef0cPostConfirmation/src
	cp -r back-end/node_modules front-end/amplify/backend/function/4fullstacklambdascc18ef0cPostConfirmation/src

build:
	cd back-end && yarn build
	cp -r back-end/build front-end/amplify/backend/function/blogapi/src/lib
	cp back-end/index.js front-end/amplify/backend/function/blogapi/src/index.js
	cp -r back-end/node_modules front-end/amplify/backend/function/blogapi/src

deploy:
	cd front-end && amplify push --yes
