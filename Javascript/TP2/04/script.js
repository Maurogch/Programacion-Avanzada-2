function highlight(){
    var myClass = Array.from(document.getElementsByClassName("myClass"));

    myClass.forEach(element => {
        element.style.background = "yellow";
    });
}