# node_kubernetes

PUSH API

    curl --location --request POST 'http://localhost:3000/push' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: connect.sid=s%3AtFUx1VeewNRDvb1w2jSgMfu0QReLVPxO.QIIUmHyuTy1MpBFD3tyvwIaYVOAWtPbFXTo%2BYB7ttBs' \
    --data-raw '{
        "db_name":"mongo",
        "element":3
    }'

POP API

    curl --location --request DELETE 'http://localhost:3000/pop' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: connect.sid=s%3AtFUx1VeewNRDvb1w2jSgMfu0QReLVPxO.QIIUmHyuTy1MpBFD3tyvwIaYVOAWtPbFXTo%2BYB7ttBs' \
    --data-raw '{
        "db_name":"mongo"
    }'


Run Kubernetes follow these commannd

    docker login

    docker build -t lifo .
    docker tag lifo saransh98/lifo:1.0.6
    docker push saransh98/lifo:1.0.6
    minikube start
    kubectl apply -f lifo && minikube dashboard
    minikube service lifo

    (Take port and use curl)

    minikube stop
    minikube delete

Swagger api:
    http://localhost:3000/api-docs/


Extra usefull commands


    docker build -t lifo .
    docker network create lifo

    docker run \
    --name=mongo \
    --rm \
    --network=lifo mongo


    docker run \
    --name=lifo \
    --rm \
    --network=lifo \
    -p 3000:3000 \
    -e MONGO_URL=mongodb://mongo:27017/dev \
    lifo

    docker stop mongo lifo
    docker images
    docker image rm -f a521dea276d8
    docker system prune --all		remove everything
    docker ps






