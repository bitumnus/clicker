FROM node:14

WORKDIR /app
COPY . .
RUN chmod +x ./entry-point.sh
RUN npm i
RUN npm run build

EXPOSE 3000
ENTRYPOINT [ "./entry-point.sh" ]
