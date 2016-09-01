# End-2-end testing using Protractor

This is a simple guide to get started with end-2end testing using protractor and jasmine

## Instalation

First ensure you have Java Runtime Enviroment and that it is added to your path, [this will guide you to do that](https://docs.oracle.com/javase/tutorial/essential/environment/paths.html)


Next is to install all node modules using the command:

```sh
npm install
```

## Run the testing

Just run regular node test command:

```sh
npm test
```

## Run the test aginst diffrent enviroments

In orther to run the scripts against other enviroments just run the command bellow passing the right base url 

```sh
npm test -- --baseUrl="http://xxxx"
```

> On windows if you recieve an alert about chrome extensions you can try to delete the string key 1 with value * from your registery
> `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome\ExtensionInstallBlacklist`