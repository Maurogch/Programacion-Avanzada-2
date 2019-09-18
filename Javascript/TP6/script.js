function indexLoad() {
  asyncLoadPosts();
}

async function asyncLoadPosts() {
  await loadPosts()
    .then(result => {
      var posts = document.getElementsByClassName('post');

      if (posts.length < 1) {
        document.getElementById('noposts').removeAttribute('hidden');
      }

      console.log(result);
      result.forEach(element => {
        let div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('mb-4');

        //seguir hacendo append de los otros tags de post
        //descartar todo iframe

        div.appendChild(iframe);

        document.getElementById('posts').appendChild(div);
      });
    })
    .catch(err => {
      console.log(err);
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
