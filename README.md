# IcReuseClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## POSTMAN

POSTMAN is a useful utility that helps you build and use APIs. You can [download it here](https://www.postman.com/downloads/). You do not need to create an account if you do not want to. Creating an account will allow you to do things like sync between devices.

This repo has a pre-made POSTMAN collection with some example API calls to help with development. Follow these steps to get the collection imported into POSTMAN

1. Import the collection in `/dev_resources/Reuseventory.postman_collection.json` into POSTMAN by clicking the "Import" button in the top left corner, selecting the file and clicking "Import"

![Step 1](https://github.com/MichaelBluetooth/ic-reuse-client/blob/main/dev_resources/postman_step1.PNG?raw=true)
![Step 2](https://github.com/MichaelBluetooth/ic-reuse-client/blob/main/dev_resources/postman_step2.PNG?raw=true)
![Step 3](https://github.com/MichaelBluetooth/ic-reuse-client/blob/main/dev_resources/postman_step3.PNG?raw=true)

2. This will create a new collection in the left hand panel. 

![Step 4](https://github.com/MichaelBluetooth/ic-reuse-client/blob/main/dev_resources/postman_step4.PNG?raw=true)

3. Next, create an environment to connect to the API by clicking on the eye button on the top right corner, then clicking "Add" in the Environment section

![Step 5](https://github.com/MichaelBluetooth/ic-reuse-client/blob/main/dev_resources/postman_step5.PNG?raw=true)
![Step 6](https://github.com/MichaelBluetooth/ic-reuse-client/blob/main/dev_resources/postman_step6.PNG?raw=true)

4. Enter a name, such as "Reuseventory Live" and add the following variables along with their values. Note that the `accessToken`, `refreshToken` and `id` variables are blank. These will be filled in automatically by the various API calls. You may replace `admin1` with `user1` to log in as a non-admin user.

|Variable|Intial Value|Current Value|
|--------|------------|-------------|
|host    |reuseventory.herokuapp.com|reuseventory.herokuapp.com|
|post    |443         |443          |
|username|admin1      |admin1       |
|password|Password123!|Password123! |
|accessToken|||
|refreshToken|||
|id|||

![Step 7](https://github.com/MichaelBluetooth/ic-reuse-client/blob/main/dev_resources/postman_step7.PNG?raw=true)

5. Make sure you have the environment selected when making an API call with POSTMAN.

![Step 8](https://github.com/MichaelBluetooth/ic-reuse-client/blob/main/dev_resources/postman_step8.PNG?raw=true)

6. If everything has been set up correctly, you can now make API requests. Try executing the "Login" request by clicking the "Send" button. You should see a successful response. 

![Step 9](https://github.com/MichaelBluetooth/ic-reuse-client/blob/main/dev_resources/postman_step9.PNG?raw=true)

