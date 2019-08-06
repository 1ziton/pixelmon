TRAVIS_COMMIT_MESSAGE='release(0.1.0): release 0.1.0'
TRAVIS_PULL_REQUEST='true'
if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]  && [[ $TRAVIS_COMMIT_MESSAGE == "release("* ]]; then 
    echo 'ssss'
fi
echo $TRAVIS_PULL_REQUEST