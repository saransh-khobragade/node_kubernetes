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
    docker build . -t saransh98/lifo:1.0.5
    docker tag lifo saransh98/lifo:1.0.5
    docker push saransh98/lifo:1.0.5
    minikube start
    kubectl apply -f lifo && minikube dashboard

    (Pick postgres service IP and edit lifo deployment env variable HOST, then wait for deployment to get green)

    minikube service lifo

    (Take port and use curl)



Extra usefull commands

    docker 

    docker build -t lifo .
    docker network create lifo

    docker run \
    --name=mongo \
    --rm \
    --network=lifo mongo

    docker run \
    -
    --name=postgres \
    -e POSTGRES_PASSWORD=password \
    --rm \
    --network=lifo postgres

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
    docker ps


    Kubernetes

    docker login
    docker tag lifo saransh98/lifo:1.0.0



    minikube start
    kubectl apply -f lifo
    kubectl get service
    kubectl get pods --watch
    minikube service lifo

    minikube stop
    minikube delete
    minikube dashboard






