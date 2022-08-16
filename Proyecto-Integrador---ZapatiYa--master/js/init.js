document.addEventListener("DOMContentLoaded", () => {
  //NavBar Menu
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
  //Slider

  var elems = document.querySelectorAll(".slider");
  var instances = M.Slider.init(elems, {
    indicators: false,
    height: 500,
    duration: 1000,
    interval: 5000,
  });
});

document.addEventListener('DOMContentLoaded', () => {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {
    constrainWidth: false,
    constrainHeit: false,
    closeOnClick: false,
    inDuration: 700,
    outDuration: 900,
  });
});

