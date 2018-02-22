#!/usr/bin/env bash

#!/bin/sh

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

PASS=true

echo "\n验证 Javascript:\n"

# Check for eslint
which eslint &> /dev/null
if [[ "$?" == 1 ]]; then
  echo "\t\033[41m请安装ESlint\033[0m"
  exit 1
fi

for FILE in $STAGED_FILES
do
  eslint "$FILE"

  if [[ "$?" == 0 ]]; then
    echo "\t\033[32mESLint 通过: $FILE\033[0m"
  else
    echo "\t\033[41mESLint 失败: $FILE\033[0m"
    PASS=false
  fi
done

echo "\nJavascript 验证完成!\n"

if ! $PASS; then
  echo "\033[41m提交失败:\033[0m 你的代码没有通过ESLint规范，请修改ESLint错误并重试。\n"
  exit 1
else
  echo "\033[42m提交成功\033[0m\n"
fi

exit $?