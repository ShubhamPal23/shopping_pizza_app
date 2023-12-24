//https call
import URL from '../Utils/constant.js';
async function NetworkCall(){
    try{
        const response =  await fetch(URL);           // same code as below to avoid  callback hell
        const object = await response.json();
        return object;
    }
    catch(err){
        console.log("error in API call");
        throw err;
    }
}
export default NetworkCall;

// function networkcall(){
//     const promise = fetch(URL);
//     console.log("promise is", promise)
//     promise.then(response=>{
//         console.log("response",response)
//         const prmoise2=response.json();  //json to object                               
//         prmoise2.then(data=>console.log).catch(e=>console.log("json parse error"))
//     }).catch(e=>{
//         console.log("error unable to fetch")
//     })
// }
