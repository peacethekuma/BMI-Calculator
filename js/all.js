//輸入身高體重計算出BMI
//使用if判斷BMI的狀態
// 將算出的數值push到array再存至local.storage
// 點擊click將local.storage的資料更新至頁面


// Dom select
var send = document.getElementById('send');
var backBtn = document.getElementById('back');
var showStatus = document.getElementById('statusId');
var height = document.getElementById('heightId');
var weight = document.getElementById('weightId');
var record = document.getElementById('recordList');
var deleteBtn = document.querySelector('#recordList');
var data = JSON.parse(localStorage.getItem('bmiData')) || [];

update(data);


function calculateBmi(e) {
	e.preventDefault();
	var h = height.value / 100;
	var w = weight.value;
	var bmi = (w/(h*h)).toFixed(2);

	// 輸入數值篩選
	if( h == ''||w == ''){
		alert('請輸入您的數值');
		return;
	} else if (bmi == 'NaN'){
		alert('請輸入合理的數值')
		return;
	} else if (bmi >80 || bmi < 10){
		alert('請輸入合理的數值');
		return;
	} else if(h > 300 ){
		alert('請輸入合理的數值');
		return;
	}	else if(w > 400 ){
		alert('請輸入合理的數值');
		return;
	}

	// 計算日期
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var today = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var timeCount = year+'-'+month+'-'+today+' '+hour+':'+minute; 

	// 判斷BMI狀態
	var status = '';
	var classType = '';
	if( bmi < 18.5 ){
		status = '過輕';
		classType = 'underweight';
		send.setAttribute('value', bmi);
		send.innerHTML = 'BMI</br><h3>'+bmi+'</h3>';
		send.setAttribute('class', 'underweight');
		backBtn.setAttribute('class', 'underweight');
		showStatus.setAttribute('class', 'underweight');
		showStatus.innerText = status;
	} else if( bmi >= 18.5 && bmi < 25){
		status = '理想';
		classType = 'fine';
		send.setAttribute('value', bmi);
		send.innerHTML = 'BMI</br><h3>'+bmi+'</h3>';
		send.setAttribute('class', 'fine');
		backBtn.setAttribute('class', 'fine');
		showStatus.setAttribute('class', 'fine');
		showStatus.innerText = status;
	} else if (bmi >= 25 && bmi < 30){
		status = '過重';
		classType = 'overweight';
		send.setAttribute('value', bmi);
		send.innerHTML = 'BMI</br><h3>'+bmi+'</h3>';
		send.setAttribute('class', 'overweight');
		backBtn.setAttribute('class', 'overweight');
		showStatus.setAttribute('class', 'overweight');
		showStatus.innerText = status;
	} else if (bmi >= 30 && bmi < 35){
		status = '輕度肥胖';
		classType = 's-overweight';
		send.setAttribute('value', bmi);
		send.innerHTML = 'BMI</br><h3>'+bmi+'</h3>';
		send.setAttribute('class', 's-overweight');
		backBtn.setAttribute('class', 's-overweight');
		showStatus.setAttribute('class', 's-overweight');
		showStatus.innerText = status;
	} else if (bmi >= 35 && bmi < 40 ){
		status = '中度肥胖';
		classType = 'm-overweight';
		send.setAttribute('value', bmi);
		send.innerHTML = 'BMI</br><h3>'+bmi+'</h3>';
		send.setAttribute('class', 'm-overweight');
		backBtn.setAttribute('class', 'm-overweight');
		showStatus.setAttribute('class', 'm-overweight');
		showStatus.innerText = status;
	} else if (bmi >= 40 ){
		status = '嚴重肥胖';
		classType = 'l-overweight';
		send.setAttribute('value', bmi);
		send.innerHTML = 'BMI</br><h3>'+bmi+'</h3>';
		send.setAttribute('class', 'l-overweight');
		backBtn.setAttribute('class', 'l-overweight');
		showStatus.setAttribute('class', 'l-overweight');
		showStatus.innerText = status;
	} 

	// 建立物件
	var bodyIndex = {
		status: status,
		height: height.value,
		weight: w,
		bmi: bmi,
        time: timeCount,
        classType: classType,
    };
	// 將 物件 存入 array
	data.push(bodyIndex);
	// 更新資料
	update(data);
	// 將資料存入local.storage
	localStorage.setItem('bmiData',JSON.stringify(data));
	
}

// 更新資料function
function update(item){
	str ='';
	for (var i = 0; i < item.length; i++) {
		str += '<li class='+item[i].classType+'><h3>'+item[i].status+'</h3>bmi<span>'+item[i].bmi+'</span>weight<span>'+item[i].weight+'</span>height<span>'+item[i].height+'</span>'+item[i].time+'<a href="#" class="deleteBtn">刪除</a></li>';
	}
	record.innerHTML = str;
}



// 刪除資料
function deleteData(e){
	e.preventDefault();
	if(e.target.nodeName !== 'A'){return};
	var index = e.target.dataset.index; 
	data.splice(index,1); 
	localStorage.setItem('bmiData',JSON.stringify(data));//刷新localStorage
	update(data);
}

function backBlank(e) {
	e.preventDefault;
	location.reload();
}


send.addEventListener('click',calculateBmi,false);
deleteBtn.addEventListener('click',deleteData,false);
backBtn.addEventListener('click',backBlank,false);