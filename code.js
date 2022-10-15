const THUMBNAILS = document.querySelectorAll(".thumbnail img");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup_close");
const POPUP_IMG = document.querySelector(".popup_img");
const ARROW_LEFT = document.querySelector(".popup_arrow_left");
const ARROW_RIGHT = document.querySelector(".popup_arrow_right");

let currentImgIndex;

const showNextImg = () => {
    if (currentImgIndex === THUMBNAILS.length - 1) {
        currentImgIndex = 0;
    } else {
        currentImgIndex++;
    }
    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
};

const showPrevImg = () => {
    if (currentImgIndex === 0) {
        currentImgIndex = THUMBNAILS.length - 1;
    } else {
        currentImgIndex--;
    }
    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
};

const closeImg = () => {
    POPUP.classList.add("fade_out");
    setTimeout( () => {
        POPUP.classList.add("hidden");
        POPUP.classList.remove("fade_out");
    }, 150);

}

THUMBNAILS.forEach((thumbnail, index) => {
    const showImg = (e) => {
        POPUP.classList.remove("hidden");
        POPUP_IMG.src = e.target.src;
        currentImgIndex = index;
        THUMBNAILS.forEach((element) => {
            element.setAttribute("tabindex", 1);
        })
    };
    thumbnail.addEventListener('click', showImg);
    thumbnail.addEventListener('keydown', (e) => {
        if (e.code === "Enter" || e.keyCode === 13) showImg(e);
    });
});

POPUP_CLOSE.addEventListener('click', closeImg);
ARROW_RIGHT.addEventListener('click', showNextImg);
ARROW_LEFT.addEventListener('click', showPrevImg);

document.addEventListener("keydown", (e) => {
    if (!POPUP.classList.contains("hidden")) {
        if (e.code === "ArrowRight" || e.keyCode === 39) showNextImg();
        if (e.code === "ArrowLeft" || e.keyCode === 37) showPrevImg();
        if (e.code === "Escape" || e.keyCode === 27) closeImg();
    }
});

POPUP.addEventListener('click', (e) => {
    if (e.target === POPUP) closeImg();
});
