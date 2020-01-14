#!/usr/bin/env bash
echo "starting deploy"
ssh marand@marand.dk "rm -r /var/www/html/games/swordcraft"
/usr/bin/rsync -ratlz --info=progress2 dist/. marand@marand.dk:/var/www/html/games/swordcraft
echo "deploy done"

