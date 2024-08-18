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
  } else if (isUsernameInLocalStorage(userdata.username)) {
    audio.innerHTML = ` <audio src="./audio/User name already registered .mp3" autoplay></audio>`;
    alert("USERNAME ALREADY REGISTERED");
  } else if (userdata.account_number in localStorage) {
    audio.innerHTML = ` <audio src="./audio/Account Number already Registered.mp3 "autoplay></audio>`;
    alert("ACCOUNT NUMBER ALREADY REGISTERED");
  } else {
    let suserdata = JSON.stringify(userdata);
    console.log(suserdata);
    localStorage.setItem(userdata.account_number, suserdata);
    console.log(userdata);
    alert("registered successfully");
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
    return;
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
    audio.innerHTML = `<audio src="./audio/Invalid account number.mp3" autoplay></audio>`;
  } else {
    let userdata = JSON.parse(localStorage.getItem(login_acno));
    userdata.balance = (userdata.balance || 0) + deposit_amount;
    console.log(userdata);

    localStorage.setItem(login_acno, JSON.stringify(userdata));
    
   current_balance=JSON.parse(localStorage.getItem(login_acno));
     const resultDiv = document.getElementById("deposit_result");
    resultDiv.innerHTML = `YOUR CURRENT BALANCE IS ${current_balance.balance}`;
      resultDiv.classList.add("fade-in");
    alert("your amount added successfully");
  }
}


function withdraw() {

  let login_acno = JSON.parse(localStorage.getItem("loginacno"));
  let withdraw_acno = document.getElementById("withdraw_acno").value;
  let withdraw_ammount = parseFloat(document.getElementById("withdraw").value);


  if (!withdraw_acno || !withdraw_ammount) {
    alert("Please fill all fields.");
    return;
  }

  
  if (document.getElementById("withdraw_acno").value != login_acno) {
    alert("Invalid account number.");
    audio.innerHTML = `<audio src="./audio/Invalid account number.mp3" autoplay></audio>`;
    return;
  }

  let userdata = JSON.parse(localStorage.getItem(login_acno));

 
  if (withdraw_ammount > userdata.balance) {
    audio.innerHTML = `<audio src="./audio/Insufficient balance.mp3" autoplay></audio>`;
    alert("Insufficient balance.");
    return;
  } else if (withdraw_ammount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  alert(`Bank balance before withdrawal: ${userdata.balance}`);
  alert(`Withdrawal amount: ${withdraw_ammount}`);
  userdata.balance = userdata.balance - withdraw_ammount;
  localStorage.setItem(login_acno, JSON.stringify(userdata));

  let current_balance = JSON.parse(localStorage.getItem(login_acno));
  const resultDiv = document.getElementById("withdraw_result");
  resultDiv.innerHTML = `YOUR CURRENT BALANCE IS ${current_balance.balance}`;
  resultDiv.classList.add("fade-in");

  alert("Your amount has been withdrawn successfully.");
  alert(`After withdrawal balance: ${current_balance.balance}`);
}

 function logout() {
   localStorage.clear();
   window.location = "./index.html";
 }

