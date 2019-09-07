function indexLoad(){
    var posts = document.getElementsByClassName("post");
    console.log(posts);
    if (posts.length < 1){
        document.getElementById("noposts").removeAttribute("hidden");
    }
}