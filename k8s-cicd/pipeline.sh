#!/bin/bash
set -e

echo "Run Canarytrace in K8s."

KUBE_CONFIG="--kubeconfig=./kube-config.yaml"
POD_NAME="canary-pipe-release-${RUN_ID}"
CONTAINER_NAME="canarytrace"
POD="k8s-cicd/canarytrace-pod.yaml"

echo "------------------"
echo "Set secrets to ${POD}"
sed -i -e "s|LICENSE-XXXX|${CANARYTRACE_LICENSE}|g" $POD
sed -i -e "s|ELASTIC-XXXX|${ELASTIC_CLUSTER}|g" $POD
sed -i -e "s|elastic:pass|${ELASTIC_HTTP_AUTH}|g" $POD
sed -i -e "s|run-id-XXX|${LABELS}|g" $POD
sed -i -e "s|BASE_URL-XXXX|${BASE_URL}|g" $POD
sed -i -e "s|namespace-XXX|${NAMESPACE}|g" $POD

echo "------------------"
echo "Rename pod ${POD} to ${POD_NAME}"
sed -i -e "s|canarytrace-XXX|${POD_NAME}|g" $POD


echo "------------------"
echo "Rename Docker image to pipeline-${RUN_ID}"
sed -i -e "s|canarytrace-image-XXX|${CANARY_IMAGE}|g" $POD

cat $POD


echo "------------------"
echo "INSTALL ${POD_NAME} POD"

RUN_POD="$(kubectl  ${KUBE_CONFIG} create -f ${POD})"

echo $RUN_POD

while true;do
    STATE=$(kubectl ${KUBE_CONFIG} -n ${NAMESPACE} get pod ${POD_NAME} -o go-template='{{.status.phase}}')
    echo "$(date) - POD ${POD_NAME} STATE: ${STATE}"
    if [[ ${STATE} = "Running" ]]; then break; fi;
    sleep 1;
done;

kubectl ${KUBE_CONFIG} -n ${NAMESPACE} logs -f ${POD_NAME} -c ${CONTAINER_NAME}

while true;do
    IS_READY=$(kubectl ${KUBE_CONFIG} -n ${NAMESPACE} get pod ${POD_NAME} -o jsonpath="{.status.containerStatuses[?(@.name=='${CONTAINER_NAME}')].ready}") 
    echo "$(date) - CONTAINER ${CONTAINER_NAME} IS READY: ${IS_READY}"
    if [[ ${IS_READY} == "false" ]]; then break; fi;
    sleep 1;
done;

EXIT_CODE="$(kubectl ${KUBE_CONFIG} -n ${NAMESPACE} get pod ${POD_NAME} -o jsonpath="{.status.containerStatuses[?(@.name=='${CONTAINER_NAME}')].state.terminated.exitCode}")"

echo "------------------"
echo "Exit container ${CONTAINER_NAME} with code ${EXIT_CODE}"

echo "------------------"
echo "Delete pod ${POD_NAME}"
DELETE_POD="$(kubectl ${KUBE_CONFIG} -n ${NAMESPACE} delete pod ${POD_NAME})"
echo $DELETE_POD

echo "exit"
exit $EXIT_CODE
