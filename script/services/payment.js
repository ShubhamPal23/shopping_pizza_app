var options = {
    "key": "rzp_test_BZlyVp26SWsi0K", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Pizza Shop", //your business name
    "description": "Pizza Shop Transaction",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZkmH_3W5AuY9I7D09Ww-A_WdXciqn5KYv1RM3RmBCg1Jw4_zetBjfg1MS4cdneVq8VAc&usqp=CAU",

    "handler": function (response){
        alert("Payment Done....")
        alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Customer Name", //your customer's name
        "email": "CustomerEmail@example.com", 
        "contact": "CustomerPhone"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
    alert("Payment Fail");
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
document.getElementById('rzp-button1').addEventListener('click',function(){
    rzp1.open();
    e.preventDefault();
});
