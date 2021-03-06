FROM ubuntu:18.04

RUN apt-get update && apt-get install -y && \
	apt-get upgrade -y && \
	apt-get install git -y && \
	apt-get install curl wget -y && apt-get install -y && \
	apt-get install gnupg -y && \
	apt-get clean

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
	apt-get install -y nodejs

ENV EMBERVERSION 3.4.4

RUN npm update && \
	npm install -g ember-cli@${EMBERVERSION}

WORKDIR /app

LABEL bm-off-page.version=0.0.1

RUN git clone https://github.com/AlfredYang1986/bm-off-page.git && \
	git clone https://github.com/PharbersDeveloper/BP-Components.git

WORKDIR /app/BP-Components

RUN git checkout -b frank origin/frank && \
	npm install && \
	npm link

WORKDIR /app/bm-off-page

RUN rm -rf node_modules && \
	rm package-lock.json && \
	npm cache clear --force && \
	npm install && \
	npm link bp-components

RUN ember b --environment production

EXPOSE 4200

ENTRYPOINT ["ember", "s", "--live-reload=false"]
