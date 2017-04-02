FROM node

ENV WD /usr/src/wd
WORKDIR $WD
COPY . $WD

CMD "./npm build"
