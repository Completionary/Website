AutoComplete
============
# Installing dependencies

## Ubuntu
```
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install redis-server
```

## Debian
```
sudo apt-get install nodejs nodejs-legacy
curl https://www.npmjs.org/install.sh | sudo sh
sudo apt-get install redis-server
```

# Installing the application
```
sudo npm install -g n

sudo n 0.11.13

npm install
npm run dev
```
if you don't want to restart the server while editing don't run `npm run dev` but do the following
```
sudo npm install -g nodemon
    or
npm run demon
```
now your code tree is scanned every second. Pay attantion though if you change the views you will just have to type
```
rs
```
into the running console to restart the server and reload the templates for the view.