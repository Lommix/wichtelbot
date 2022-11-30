#! /bin/bash
DIR=$(pwd)
HOST="evil-me.com"
TARGET="/home/go/test"

scp -i ~/.ssh/id_ed25519 $DIR/main.go root@$HOST:$TARGET/main.go
scp -i ~/.ssh/id_ed25519 $DIR/go.sum root@$HOST:$TARGET/go.sum
scp -i ~/.ssh/id_ed25519 $DIR/go.mod root@$HOST:$TARGET/go.mod
scp -r -i ~/.ssh/id_ed25519 $DIR/backend root@$HOST:$TARGET/backend
scp -r -i ~/.ssh/id_ed25519 $DIR/frontend/dist root@$HOST:$TARGET/frontend/dist
