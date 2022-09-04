let sectionalOffsetTops = [];
let currentActiveSectionIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  //   const skillsSection = document.querySelector(".hk-section-skills");
  //   const windowHeight = window.innerHeight;
  //   document.querySelectorAll(".hk-skill").forEach((skill) => {
  //     console.log(skill.offsetTop, skillsSection.offsetTop);
  //   });
  setSectionalOffsetTops();
  setCurrentActiveSectionIndex(document.scrollingElement.scrollTop);
  setActiveHeaderTab(currentActiveSectionIndex);

  let currentClientY = 0;
  let finalClientY = 0;
  let canAnimateAboutMe = true;
  document.body.addEventListener("touchstart", (e) => {
    currentClientY = e.touches[0].clientY;
  });
  document.body.addEventListener("touchmove", (e) => {
    finalClientY = e.touches[0].clientY;
  });
  document.body.addEventListener("touchend", (e) => {
    if (canAnimateAboutMe) {
      const description = document.querySelector(".hk-section-description");
      const textContainer = document.querySelector(".hk-about-text-container");
      const header = document.querySelector(".hk-section-header");
      if (currentClientY - finalClientY > 0) {
        description.classList.remove("display-none");
        setTimeout(() => {
          textContainer.classList.add("hk-about-text-container-scroll-down");
          setTimeout(() => {
            header.classList.add("display-none");
            document.body.style.overflow = "auto";
          }, 300);
        }, 100);
      } else {
        header.classList.remove("display-none");
        setTimeout(() => {
          textContainer.classList.remove("hk-about-text-container-scroll-down");
          setTimeout(() => {
            description.classList.add("display-none");
            document.body.style.overflow = "hidden";
          }, 300);
        }, 100);
      }
    }
  });
  document.addEventListener("scroll", (event) => {
    if (event.target.scrollingElement.scrollTop === 0) {
      canAnimateAboutMe = true;
    } else {
      canAnimateAboutMe = false;
    }
    toggleHeaderShadow(event.target.scrollingElement);
    setCurrentActiveSectionIndex(event.target.scrollingElement.scrollTop);
    setActiveHeaderTab(currentActiveSectionIndex);
  });
});

function toggleHeaderShadow(scrollElement) {
  const scrollTop = scrollElement.scrollTop;

  const header = document.querySelector(".hk-header");
  if (scrollTop > 50) {
    header.classList.add("hk-header-has-shadow");
  } else {
    header.classList.remove("hk-header-has-shadow");
  }
}
function setActiveHeaderTab(activeTabIndex) {
  document.querySelectorAll(".hk-nav-link").forEach((section, index) => {
    if (index === activeTabIndex) {
      section.classList.add("hk-nav-link-active");
    } else {
      section.classList.remove("hk-nav-link-active");
    }
  });
}

function setSectionalOffsetTops() {
  if (sectionalOffsetTops.length === 0) {
    const headerHeight = document.querySelector(".hk-header").clientHeight;
    const sections = document.querySelectorAll(".hk-section");
    sections.forEach((section) => {
      sectionalOffsetTops.push(section.offsetTop - headerHeight);
    });
  }
}

function setCurrentActiveSectionIndex(scrollTop) {
  const currentScrollTop = scrollTop;
  for (let i = 0; i < sectionalOffsetTops.length; i++) {
    if (
      i === sectionalOffsetTops.length - 1 ||
      (currentScrollTop >= sectionalOffsetTops[i] &&
        currentScrollTop < sectionalOffsetTops[i + 1])
    ) {
      currentActiveSectionIndex = i;
      break;
    }
  }
}
