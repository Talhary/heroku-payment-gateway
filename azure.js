const getNumber = async (num) => {
   const res = await fetch("https://tokenization.cp.microsoft.com/tokens/pan/GetToken", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9",
            "content-type": "application/json",
            "ms-cv": "NGi4o+AplVYrfYEvYRinFs.13",
            "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Microsoft Edge\";v=\"128\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "x-edge-shopping-flag": "0",
            "Referer": "https://signup.azure.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{ \"data\": \"${num}\" }`,
        "method": "POST"
    });
    const data = await res.json()
    return data;
}
const getAuth = async () => {

    const res = await fetch("https://tokenization.cp.microsoft.com/tokens/piAuthKey/GetToken", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9",
            "content-type": "application/json",
            "ms-cv": "NGi4o+AplVYrfYEvYRinFs.15",
            "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Microsoft Edge\";v=\"128\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "x-edge-shopping-flag": "0",
            "Referer": "https://signup.azure.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{ \"data\": \"MrSvEtruaWYTnCLY6kYmDQwjzAN9O0H0Smn9VMXmRzmF6pngg+uJtCu92AOap9DWPEYb2B2YBbSIyg54IBAWTg==\" }",
        "method": "POST"
    })
    
    const data = await res.json()

    return data;
}
getAuth()
const getCvv = async (cvv) => {

    const res = await fetch("https://tokenization.cp.microsoft.com/tokens/cvv/GetToken", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9",
            "content-type": "application/json",
            "ms-cv": "NGi4o+AplVYrfYEvYRinFs.14",
            "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Microsoft Edge\";v=\"128\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "x-edge-shopping-flag": "0",
            "Referer": "https://signup.azure.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{ \"data\": \"${cvv}\" }`,
        "method": "POST"
    }); const data = await res.json()
    return data;
}
// getCvv('505').then(console.log)
const payment = async (num,  month,year, cvv) => {
    const {data:number} = await getNumber(num)
    const {data:cvvv} = await getCvv(cvv);
    const {data:auth} = await getAuth();
    console.log({number,cvvv,auth})
    const res = await fetch("https://paymentinstruments.mp.microsoft.com/v6.0/users/me/paymentInstrumentsEx?country=pk&language=en&partner=Azure", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9",
            "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL3BheW1lbnRpbnN0cnVtZW50cy5tcC5taWNyb3NvZnQuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOTNmNTFkYTktZjQwMi00OWIxLThiYjktZWQwMzViMzc0MGNiLyIsImlhdCI6MTcyNjQwNjIxOCwibmJmIjoxNzI2NDA2MjE4LCJleHAiOjE3MjY0MDk3ODIsImFjciI6IjAiLCJhaW8iOiJBV1FBbS84WEFBQUE5SmltczlkMUxHYzFaL3dVRko0cHB3M3lubzJpc1Q0ajZQZ2V6V1NYYnNBNkVLQ0tUSDlQa21QYVViMXQ2UzF2SURSQm9MMVNiOGs0VWtSUUlJazZhdGJ4NHo4MWxDS0tWaUJHdjF5Rm92dWNLNEN2bVBlMkRCSmQ5MmR6dEJQViIsImFsdHNlY2lkIjoiMTpsaXZlLmNvbTowMDAzN0ZGRjg1RjYwMEM1IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjhlMGU4ZGI1LWI3MTMtNGU5MS05OGU2LTQ3MGZlZDBhYTRjMiIsImFwcGlkYWNyIjoiMiIsImVtYWlsIjoibXRhbGhhbWF0aHNAZ21haWwuY29tIiwiZmFtaWx5X25hbWUiOiJSaWF6IiwiZ2l2ZW5fbmFtZSI6IlRhbGhhIiwiaWRwIjoibGl2ZS5jb20iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyMjMuMTIzLjk1LjIxMyIsIm5hbWUiOiJUYWxoYSBSaWF6Iiwib2lkIjoiM2FjZjNkODAtYjA2Ni00NzI0LWJjMmMtNDVlZmJiYTU0NDVlIiwicHVpZCI6IjEwMDMyMDAzQ0RENkIxOTUiLCJyaCI6IjAuQVVFQnFSMzFrd0wwc1VtTHVlMERXemRBeTBad3JCeXhuS3RBbnhQdjBmZDRzOHhDQVowLiIsInNjcCI6InBpZmQuY3JlYXRlIHBpZmQuZGVsZXRlIHBpZmQucmVhZCBwaWZkLnVwZGF0ZSIsInN1YiI6InQwODNZbGZrRmhGR0s5TmplUk03SjJpN0VUYXlzamEwYi05TzhSbXBJZjQiLCJ0aWQiOiI5M2Y1MWRhOS1mNDAyLTQ5YjEtOGJiOS1lZDAzNWIzNzQwY2IiLCJ1bmlxdWVfbmFtZSI6ImxpdmUuY29tI210YWxoYW1hdGhzQGdtYWlsLmNvbSIsInV0aSI6Im9ZTmpocUNqSjBLNzJKQlB3dlJXQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDE4In0.FEsVQ0l1soFts6XfzOy3PKjqH_Z4V5n_B6qJt4iE_bOSSzLZaBtVUhz52GbD3wX3aIUbBz_JcFU2EZTwMzQWMTLocft5NNWQ2ITnVG9mvmMppmx8pMZyppC8e3mH3i2x3I4hGYXgecaFHRh-IWAxjUq2Dz_rC2eSOFhbEiRFE6VldXS3etlUqSpSzS05gkANAwifS9tQW1CPAqyO6TI4kubAHuXnUqubWMFXUrwdYja89XtwDIFQe_Bc9Gb1nh_x8QfkcAqRm2tvvxmBASw_GuZrM3YKM8HXhxJ7-59b_7K4GFc73T39DVLR5jqY8MnhHVkECZP51_dvjsmw8h010w",
            "content-type": "application/json",
            "correlation-context": "v=1,ms.b.tel.scenario=commerce.signup.azuresignup,ms.b.tel.partner=Azure,ms.c.cfs.payments.partnerSessionId=e04fd10f-f14b-4eb9-a8dc-ef9edc26bdf1",
            "ms-cv": "NGi4o+AplVYrfYEvYRinFs.12",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Microsoft Edge\";v=\"128\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "x-edge-shopping-flag": "0",
            "x-ms-flight": "originCountry_PK,EnableModern",
            "x-ms-pidlsdk-version": "2.5.6_jqueryview",
            "Referer": "https://signup.azure.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"paymentMethodFamily\":\"credit_card\",\"paymentMethodType\":\"mc\",\"paymentMethodOperation\":\"add\",\"paymentMethodCountry\":\"pk\",\"paymentMethodResource_id\":\"credit_card.mc\",\"sessionId\":\"9b8c754a-7261-9ec5-c597-e5964631ecd1\",\"context\":\"purchase\",\"riskData\":{\"dataType\":\"payment_method_riskData\",\"dataOperation\":\"add\",\"dataCountry\":\"pk\",\"greenId\":\"e04fd10f-f14b-4eb9-a8dc-ef9edc26bdf1\"},\"details\":{\"dataType\":\"credit_card_mc_details\",\"dataOperation\":\"add\",\"dataCountry\":\"pk\",\"accountHolderName\":\"Muhammad Talha\",\"accountToken\":\"${number}\",\"expiryMonth\":\"${month}\",\"expiryYear\":\"${year}\",\"cvvToken\":\"${cvvv}\",\"address\":{\"addressType\":\"billing\",\"addressOperation\":\"add\",\"addressCountry\":\"pk\",\"address_line1\":\"Shah dara Rd. Bhara kahu Islamabad\",\"city\":\"Islamabad\",\"postal_code\":\"45400\",\"country\":\"pk\"},\"permission\":{\"dataType\":\"permission_details\",\"dataOperation\":\"add\",\"dataCountry\":\"pk\",\"hmac\":{\"algorithm\":\"hmacsha256\",\"keyToken\":\"${auth}\",\"data\":\"TigdiiDBcuXrA5mp26y8G31BEMOQhkq+EW33K0l+SZo=\"},\"userCredential\":\"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL3BheW1lbnRpbnN0cnVtZW50cy5tcC5taWNyb3NvZnQuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOTNmNTFkYTktZjQwMi00OWIxLThiYjktZWQwMzViMzc0MGNiLyIsImlhdCI6MTcyNjQwNjIxOCwibmJmIjoxNzI2NDA2MjE4LCJleHAiOjE3MjY0MDk3ODIsImFjciI6IjAiLCJhaW8iOiJBV1FBbS84WEFBQUE5SmltczlkMUxHYzFaL3dVRko0cHB3M3lubzJpc1Q0ajZQZ2V6V1NYYnNBNkVLQ0tUSDlQa21QYVViMXQ2UzF2SURSQm9MMVNiOGs0VWtSUUlJazZhdGJ4NHo4MWxDS0tWaUJHdjF5Rm92dWNLNEN2bVBlMkRCSmQ5MmR6dEJQViIsImFsdHNlY2lkIjoiMTpsaXZlLmNvbTowMDAzN0ZGRjg1RjYwMEM1IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjhlMGU4ZGI1LWI3MTMtNGU5MS05OGU2LTQ3MGZlZDBhYTRjMiIsImFwcGlkYWNyIjoiMiIsImVtYWlsIjoibXRhbGhhbWF0aHNAZ21haWwuY29tIiwiZmFtaWx5X25hbWUiOiJSaWF6IiwiZ2l2ZW5fbmFtZSI6IlRhbGhhIiwiaWRwIjoibGl2ZS5jb20iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyMjMuMTIzLjk1LjIxMyIsIm5hbWUiOiJUYWxoYSBSaWF6Iiwib2lkIjoiM2FjZjNkODAtYjA2Ni00NzI0LWJjMmMtNDVlZmJiYTU0NDVlIiwicHVpZCI6IjEwMDMyMDAzQ0RENkIxOTUiLCJyaCI6IjAuQVVFQnFSMzFrd0wwc1VtTHVlMERXemRBeTBad3JCeXhuS3RBbnhQdjBmZDRzOHhDQVowLiIsInNjcCI6InBpZmQuY3JlYXRlIHBpZmQuZGVsZXRlIHBpZmQucmVhZCBwaWZkLnVwZGF0ZSIsInN1YiI6InQwODNZbGZrRmhGR0s5TmplUk03SjJpN0VUYXlzamEwYi05TzhSbXBJZjQiLCJ0aWQiOiI5M2Y1MWRhOS1mNDAyLTQ5YjEtOGJiOS1lZDAzNWIzNzQwY2IiLCJ1bmlxdWVfbmFtZSI6ImxpdmUuY29tI210YWxoYW1hdGhzQGdtYWlsLmNvbSIsInV0aSI6Im9ZTmpocUNqSjBLNzJKQlB3dlJXQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxIDE4In0.FEsVQ0l1soFts6XfzOy3PKjqH_Z4V5n_B6qJt4iE_bOSSzLZaBtVUhz52GbD3wX3aIUbBz_JcFU2EZTwMzQWMTLocft5NNWQ2ITnVG9mvmMppmx8pMZyppC8e3mH3i2x3I4hGYXgecaFHRh-IWAxjUq2Dz_rC2eSOFhbEiRFE6VldXS3etlUqSpSzS05gkANAwifS9tQW1CPAqyO6TI4kubAHuXnUqubWMFXUrwdYja89XtwDIFQe_Bc9Gb1nh_x8QfkcAqRm2tvvxmBASw_GuZrM3YKM8HXhxJ7-59b_7K4GFc73T39DVLR5jqY8MnhHVkECZP51_dvjsmw8h010w\"}}}`,
        "method": "POST"
    });
    const data =await res.json()
    return data;
}
payment('5590490222537225','12','2028','881').then(console.log)