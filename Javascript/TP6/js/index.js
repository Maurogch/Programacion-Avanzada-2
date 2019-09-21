var pagination = 0;

function indexLoad() {
  asyncLoadPosts(0);
}

function post() {
  var title = document.getElementById('title').value;
  var body = document.getElementById('body').value;

  if (title == '' || body == '') {
    document.getElementById('form').reportValidity();
    return;
  }

  var api =
    'https://utn2019-avanzada2-tp6.herokuapp.com/api/posts?title=' +
    title +
    '&body=' +
    body;

  sendPost(api)
    .then(result => {
      document.getElementById('posts').innerHTML = '';
      asyncLoadPosts(0);
    })
    .catch(err => {
      console.log(err);
      alert(
        'Error al enviar comentario, recargue la página e intente de nuevo por favor '
      );
    });
}

async function asyncLoadPosts(offset) {
  document.getElementById('posts').innerHTML = '';
  window.scrollTo(0, 0); //scroll to top of page

  pagination = pagination + offset;

  if (pagination === 0) {
    document.getElementById('btnNewer').setAttribute('disabled', true);
  } else {
    document.getElementById('btnNewer').removeAttribute('disabled');
  }

  await loadPosts(pagination)
    .then(result => {
      console.log(result);
      result.forEach(element => {
        let div = document.createElement('div');
        div.classList.add('card', 'mb-4', 'post');

        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = 'https://picsum.photos/id/' + element.id + '/750/300';
        img.alt = 'Cargando Imágen';
        div.appendChild(img);

        let div2 = document.createElement('div');
        div2.classList.add('card-body');

        let h2 = document.createElement('h2');
        h2.classList.add('card-title');
        h2.innerHTML = element.title;
        div2.appendChild(h2);

        let p = document.createElement('p');
        p.classList.add('card-text');
        p.innerHTML = element.body.substring(100, 0); //limit body to 100 chars
        div2.appendChild(p);

        let a = document.createElement('a');
        a.classList.add('btn', 'btn-primary');
        a.href = document.URL + 'post.html?id=' + element.id;
        a.innerHTML = 'Seguir leyendo';
        div2.appendChild(a);

        div.appendChild(div2);

        let div3 = document.createElement('div');
        div3.classList.add('card-footer', 'text-muted');
        let options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };
        let date = new Date(element.date);
        date.setHours(date.getHours() - 3); //Shift hours to UTC-3, seems local datetime is not doing it
        div3.innerHTML =
          'Post publicado el ' + date.toLocaleDateString('es-US', options);
        div.appendChild(div3);

        document.getElementById('posts').appendChild(div);
      });

      document.getElementById('loader').setAttribute('hidden', true);

      noPosts();
    })
    .catch(err => {
      console.log(err);
      alert('Error cargando la lista de posts, recargue la página por favor');
    });
}

function loadPosts(paginationWithOffset) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    var api =
      ' https://utn2019-avanzada2-tp6.herokuapp.com/api/posts?from=' +
      paginationWithOffset +
      '&to=' +
      (paginationWithOffset + 5);
    console.log(api);
    request.open('GET', api);

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

function noPosts() {
  var posts = document.getElementsByClassName('post');

  if (posts.length < 1) {
    document.getElementById('noposts').removeAttribute('hidden');
  }
}

function sendPost(api) {
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
