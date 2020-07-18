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
