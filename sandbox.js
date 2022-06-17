function print2(msg){
    var printable = document.querySelector(".print");
    printable.innerHTML = "<span class=\"print\"><p>" + msg + "</p></span>"
}

print2(".jsが適用されました")