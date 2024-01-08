const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  }


const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

document.getElementById('stateDistrictForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var stateValue = document.getElementById('state').value;
  var districtValue = document.getElementById('district').value;
  const urlPoint = "https://data.covid19india.org/state_district_wise.json"
  const getData = async () => {
      const res = await fetch(urlPoint);
      const data = await res.json();
      return data;
  }

  const displayUser = async () => {
      const payload = await getData();
      //console.log(payload);
      const activeUser = payload[stateValue]["districtData"][districtValue]['active'];
      const confirmedUser = payload[stateValue]["districtData"][districtValue]['confirmed'];
      const deceasedUser = payload[stateValue]["districtData"][districtValue]['deceased'];
      var resultContainer = document.getElementById('result');
      resultContainer.innerHTML = '';
      if( activeUser && confirmedUser && deceasedUser ){
          resultContainer.innerHTML = '<p>No. Of Active Users:' + activeUser + '</p><p>No. Of Confirmed Users:' + confirmedUser + '</p><p>No. Of Deceased Users:' + deceasedUser + '</p>';
      } else {
          resultContainer.innerHTML = '<p>Data NOT Found</p>';
      }
  }
  displayUser();
});
