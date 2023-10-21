// login.js
document.getElementById("login").addEventListener("click", function() {
    // Get the values of the email and password inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password
      };
      
      const jsonData = JSON.stringify(data);


    const url = 'https://hackharvard.vercel.app/api/login'; 
  
    // Print the values to the console (you can replace this with your desired action)
    console.log(jsonData)




    fetch(url,{},{
        method: 'POST',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log('Data sent successfully.');
          } else {
            console.log(response)
            console.error('Failed to send data.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  });
  