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
  document.addEventListener("scroll", (event) => {
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
