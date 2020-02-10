const switcher = document.querySelector('#cbx'),
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item');
let player;

function bindSlideToggle(trigger, boxBody, content, openClass) {
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    }
    const box = document.querySelector(boxBody),
          boxContent = document.querySelector(content);

    button.element.addEventListener('click', () => {
        if (button.active === false) { // Проверяем меню на неактивность
            button.active = true; // Если оне не активна - делаем ее актвиной 
            box.style.height = boxContent.clientHeight + 'px';
            box.classList.add(openClass); // Активный класс для меню
            
        } else {
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);
        }
        
    });
}
bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function changeMode(boolean, color, path) {
    night = boolean;
        document.querySelectorAll('.hamburger > line').forEach(line => {
            line.style.stroke = color;
        });
        document.querySelectorAll('.videos__item-descr').forEach(title => {
            title.style.color = color;
        });
        document.querySelectorAll('.videos__item-views').forEach(view => {
            view.style.color = color;
        });
        document.querySelector('.header__item-descr').style.color = color;
        document.querySelector('.logo > img').src = path;
};

function switchMode() {
    if (night === false) {
        changeMode(true, '#fff', 'logo/youtube_night.svg');
        document.body.classList.add('night');
    } else {
        changeMode(false, '#000', 'logo/youtube.svg');
        document.body.classList.remove('night');
    }
}

let night = false;
switcher.addEventListener('change', () => {
    switchMode();
});

const data = [
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
    ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
        '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки  Урок 2',
        '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
    ['3,6 тыс. просмотров', '44,2 тыс. просмотров', '28 тыс. просмотров'],
    ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
];

more.addEventListener('click', () => {
    const videosWrapper = document.querySelector('.videos__wrapper');
    more.remove();
    for (let i = 0; i <  data[0].length; i ++) {
        let cards = [];
        let card = document.createElement('a');
        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', data[3][i]);
        card.innerHTML = `
            <img src="${data[0][i]}" alt="thumb">
            <div class="videos__item-descr">
                ${data[1][i]}
            </div>
            <div class="videos__item-views">
                ${data[2][i]}
            </div>
        `;
        videosWrapper.appendChild(card);
        bindNewModal(card);
        setTimeout(() => {
            card.classList.remove('videos__item-active');
        }, 20);
        // if (night === true) {
        //     card.querySelector('.videos__item-descr').style.color = '#fff';
        //     card.querySelector('videos__item-views').style.color = '#fff';
        // };
    };
    sliceTitle('.videos__item-descr', 100);
});

function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(title => {
        title.textContent.trim();

        if (title.textContent.length < count){
            return;
        } else {
            const str = title.textContent.slice(0, count + 1) + '...';
            title.textContent = str;
        }
    });
}
sliceTitle('.videos__item-descr', 100);

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    player.stopVideo();
}

function bindModal(cards) {
    cards.forEach(video => {
        video.addEventListener('click', (e) => {
            e.preventDefault();
            const id = video.getAttribute('data-url');
            loadVideo(id);
            openModal();
        });
    });
}
bindModal(videos);

function bindNewModal(card) {
    card.addEventListener('click', (e) =>{
        e.preventDefault();
        const id = card.getAttribute('data-url');
        loadVideo(id);
        openModal();
    })
}

modal.addEventListener('click', (e) =>{
    if (!e.target.classList.contains('modal__body')) {
        closeModal();
    }
});
modal.addEventListener('keydown', function(e){
    if (e.keyCode === 27) {
        closeModal();
    }
});

function createVideo() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(() => {
        player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE'
        });
    }, 300)

}
createVideo();

function loadVideo(id) {
    player.loadVideoById({
        'videoId': `${id}`
    });
}

