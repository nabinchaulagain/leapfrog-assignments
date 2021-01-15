const schedule = document.querySelector(".schedule");
const scheduleContainer = document.querySelector(".schedule-container");
const postToggleElems = document.querySelectorAll(".post-toggle");

const heights = [72, 72, 126, 200, 150];

for (const postToggle of postToggleElems) {
  postToggle.addEventListener("click", function (ev) {
    const postContent = ev.currentTarget.parentNode;
    const postBody = postContent.querySelector(".post-body");
    const viewportWidth = window.innerWidth;
    let heightDiff;
    if (viewportWidth < 480) {
      heightDiff = heights[0];
    } else if (viewportWidth < 768) {
      heightDiff = heights[1];
    } else if (viewportWidth < 998) {
      heightDiff = heights[2];
    } else if (viewportWidth < 1500) {
      heightDiff = heights[3];
    } else {
      heightDiff = heights[4];
    }
    let isPostHidden = false;
    if (postBody.classList.contains("post-hidden")) {
      isPostHidden = true;
    }
    if (!isPostHidden) {
      postToggle.innerHTML = '<i class="fas fa-plus"></i>';
      heightDiff = -heightDiff;
    } else {
      postToggle.innerHTML = '<i class="fas fa-minus"></i>';
    }
    schedule.style.height = schedule.offsetHeight + heightDiff + "px";
    scheduleContainer.style.height =
      scheduleContainer.offsetHeight + heightDiff + "px";
    postBody.classList.toggle("post-hidden");
  });
}
const scheduleContainerHeights = [353, 423, 439, 520, 800];
const scheduleHeights = [328, 388, 384, 480, 780];
window.addEventListener("resize", function () {
  if (document.querySelectorAll(".post-hidden").length === 1) {
    return;
  }
  const viewportWidth = window.innerWidth;
  console.log(viewportWidth);
  let heightDiff, scheduleContainerHeight, scheduleHeight;
  if (viewportWidth < 480) {
    heightDiff = heights[0];
    scheduleHeight = scheduleHeights[0];
    scheduleContainerHeight = scheduleContainerHeights[0];
  } else if (viewportWidth < 768) {
    heightDiff = heights[1];
    heightDiff = heights[1];
    scheduleHeight = scheduleHeights[1];
    scheduleContainerHeight = scheduleContainerHeights[1];
  } else if (viewportWidth < 998) {
    heightDiff = heights[2];
    heightDiff = heights[2];
    scheduleHeight = scheduleHeights[2];
    scheduleContainerHeight = scheduleContainerHeights[2];
  } else if (viewportWidth < 1500) {
    heightDiff = heights[3];
    heightDiff = heights[3];
    scheduleHeight = scheduleHeights[3];
    scheduleContainerHeight = scheduleContainerHeights[3];
  } else {
    heightDiff = heights[4];
    heightDiff = heights[4];
    scheduleHeight = scheduleHeights[4];
    scheduleContainerHeight = scheduleContainerHeights[4];
  }
  let numPostsOpen = 3 - document.querySelectorAll(".post-hidden").length;
  heightDiff = heightDiff * numPostsOpen;
  schedule.style.height = scheduleHeight + heightDiff + "px";
  scheduleContainer.style.height = scheduleContainerHeight + heightDiff + "px";
});
