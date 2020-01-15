cd _book
rd /s /q docs
del .gitignore
del build.bat
cd ..
xcopy _book docs  /s /e /y
git add .
git commit -m %1
git push