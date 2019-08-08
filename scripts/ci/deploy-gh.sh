echo ""
echo "Build angular"
echo ""
if [[ ${GH} == true ]]; then
  $(npm bin)/ng build --prod --build-optimizer --base-href /ng-alain/
else
  $(npm bin)/ng build --prod --build-optimizer
fi
cp -f ${DIST_DIR}/index.html ${DIST_DIR}/404.html

if [[ ${GH} == true ]]; then
  commitAuthorName=$(git --no-pager show -s --format='%an' HEAD)

  if [[ ${commitAuthorName} != 'cipchk' ]] && [[ ${commitAuthorName} != '卡色' ]]; then
    echo "Warning: Just only cipchk or 卡色 user (current: ${commitAuthorName})"
    exit 0
  fi

  if [ -z ${NG_ALAIN_BUILDS_TOKEN} ]; then
    echo "Error: No access token for GitHub could be found." \
        "Please set the environment variable 'NG_ALAIN_BUILDS_TOKEN'."
    exit 0
  fi

  echo ""
  echo "Deploy by gh-pages"
  echo ""
  $(npm bin)/gh-pages -d dist -r "https://${NG_ALAIN_BUILDS_TOKEN}@github.com/ng-alain/ng-alain.git"
fi