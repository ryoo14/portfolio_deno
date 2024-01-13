window.addEventListener('load', () => { 
  const about = document.getElementById("about");
  about.classList.add("visible");
});

document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelectorAll('.ccc').forEach(c => {
      c.style.display = "none";
      c.classList.remove("visible");
    });

    const targetId = this.getAttribute("data-target");
    const targetContent = document.getElementById(targetId);
    targetContent.style.display = "grid";

    setTimeout(() => {
      targetContent.classList.add("visible");
    }, 10);
  });
});
