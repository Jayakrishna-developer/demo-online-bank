function register() {
  let userdata = {
    username: document.getElementById("username").value,
    account_number: document.getElementById("account_number").value,
    password: document.getElementById("password").value,
    balance:0
  };

  if (
    userdata.username === "" ||
    userdata.account_number === "" ||
    userdata.password === ""
  ) {
    alert("Please fill all fields");
  } else if (userdata.account_number in localStorage) {
     audio.innerHTML = ` <audio src="./audio/Account Number already Registered.mp3 "autoplay></audio>`;
    alert("ACCOUNT NUMBER ALREADY REGISTERED");
   
  }
   else if (isUsernameInLocalStorage(userdata.username)) {
    audio.innerHTML = ` <audio src="./audio/User name already registered .mp3" autoplay></audio>`;
    alert("USERNAME ALREADY REGISTERED");
  } else {
    let suserdata = JSON.stringify(userdata);
    console.log(suserdata);
    localStorage.setItem(userdata.account_number, suserdata);
    console.log(userdata);
    alert("registered successfully")
    window.location = "./login.html"; // Redirect to the login page
  }
}

function isUsernameInLocalStorage(username) {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let storedUserdata = JSON.parse(localStorage.getItem(key));
    if (storedUserdata.username === username) {
      return true;
    }
  }
  return false;
}




function login() {
  logindata = {
    accno: document.getElementById("log_account_number").value,
    password: document.getElementById("log_password").value,
  };
  key = logindata.accno;
  let reciveddata = JSON.parse(localStorage.getItem(key));
  if (!reciveddata) {
    audio.innerHTML = `<audio src="./audio/Invalid account number.mp3" autoplay></audio>`;
    alert("invalid account number");
  } else if (logindata.password !== reciveddata.password) {
    audio.innerHTML = ` <audio src="./audio/Invalid password .mp3" autoplay></audio>`;
    alert("invalid password");
    return;
  } else {
    console.log(reciveddata);
    localStorage.setItem("loginacno", logindata.accno);
    alert("login successfull");
    window.location = "./bank.html";
  }
}
    let login_acno = JSON.parse(localStorage.getItem("loginacno"));
    console.log(login_acno);
    let login_userdata = JSON.parse(localStorage.getItem(login_acno));
    console.log(login_userdata);

    head1.textContent = `WELCOME ${login_userdata.username}`;
    head1.classList.add("fade-in");
c.classList.add("fade-in");




function deposit() {
  let login_acno = JSON.parse(localStorage.getItem("loginacno"));
  let deposit_amount = parseFloat(document.getElementById("deposit").value); 

  console.log(login_acno);

  if (document.getElementById("deposit_acno").value != login_acno) {
    alert("Invalid account number");
  } else {
    let userdata = JSON.parse(localStorage.getItem(login_acno));
    userdata.balance = (userdata.balance || 0) + deposit_amount;
    console.log(userdata);

    localStorage.setItem(login_acno, JSON.stringify(userdata));
    
   current_balance=JSON.parse(localStorage.getItem(login_acno));
     const resultDiv = document.getElementById("deposit_result");
    resultDiv.innerHTML = `YOUR CURRENT BALANCE IS ${current_balance.balance}`;
      resultDiv.classList.add("fade-in");
    alert("your amount added suceesfully");
  }
}


function withdraw(){
  let login_acno = JSON.parse(localStorage.getItem("loginacno"));
  let withdraw_ammount = parseFloat(document.getElementById("withdraw").value); 

  console.log(login_acno);

  if (document.getElementById("withdraw_acno").value != login_acno) {
    alert("Invalid account number");
}

else{
  amount = document.getElementById("withdraw").value;
 let userdata= JSON.parse(localStorage.getItem(login_acno));
 if (amount > userdata.balance) {
   audio.innerHTML = ` <audio src="./audio/Insufficient balance.mp3" autoplay></audio>`;
   alert("insufficient balance");
   return;
 } else if (amount < 0){
  alert("enter a valid amount")
  return
 }
   alert(`bank balance before withdrawl:${userdata.balance}`);
  alert(`withdrawal amount :${amount} `)
  userdata.balance = (userdata.balance || 0) - withdraw_ammount;
  localStorage.setItem(login_acno, JSON.stringify(userdata));
}
current_balance=JSON.parse(localStorage.getItem(login_acno));
     const resultDiv = document.getElementById("withdraw_result");
    resultDiv.innerHTML = `YOUR CURRENT BALANCE IS ${current_balance.balance}`;
      resultDiv.classList.add("fade-in");
      
    alert("your amount withdrawed suceesfully");
    alert(`after withdrawal balance :${current_balance.balance}`)
  }

 function logout() {
   localStorage.clear();
   window.location = "./index.html";
 }

 