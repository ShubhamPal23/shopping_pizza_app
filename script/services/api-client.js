import URL from '../utils/constant.js';
// asnc code behave as await
async function NetworkCall(){
    
    try{
    const response=await fetch(URL);
    const data=await response.json();//synchronous blocked
    return data;
    }
    catch(err){
        console.log('Some problem in API call',err);
        throw err;
    }
}
// function makeNetworkCall(){
//     const promise=fetch(URL);
//     console.log('Promise is :',promise);
//     promise.then(response=>{
//         console.log('Response is : ',response);
//         const promise2=response.json();
//         promise2.then(data=>console.log('Data is: ',data)).catch(e=>console.log('JSON is giving parse '))
//     }).catch(err=>console.log('ERROR'))
// }
export default NetworkCall;
//three states of fetch : 1.pending 2.Fulfilled 3.Rejected
//SYNC : 1. CPU CENTRIC 2. call->wait->return/result 3. BLOCKING 
//ASYNC : 1. I/O CENTRIC 2. NON BLOCKING 3.

//Event queue; 
