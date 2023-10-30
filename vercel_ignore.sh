#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_APP: $VERCEL_APP"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"


if [[ ( "$VERCEL_GIT_COMMIT_REF" == "main" ) || ( "$VERCEL_GIT_COMMIT_REF" == "testnet" ) || ( "$VERCEL_GIT_COMMIT_REF" == "staging" ) && ( "$VERCEL_ENV" == "production" ) ]]  ; then
  echo "✅ - Build can proceed"
  eval "npx nx-ignore $VERCEL_APP --base=$VERCEL_GIT_COMMIT_REF"
else
  echo "🛑 - Build cancelled"
  exit 0;
fi