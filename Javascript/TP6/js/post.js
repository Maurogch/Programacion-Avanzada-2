function onload() {
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get('id');

  console.log(id);

  setPost(id);
  setComments(id);
}

function comment() {
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get('id');
  var author = document.getElementById('author').value;
  var text = document.getElementById('text').value;

  if (author == '' || text == '') {
    document.getElementById('form').reportValidity();
    return;
  }

  var api =
    'https://utn2019-avanzada2-tp6.herokuapp.com/api/comments?post_id=' +
    id +
    '&author=' +
    author +
    '&text=' +
    text;

  sendComment(api)
    .then(result => {
      //location.reload();
      document.getElementById('comments').innerHTML = ''; //Rebuild comments intead of reloading entire page
      setComments(id);
    })
    .catch(err => {
      console.log(err);
      alert(
        'Error al enviar comentario, recargue la página e intente de nuevo por favor '
      );
    });
}

async function setPost(id) {
  loadPost(id)
    .then(result => {
      console.log(result);
      document.getElementById('postTitle').innerHTML = result.title;

      document.getElementById('date').innerHTML =
        'Posteado el ' + pharseDate(result.date);

      let imgString = 'https://picsum.photos/id/' + id + '/900/300';
      document.getElementById('img').setAttribute('src', imgString);

      document.getElementById('body').innerHTML = result.body;
    })
    .catch(err => {
      console.log(err);
      alert('Error al cargar el post, recargue la página por favor');
    });
}

async function setComments(id) {
  loadComments(id)
    .then(result => {
      console.log(result);
      var count = 1;
      result.forEach(element => {
        let div = document.getElementById('comments');

        let div2 = document.createElement('div');
        div2.classList.add('media', 'mb-4');
        div.appendChild(div2);

        let img = document.createElement('img');
        img.classList.add('d-flex', 'mr-3', 'rounded-circle');
        img.setAttribute('src', 'http://lorempixel.com/50/50/people/' + count);
        div2.appendChild(img);

        let div3 = document.createElement('div');
        div3.classList.add('media-body');

        let h5 = document.createElement('h5');
        h5.classList.add('mt-0');
        h5.innerHTML = element.author;
        div3.appendChild(h5);

        let span = document.createElement('span');
        span.innerHTML = element.text;
        div3.appendChild(span);

        let h6 = document.createElement('h6');
        h6.innerHTML = pharseDate(element.date);
        div3.appendChild(h6);

        div2.appendChild(div3);

        count++;
      });
    })
    .catch(err => {});
}

function sendComment(api) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();

    request.open('POST', api);

    request.responseType = 'json';

    request.onload = function() {
      if (request.status == 200) {
        resolve(request.response);
      } else {
        reject(Error('Data load error'));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network problem'));
    };

    request.send();
  });
}

function loadPost(id) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();

    request.open(
      'GET',
      'https://utn2019-avanzada2-tp6.herokuapp.com/api/posts/' + id
    );

    request.responseType = 'json';

    request.onload = function() {
      if (request.status == 200) {
        resolve(request.response);
      } else {
        reject(Error('Data load error'));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network problem'));
    };

    request.send();
  });
}

function loadComments(id) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();

    request.open(
      'GET',
      'https://utn2019-avanzada2-tp6.herokuapp.com/api/comments?post_id=' + id
    );

    request.responseType = 'json';

    request.onload = function() {
      if (request.status == 200) {
        resolve(request.response);
      } else {
        reject(Error('Data load error'));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network problem'));
    };

    request.send();
  });
}

function pharseDate(input) {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  let date = new Date(input);
  date.setHours(date.getHours() - 3);
  return date.toLocaleDateString('es-US', options);
}
