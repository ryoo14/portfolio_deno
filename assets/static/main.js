function setColor() {
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const body = document.body;
  const darkColor = "#292f36";
  const lightColor = "#fffcf9";
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    themeColorMeta.setAttribute("content", darkColor);
    body.style.color = lightColor;
    body.style.backgroundColor = darkColor;
  } else {
    themeColorMeta.setAttribute("content", lightColor);
    body.style.color = darkColor;
    body.style.backgroundColor = lightColor;
  }
}

setColor();
window.matchMedia('(prefers-color-scheme: dark)').addListener(setColor);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector(".fade-in").classList.add("visible")
  }, 10);
})

//window.addEventListener('DOMContentLoaded', () => { 
//  const about = document.getElementById("about");
//  about.classList.add("visible");
//});
//
//document.querySelectorAll('.sidebar-link').forEach(link => {
//  link.addEventListener('click', function (e) {
//    e.preventDefault();
//
//    document.querySelectorAll('.ccc').forEach(c => {
//      c.style.display = "none";
//      c.classList.remove("visible");
//    });
//
//    const targetId = this.getAttribute("data-target");
//    const targetContent = document.getElementById(targetId);
//    targetContent.style.display = "grid";
//
//    setTimeout(() => {
//      targetContent.classList.add("visible");
//    }, 10);
//  });
//});

