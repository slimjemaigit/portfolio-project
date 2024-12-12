###Docker

#build image
docker build -t portfolio-backend ./backend

#tag image 
docker tag portfolio-backend:latest slimjemaidocker/portfolio-backend

#push to dockerhub
docker push slimjemaidocker/portfolio-backend

#running a docker image
docker run -d --name portfolio-backend --env-file ./backend/src/.env -p 3000:3000 slimjemaidocker/portfolio-backend


#### Kubernetes

#apply deployment
kubectl apply -f ./kubernetes/backend-secrets.yaml

#get information about all the running pods and services
kubectl get all 

#describe in detail a specific pod or service
kubectl describe <pod name>

#check logs inside a pod
kubectl logs <pod name>

#go inside the pod 
kubectl exec -it <pod name> -- /bin/bash