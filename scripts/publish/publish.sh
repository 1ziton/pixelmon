#!/bin/bash

# set -u -e -o pipefail

readonly thisDir=$(
  cd $(dirname $0)
  pwd
)

cd $(dirname $0)/../..

DIST="$(pwd)/dist"
ROOT=${DIST}/pokemon-builds

NEXT=false
for ARG in "$@"; do
  case "$ARG" in
  -next)
    NEXT=true
    ;;
  esac
done

VERSION=$(node -p "require('./package.json').version")
echo "Version ${VERSION}"

echo "_auth = $NPM_TOKEN" > ~/.npmrc
echo "email = $NPM_EMAIL" >> ~/.npmrc

# echo "$NPM_TOKEN:$NPM_EMAIL"

clone() {
  rm -rf ${ROOT}
  mkdir -p ${ROOT}
  cd ${DIST}
  echo ">>> Clone pokemon & cli dist..."
  git clone --depth 1 https://github.com/1ziton/pokemon-builds.git
}

publishToMaster() {
  (
    cd ${ROOT}/@pokemon
    for p in $(ls .); do npm publish --access public $p; done
  )
  cd ${ROOT}/1ziton
  npm publish --access public
}

publishToNext() {
  (
    cd ${ROOT}/@pokemon
    for p in $(ls .); do npm publish $p --access public --tag next; done
  )
  npm publish --access public --tag next
}

syncTaobao() {
  (
    cd ${ROOT}/@pokemon
    for p in $(ls .); do curl -X PUT https://npm.taobao.org/sync/@pokemon/$p?sync_upstream=true; done
  )
  curl -X PUT https://npm.taobao.org/sync/1ziton?sync_upstream=true
}

clone
if [[ ${NEXT} == true ]]; then
  publishToNext
else
  publishToMaster
fi
syncTaobao
