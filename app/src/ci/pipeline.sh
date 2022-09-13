#!/bin/bash

increment=$(node build.js)
./build.sh $increment
./package.sh $increment
