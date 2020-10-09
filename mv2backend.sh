#/bin/bash
rm ../ODB/cargomanager/templates/index.html
cp ./dist/index.html ../ODB/cargomanager/templates

rm -r ../ODB/cargomanager/static/*

cp -r ./dist/css ../ODB/cargomanager/static/css
cp -r ./dist/js ../ODB/cargomanager/static/js
