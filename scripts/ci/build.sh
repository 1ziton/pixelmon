#!/bin/bash

set -e

readonly thisDir=$(
  cd $(dirname $0)
  pwd
)
source ${thisDir}/_travis-fold.sh

TRAVIS=false
for ARG in "$@"; do
  case "$ARG" in
  -travis)
    TRAVIS=true
    ;;
  esac
done

cd $(dirname $0)/../..

DIST="$(pwd)/dist"

buildPixelmon() {
  travisFoldStart "@pixelmon"
  ./scripts/ci/build-pixelmon.sh
  travisFoldEnd "@pixelmon"
}

buildSchematies() {
  travisFoldStart "schematies"
  ./scripts/ci/build-schematics.sh -b -copy -travis
  travisFoldEnd "schematies"
}

buildPixelmon
# buildSchematies
