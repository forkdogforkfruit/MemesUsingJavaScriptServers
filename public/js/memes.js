
function fetchData() {
  //   fetch("https://api.imgflip.com/get_memes").then(response => {
  //     if(!response.ok) {
  //       console.log(response);
  //       throw Error ('Error');
  //     }
  //  return response.json();
   
  //   }).then(data => {
  //     console.log(data.data);

//   if(locals.memes === undefined) {
//   get(memes_url).then(
//     function (response) {
//       memesList = response.data.memes   
//     }
//   ).catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// }
      
    const ID = locals.memesList.map(get_meme => {
    /* console.log('data.length = ' + (data.data.memes.length )) */
    
    /*functions that loops over the array and puts the images in the images column */
    let id = 0
    while (id < data.data.memes.length) {
      `${data.data.memes[id].id}`
      const tempDiv = document.createElement("div")
      document
      .querySelector('#memes')
      .insertAdjacentElement('afterbegin', tempDiv)
      .insertAdjacentHTML('afterbegin',`${data.data.memes[id].id}`)
      id++;
    };

    //need to find a way to print width x height here. 
    let w = 0
    
    while (w < data.data.memes.length) {
      `${data.data.memes[w].width}
       ${data.data.memes[w].height}`
      const tempDiv = document.createElement("div")
      document
      .querySelector('#size')
      .insertAdjacentElement('afterbegin', tempDiv)
      .insertAdjacentHTML('afterbegin',` ${data.data.memes[w].width} x ${data.data.memes[w].height}`)
      w++;
    }
    let img = 0
    while (img < data.data.memes.length) {
      
      const tempDiv = document.createElement("div")
      document
      .querySelector('#image')
      .insertAdjacentElement('afterbegin', tempDiv)
      .insertAdjacentHTML('afterbegin',`<img src= "${data.data.memes[img].url}" width="${data.data.memes[img].width * 0.2}" height="${data.data.memes[img].height * 0.2}"/>`)
      img++;
    }
    let options = 0
    while (options < data.data.memes.length) {
      `${data.data.memes[options].name}`
      const tempDiv = document.createElement("div")
      document
      .querySelector('#options')
      .insertAdjacentElement('afterbegin', tempDiv)
      .insertAdjacentHTML('afterbegin',`${data.data.memes[options].name}`)
      options++;
    }
      })
    // }).catch(error => {
    //   (console.log(error))
    // });
  }
  
  fetchData(); 

  