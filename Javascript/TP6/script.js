function indexLoad() {
  asyncLoadPosts();
}

async function asyncLoadPosts() {
  await loadPosts()
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
        a.href = document.URL + '/post.html?id=' + element.id;
        a.innerHTML = 'Seguir leyendo';
        div2.appendChild(a);

        div.appendChild(div2);

        let div3 = document.createElement('div');
        div3.classList.add('card-footer', 'text-muted');
        div3.innerHTML = new Date(element.date).toUTCString;
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

function loadPosts() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();

    request.open(
      'GET',
      ' https://utn2019-avanzada2-tp6.herokuapp.com/api/posts?from=1&to=6'
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

function noPosts() {
  var posts = document.getElementsByClassName('post');

  if (posts.length < 1) {
    document.getElementById('noposts').removeAttribute('hidden');
  }
}
