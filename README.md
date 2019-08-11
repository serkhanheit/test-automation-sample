# Introduction

This repository contains a sample test automation project for an [AngularJS](https://github.com/angular/angular.js) based [web application](http://cafetownsend-angular-rails.herokuapp.com).
Project utilizes [Protractor](http://angular.github.io/protractor) test framework.
_Protractor_ is a [Node.js](http://nodejs.org/) program built on top of selenium's [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) library.

## Prerequisites

First of all, please ensure that Node.js(>=v8+) is installed in your system, version can be checked by:

```bash
node -v
v10.16.2
```

If Node.js isn't existing in the system, it can be installed by following the instructions from the [download](https://nodejs.org/en/download/) page of official Node.js site.

Optionally, Java(JDK) will also be necessary in case Selenium Server will be used in standalone mode within the test system.
Please note as Protractor has built-in direct communication mode for chrome/firefox selenium webdrivers, this part is not mandatory. Further details on modes will be provided in installation section.

## Installation

### Step1: download of the project

We can either clone the repository:

```bash
git clone https://github.com/serkhanheit/test-automation-sample.git
cd test-automation-sample
```

or just download the project's zip file, then extract into a preferred work folder.

### Step2: installation of node modules

Within the path of work folder, we should run the command:

```bash
npm install
```

Now, node_modules(including protractor and webdriver-update) are all ready.

### Step3: installation of compatible browser drivers

_webdriver-manager_ enables us to download browser drivers practically:

```bash
./node_modules/.bin/webdriver-manager update --versions.chrome 2.24
```

Example above installs a specific version for chrome driver(this version should be selected in accordance to the chrome browser installed in test system)
If we have the latest versions of a browser, we can drop the versions argument in the command, so letting the _webdriver-manager_ install the latest versions of drivers.

### Step4: ready to run the test suites

#### DirectConnect mode
This mode communicates with the webdriver directly and provides faster communication compared to _Selenium Server standalone_ mode. 
We can run the tests by:

```bash
##  to utilize chrome browsers:
./node_modules/.bin/protractor conf.chrome.js --suite login       #  runs "login page" related test-suite
./node_modules/.bin/protractor conf.chrome.js --suite employees   #  runs "employees page" related test-suite
./node_modules/.bin/protractor conf.chrome.js --suite login,employees    #  runs both test-suites

##  by changing the conf file name firefox browsers can be used as well:
./node_modules/.bin/protractor conf.firefox.js --suite login,employees   #  runs both test-suites
```

Or we can utilize the shortcut npm commands prepared for convenience(shortcut details can be seen within scripts section of package.json file)

```bash
##  to utilize chrome browsers:
npm run tst1    #  runs "login page" related test-suite
npm run tst2    #  runs "employees page" related test-suite
npm run tst     #  runs both test-suites  (or npm test)

##  to utilize firefox browsers:
npm run tstf1    #  runs "login page" related test-suite
npm run tstf2    #  runs "employees page" related test-suite
npm run tstf     #  runs both test-suites
```

Please note, by default tests will run in *DirectConnect* mode of protractor due to settings(DirectConnect: true) in conf files.

#### via Selenium Server 
To run the tests via Selenium Server, it's necessary to make appropriate modifications in config files (disabling directConnect mode & setting the driver version and selenium address accordingly)

this part of conf.chrome.js:
```javascript
..
directConnect: true,
//  chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.24',
//  seleniumAddress: 'http://localhost:4444/wd/hub',
..
```

will be changed to:
```javascript
..
directConnect: false,
chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.24',
seleniumAddress: 'http://localhost:4444/wd/hub',
..
```

In this mode, Selenium Server needs to be started before start of tests:
_Remark_: JDK will be necessary here, as Selenium Server is a java application

```bash
webdriver-manager start --versions.chrome 2.24
```

or the shortcut npm command prepared can be used:
```bash
npm run selenium-sa
```

After confirming that the server is up:

```bash
$ npm run selenium-sa

> testautomationsample@1.0.0 selenium-sa /home/work/test-automation-sample
> webdriver-manager start --versions.chrome 2.24

[04:08:51] I/start - java -Djava.security.egd=file:///dev/./urandom -Dwebdriver.chrome.driver=/home/work/test-automation-sample/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.24 -Dwebdriver.gecko.driver=/home/work/test-automation-sample/node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.24.0 -jar /home/work/test-automation-sample/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar -port 4444
..
04:08:52.454 INFO [WebDriverServlet.<init>] - Initialising WebDriverServlet
04:08:52.561 INFO [SeleniumServer.boot] - Selenium Server is up and running on port 4444
..
```

Then, we can start the tests as examplified in directConnect mode.

### License
MIT
