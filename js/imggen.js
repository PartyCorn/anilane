let url = new URL(window.location.href);
let searchParams = url.searchParams;

let title = decodeURIComponent(searchParams.get("title"));
let ep = searchParams.get("ep");
let image = decodeURIComponent(searchParams.get("image"));

preview = document.getElementById("preview");
document.getElementById("image").src = image;
document.getElementById("title").innerText = title.toUpperCase();
document.getElementById("ep").innerText = ep + " серия";