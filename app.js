//Listen for submit
let loanForm = document.getElementById('loan-form');

loanForm.addEventListener('submit',function(e){
    //Hiden result
    document.getElementById('result').style.display = 'none';

    //show loader
    document.getElementById('loading').style.display= 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


//Calculate Results
function calculateResults(){
    console.log('Calculating..');

    //
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years= document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/ 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    //Compute  monthly payment
    const x = Math.pow(1+ calculatedInterest, calculatedPayment);
    const monthly =(principal*x*calculatedInterest)/(x-1);
 

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment)-principal).toFixed(2);

        //show result
        document.getElementById('result').style.display= 'block';

        //hide loader
        document.getElementById('loading').style.display= 'none';
    }else{
        showError('Please Check Your Number');
         
        
    }



    
}

//show error
function showError(error){
    //show result
    document.getElementById('result').style.display= 'none';

    //hide loader
    document.getElementById('loading').style.display= 'none';
     
    //create  a div
    const errorDiv = document.createElement('div');

    //get ekement
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    //add class
    errorDiv.className = 'alert alert-danger';

    //creat text node and append to div
    errorDiv.appendChild(document.createTextNode(error))

    //inert erroe above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 secinds
    setTimeout(clearError, 3000);


}

function clearError(){
    document.querySelector('.alert').remove();
}