function validate() {
    const fname = document.getElementsByName("fname")[0].value
    const lname = document.getElementsByName("lname")[0].value
    if (fname.length <= 0 || lname.length <= 0)
        window.alert("Please fill the form")
    else
        window.alert("Success!")
}
