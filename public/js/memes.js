function fetchData() {
    fetch("https://api.imgflip.com/get_memes").then(response => {
      if(!response.ok) {
        console.log(response);
        throw Error ('Error');
      }
   return response.json();
   
    }).then(data => {
      console.log(data.data);
  const id = [data.data].map(get_meme => {
       return `
        id: ${data.data.memes[0].id}
        width: ${data.data.memes[0].width}
        height: ${data.data.memes[0].height}
        image: <img src= "${data.data.memes[0].url}"/>
        `
      })
     console.log('This is the output from the variable id: ' + id)
     
      document
      .querySelector('#memes')
      .insertAdjacentHTML('afterbegin', id)
      
    }).catch(error => {
      (console.log(error))
    });
  }
  
  fetchData(); 

  