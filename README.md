# Micro-Lending Loan Disbursement

This use case is an extension of [Micro-Lending Credit Insight Use Case](https://github.com/apixplatform/microlending-credit-insight)

Evaluating the creditworthiness of the borrowers, automated loan approval and loan disbursement is demonstrated in this use case.

## Additional APIs used to implement the use case

1. Smart Bank - Lending ([Link](https://apixplatform.com/profile/api-detail?api-id=110))

Login to [APIX Platform](https://apixplatform.com) and subscribe to above APIs before continue to next step.

## Running the use case

**Note:** If previous use case is running in the IDE Terminal, Press `Ctrl` + `C` to stop. 

1.  `cd ~/project/`
2.  `git clone https://github.com/apixplatform/microlending-loan-process.git`
3.  `cd microlending-loan-process/`
4.  `npm install`
5.  `npm start`

To configure the use case,

1. Open `account-openning` > `api-config.json` from the `Project Explorer` left pane.
2. Replace the `api-config.json` content with the given configurations shared during the workshop.
3. Provide your APIX credentials.

        "userName": "Replace this with your APIX username",
        "password": "Replace this with your APIX password"

4. From the main menu, click `File` > `Save`.

Now the development server is up and running with correct configurations. To open the use case website follow the below instructions.

1. Copy the IDE instance URL from the browser tab. (ex: `https://ide-xxxxxx.services.apixplatform.com/`)
2. Open a new browser tab and paste the copied IDE url. Change the `ide` text to `app` in the URL and open. New URL would look like (ex: `https://app-xxxxxx.services.apixplatform.com/`)

## Testing the use case

1. Click on `Create an Account` button from `Home` page.

    i. In the GitHub project go to `test-images` and download `id.jpg` and `selfie.jpg`. Provide these two images in the 1st step and click `Verify` button. 

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

    i. Enter the name and phone number (`917025976692`) and `Submit`.

    ii. OTP needs to be provided now. 
    
    * Go to [Trusting Social Staging SMS Service](https://staging-api.trustingsocial.com/smsc_chat)
    * Enter `917025976692` in the `Input Phone Number` field and Submit.
    * Copy the correct OTP for the request and provide it in Use case frontend and `Submit`.

    iii. If Credit Score is healthy, `You are eligible for a loan!` message will appear in the screen. 

    iv. Click `Continue` button.

3. Loan Disbursement

    i. Provide Loan Amount and `Submit`

    ii. Based on the Credit Score, Loan Amount percentage would get accepted and amount will get credited to the bank account through `Smart Bank - Lending` API. 

            Approved Loan Amount = Requested Loan Amount * Credit Score(%)
