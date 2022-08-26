// check if ther is local storge color option
let backoption = true;
let changBack;
let Mcolor = localStorage.getItem("colorOption");
let backStatus = localStorage.getItem("backStatus");

if (Mcolor !== null) {
  document.documentElement.style.setProperty("--mcolor", Mcolor);
  document.querySelectorAll(".colorlist li").forEach((el) => {
    el.classList.remove("active");
    if (el.getAttribute("datacolor") === Mcolor) {
      el.classList.add("active");
    }
  });
}

if (backStatus !== null) {
  document.querySelectorAll(".RandomBackgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backStatus === "true") {
    backoption = true;
    document.querySelector(".RandomBackgrounds .yes").classList.add("active");
  } else {
    backoption = false;
    document.querySelector(".RandomBackgrounds .no").classList.add("active");
  }
}

/* start setting box  */

let setting = document.querySelector(".setting-box");
let icon = document.querySelector(".icon");

icon.onclick = function () {
  setting.classList.toggle("open");
};

/* end setting box  */

// switch color

const colorli = document.querySelectorAll(".colorlist li");
colorli.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--mcolor",
      e.target.getAttribute("datacolor")
    );
    localStorage.setItem("colorOption", e.target.getAttribute("datacolor"));
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

const randBakEl = document.querySelectorAll(".RandomBackgrounds span");
randBakEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    span.classList.add("active");
    if (e.target.dataset.back === "yes") {
      backoption = true;
      backinterva();
      localStorage.setItem("backStatus", true);
    } else {
      backoption = false;
      clearInterval(changBack);
      localStorage.setItem("backStatus", false);
    }
  });
});
// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".navBullts");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// start landing
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {

  if (backgroundOption === true) {

    backgroundInterval = setInterval(() => {

      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
    
      // Change Background Image Url 
      landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
    
    }, 1000);

  }

}


// Skills

let Skills = document.querySelector(".skills");

window.onscroll = () => {
  let SofsetTop = Skills.offsetTop;

  let SosetH = Skills.offsetHeight;

  let wHeight = this.innerHeight;

  let scrol = this.pageYOffset;

  if (scrol > SofsetTop + SosetH - wHeight) {
    let ourSkills = document.querySelectorAll(
      ".skills .skillBox .skillProgress span"
    );
    ourSkills.forEach((skill) => {
      let num = skill.parentElement.getAttribute("dataProgress");
      skill.style.cssText = `width:${num}`;
    });
  }
};

//creat popup

let OurGallery = document.querySelectorAll(".imgBox img");
OurGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //creat overlay
    let popOverlay = document.createElement("div");
    popOverlay.className = "popOverlay";
    document.body.appendChild(popOverlay);

    //create popBox
    let popBox = document.createElement("div");
    popBox.className = "popBox";
    document.body.appendChild(popBox);

    if (img.alt !== null) {
      let imghead = document.createElement("h3");

      let imgheadtext = document.createTextNode(img.alt);

      imghead.appendChild(imgheadtext);
      popBox.appendChild(imghead);
    }

    let popBoximg = document.createElement("img");
    popBoximg.src = img.src;
    popBox.appendChild(popBoximg);

    // create close span
    let imgclose = document.createElement("span");
    imgclose.className = "closeBotton";
    let imgclosetext = document.createTextNode("X");

    imgclose.appendChild(imgclosetext);
    popBox.appendChild(imgclose);
  });
});

// close the popup

document.addEventListener("click", (e) => {
  if (e.target.className === "closeBotton") {
    document.querySelector(".popOverlay").remove();
    document.querySelector(".popBox").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".navBullts .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

document.querySelector(".reset").onclick = () => {
  localStorage.clear();
  window.location.reload();
};

// Toggle

let toggleBtn = document.querySelector(".toggle");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");
      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = (e) => {
  e.stopPropagation();
};
