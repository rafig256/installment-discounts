let maxCount = 9;
//function for empty factor
function doZero(){
    document.getElementById('resPrepayment').value ='';
    document.getElementById('perMonth').value ='';
    document.getElementById('total-payment').value ='';
    document.getElementById('profit').value ='';
    document.getElementById('discount').value ='';
}
// Find cost When change Select
function changeSelect(sel){
    let userSelected = sel.options[sel.selectedIndex].value;
    let cost = 0;
    switch (userSelected) {
        case '1':
            cost = 3000000; maxCount = 5; break;
        case '2':
            cost = 5000000; maxCount = 8; break;
        case '3':
            cost = 12000000; maxCount = 9; break;
        case '4':
            cost = 30000000; maxCount = 9;break;
        case '5':
            cost = 33000000; maxCount = 9;break;
        case '6':
            cost = 28000000; maxCount = 8;break;
        case '7':
            cost = 22000000; maxCount = 7;break;
        case '8':
            cost = 15000000; maxCount = 6;break;
        case '9':
            cost = 8000000; maxCount = 5;break;
        default:
            cost = 0;
    }
    document.getElementById('cost').value = Number(cost);
    document.getElementById('toman').innerHTML = Number(cost).toLocaleString() + ' تومان';
    document.getElementById('prepayment').value = cost*20/100;
}

// Listen for submit
document.getElementById('invoice-form').addEventListener('submit', function (e){
    e.preventDefault();
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 1000);
});

// Calculate Results
function calculateResults() {
    // UI Vars
    // Calculate Cost
    // console.log(cost);
    costing = document.getElementById('cost').value;
    console.log('مبلغ کل = '+ costing);
    let prepayment = document.getElementById('prepayment').value ;// گرفتن مبلغ پیش پرداخت
    console.log('prepayment = ' + prepayment);
    if ( prepayment < 20/100 * costing ){
        alert('مبلغ پیش پرداخت نمی تواند کمتر از '+ costing * 20/100 + ' باشد. ');
        document.getElementById('loading').style.display = 'none';
        doZero();
        return false;
    }
    
    document.getElementById('resPrepayment').value = prepayment;
    let count = document.getElementById('count').value;  //تعداد اقساط
    console.log('تعداد اقساط = '+ count);
    if (count > maxCount){
        alert("برای محصولات با هزینه "+costing+" تومان حداکثر تعداد اقساط "+ maxCount + " می باشد. لطفا تعداد اقساط را تغییر داده و ادامه دهید."        );
        document.getElementById('loading').style.display = 'none';
        doZero();
        return false;
    }
    //condition for count tax
    let discount = Math.round(Math.sqrt(621-69*count)); // محاسبه میزان تخفیف
    document.getElementById('discount').value = discount;
    
    console.log('درصد تخفیف = ' + discount);
    let total_payment = costing - discount/100*costing; // محاسبه کل مبلغ پرداختی
    document.getElementById('total-payment').value = total_payment;
    console.log('کل مبلغ پرداختی: ' + total_payment);
    
    let perMonth = Math.round((total_payment- prepayment)/(count*10000))*10000;// محاسبه اقساط ماهانه
    document.getElementById('perMonth').value = perMonth;
    
    if(count == 0){
        document.getElementById('perMonth').value = total_payment - prepayment;
    }
    
    let profit = costing*(discount/100 ); // محاسبه سود
    document.getElementById('profit').value = Math.round(profit/1000)*1000;
    // Hide loader
    document.getElementById('loading').style.display = 'none';
    e.preventDefault();
}


