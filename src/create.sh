#!/usr/bin/env bash

sudo find . -name ".DS_Store" | xargs rm
rm WhatColor.zip
zip -r WhatColor.zip *