#!/usr/bin/env bash
echo "starting deploy"
/usr/bin/rsync -ratlz --info=progress2 dist/. marand@marand.dk:/var/www/html/solid-state-drive
echo "deploy done"

