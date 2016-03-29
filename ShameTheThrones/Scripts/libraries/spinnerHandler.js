function fullPageSpinner() {
    var newElement = document.createElement("div");
    newElement.className = "spinner";
    newElement.style.position = "fixed";
    newElement.style.top = "0";
    newElement.style.bottom = "0";
    newElement.style.left = "0";
    newElement.style.right = "0";
    newElement.style.backgroundColor = "rgba(0,0,0,0.4)";
    newElement.style.zIndex = "500";
    document.getElementsByTagName('body')[0].appendChild(newElement);
    var spinner = new Spinner().spin();
    newElement.appendChild(spinner.el);
}
fullPageSpinner();