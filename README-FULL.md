# Micro-Lending Loan Disbursement

This use case is an extension of [Micro-Lending Credit Insight Use Case](https://github.com/apixplatform/microlending-credit-insight)

This use case is built with Angular 8. To go through the use case, you don't need to know Angular. But if you are interested in leaning Angular, please follow [this](https://www.bitovi.com/academy/learn-angular.html) tutorial.

Evaluating the creditworthiness of the borrowers, automated loan approval and loan disbursement are demonstrated in this use case.

## APIs used to implement the use case

1. HyperVerge Face Match ([Link](https://apixplatform.com/profile/api-detail?api-id=30))

    * Additional API Keys are required to access HyperVerge Face Match API.
        * appId: 2d9288
        * appKey: 506505f70970ce16988f

2. Smart Bank - Party ([Link](https://apixplatform.com/profile/api-detail?api-id=107))
3. Smart Bank - Account ([Link](https://apixplatform.com/profile/api-detail?api-id=103))
4. Trusting Social - Credit Insight ([Link](https://apixplatform.com/profile/api-detail?api-id=259))

    * Staging API access Keys
        * username: apix_user
        * password: apixuser@123
        * clientCode: apix_client
        * host: https://staging-api.trustingsocial.com
        * basePath: /
5. **Smart Bank - Lending** ([Link](https://apixplatform.com/profile/api-detail?api-id=110))

Login to [APIX Platform](https://apixplatform.com) and subscribe to above APIs before continue to next step.

## Provision APIX IDE Instance

Note: If you already have an IDE instance running, you don't need to create a new IDE instance. 

1. Login to [APIX Platform](https://apixplatform.com)
2. From the main menu, go to Sandbox > [Secure Experimentation Sandbox/IDE](https://apixplatform.com/ide/api-ide)
3. Click `Create IDE Instance` button
4. Provide `Name`, `URL`, `Description`, `Password` for the IDE instance and click `Create` button. 
Please note that `URL` should be unique and `Password` must be atleast 8 characters long, must contain a number, uppercase, lowercase and a special character.
5. Provide the confirmation by clicking on `Create and Launch` button. Wait for the IDE instance to be provissioned.
6. Newly created IDE instance will be openned in a new browser tab. Provide the `Password` and click on `Open IDE` button.
7. Already created IDE instances will appear in `IDE Instance Manager` view. Click on the IDE instance name to re-open the IDE instance
8. Please note that IDE instance will be available for 24 hours. Data should be backed up by pushing code to GitHub before auto termination. One hour before the termination, you can request for an termination extension.

## Setting up the development server

1. Open and login to IDE instance
2. From the main menu, click `View` > `Terminal`.

Execute following commands in Terminal window.

**Note:** If previous use case is running in the IDE Terminal, Press `Ctrl` + `C` to stop. 

1.  Let's change the terminal directory to root `projects` folder

        cd ~/project/

2.  Download the code into IDE instance

        git clone https://github.com/apixplatform/microlending-loan-process.git

3.  Use case code is downloaded to IDE instance to the folder `microlending-loan-process`. Let's change the terminal directory to `microlending-loan-process` folder.

        cd microlending-loan-process/

4.  Download Angular dependancies with below commands.

        npm install

5.  Start the Angular application server.

        npm start

To configure the use case,

1. Open `microlending-loan-process` > `api-config.json` from the `Project Explorer` left pane.
2. Provide your APIX credentials.

        "userName": "Replace this with your APIX username",
        "password": "Replace this with your APIX password"

3. From the main menu, click `File` > `Save`.

Now the development server is up and running with correct configurations. To open the use case website follow the below instructions.

1. Copy the IDE instance URL from the browser tab. (ex: `https://ide-xxxxxx.services.apixplatform.com/`)
2. Open a new browser tab and paste the copied IDE url. Change the `ide` text to `app` in the URL and open. New URL would look like (ex: `https://app-xxxxxx.services.apixplatform.com/`)

## Testing the use case

1. Click on `Create an Account` button from `Home` page.

    i. In the GitHub project go to `test-images` and download `id.jpg` and `selfie.jpg`. Provide these two images in the 1st step of application window and click `Verify` button. 

    * HyperVerge Face Match API will get executed to validate the provided identity document and selfie. 
    * Match confidence level will be provided as the output. 
    * Click on `Go to Account Creation` button to proceed. 

    ii. Provide account creation inputs and click `Create Account` Button.

    * Bank customer will get created with the provided `Account Holder's Name` using `Smart Bank - Party` API.
    * New Account gets created using `Smart Bank - Account` API.
    * Newly created customer will be assigned to the Account as the Account Owner using `Smart Bank - Account` API.

    iii. Created Account Details will be shown in the Step 3.

    iv. Click `Home` button.

2. Click on `Apply for a Loan` button from `Home` Page

    i. Enter the name and phone number (`917025xxxxxx`) and `Submit`. Last 6 digits are arbitary. Please note down the phone number provided, before submit. 
    
    * 917025976692 - Has a good credit score
    * 917025111111 - Has a bad credit score

    ii. OTP needs to be provided now. 
    
    * Go to [Trusting Social Staging SMS Service](https://staging-api.trustingsocial.com/smsc_chat)
    * Enter same phone number you entered in the previous step into the `Input Phone Number` field and Submit.
    * Copy the correct OTP for the request and provide it in Use case frontend and `Submit`.

    iii. Credit Score percentage will be shown. If Credit Score is healthy, `You are eligible for a loan!` message will appear in the screen. If not, `Unfortunately, you are not eligible for a loan.` message will appear in the screen.

    iv. If Credit Score is healthy, click `Continue` button.

3. Loan Disbursement

    i. Provide Loan Amount and `Submit`

    ii. Based on the Credit Score, eligible loan amount would be displayed. Click `Yes` to proceed with loan disbursement.
    
        Eligible Loan Amount = Requested Loan Amount * Credit Score(%)

    iii. Eligible loan amount would get accepted and credited to the bank account through `Smart Bank - Lending` API. 
