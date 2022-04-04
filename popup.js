chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  setInterval(function () {
    chrome.tabs.sendMessage(tabs[0].id, { msg: "meta" }, function (response) {
      setMetaTags(response)
    });
  }, 500)


});

function setMetaTags(meta) {
  if (meta) {
    document.getElementById("title").innerText = meta.title;
    document.getElementById("description").innerText = meta.description;
    document.getElementById("canonical").innerText = meta.canonical;
    document.getElementById("ogtitle").innerText = meta.ogTitle;
    document.getElementById("ogdescription").innerText = meta.ogDescription;
    document.getElementById("h1tag").innerText = meta.h1Tag;
    if (meta.ogImage) {
      var img = document.getElementById("ogimage")
      if(img == null) {
        img = document.createElement("img");
      }
      img.id = "ogimage"
      img.src = meta.ogImage;
      img.style.height = "150px";
      img.style.width = "150px";
      document.body.appendChild(img);
    }
  }
}


