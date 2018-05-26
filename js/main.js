/* */
'use strict'

var SHADOW_COLOR = "black";
var BLUR = 20;
var INITIAL_X = 20;
var INITIAL_TOP_Y = 40;
var INITIAL_BOTTOM_Y = 270;

var gNextId;
var gImgs;
var gMeme;
var gCurTeamIdx = 0;
var gteams = [
    {
        id: 1,
        url: 'img/team/5.jpg',
        name: 'Ilana',
        title: 'developer',
        description: 'Hi! My name is Ilana. I\'m a junior developer, experienced\
        in the languages: Javascript, html and css.I have previous occupational experience with C#, sql and visual basic.\
        I am also familliar with several.Net Technologies, including: MVC, Web Api and winforms.\
        I am currentlly studying in \'Coding academy\' to become a web developer.I have finished a .Net course in Hacker-u.\
        In addition, I have a degree in Biology from the \'Tel-Aviv\' University, and experience in working in a medical laborotory.\
        I always aspire to become better at what I do. I enjoy working in a team, and learning new things.\
        I am responsible, organized, independant, and can be an asset to any team.',
        facebook: 'https://www.facebook.com/ilana.mostovski',
        twitter: '',
        google: '',
        pintrest: 'https://www.pinterest.com/ilana_most/',
        linkedin: 'https://www.linkedin.com/in/ilana-mostvoski-949aa214b/',
        dribbble: ''
    },
    {
        id: 1,
        url: 'img/team/2.jpg',
        name: 'Shimrit',
        title: 'developer',
        description: 'I am an Industrial engineer who quickly discovered my real passion is development.\
        I have a 10+ year exprience in software development, implementation and product management.\
        I have recently joined the web development community and looking forward to making the best of this fresh start,\
        while putting my experience to use in this new and exciting world.',
        facebook: 'https://www.facebook.com/shimrit.belahousky',
        twitter: 'https://twitter.com/shimritsn',
        google: '',
        pintrest: '',
        linkedin: 'https://www.linkedin.com/in/shimrit-snapir',
        dribbble: ''
    }

];


//** general ** //
function init() {
    gNextId = 0;
    gMeme = creategMeme();
    gImgs = createImgs();
    renderImgs(gImgs);
    renderWords(gImgs);
    renderTxtContainer();
    renderTeam();

}

function setLangAndRender(lang) {
    setLang(lang);
}

function getCanvasHeight() {
    var elCanvas = document.getElementById('meme-canvas');
    var height = elCanvas.height;
    return height;
}

function getCanvasWidth() {
    var elCanvas = document.getElementById('meme-canvas');
    var width = elCanvas.width;
    return width;
}

function getIdxFromStr(idxStr) {
    var idx = +idxStr.substring((0, idxStr.lastIndexOf('-') + 1));
    return idx;

}

function calcNewY() {
    var y = gMeme.txts.reduce(function (acc, txt) {
        acc += txt.size;
        return acc;
    }, INITIAL_TOP_Y)

    return y;
}

function getElInput(idx) {
    return document.getElementById('txt-input-' + idx);
}

function createkeywordsMap(keywords) {
    var wordCountMap = keywords.reduce(function (acc, val) {
        acc[val] = (acc[val]) ? ++acc[val] : 1;
        return acc;
    }, {});
    return wordCountMap;
}

function createKeywordsForImgs(imgs) {
    var keywords = [];

    imgs.forEach(function (img) {
        (img.keywords).forEach(function (keyword) {
            keywords.push(keyword);
        });
    });
    return keywords;
}

function addNewLine() {
    var y = calcNewY();
    var height = getCanvasHeight();
    var max = (gMeme.txts.length > 0) ? INITIAL_BOTTOM_Y - gMeme.txts[gMeme.txts.length - 1].size : height;

    if (y < max) {
        gMeme.txts.push(createNewLineObject(INITIAL_X, y));
        renderMeme(gMeme);

        var idx = gMeme.txts.length - 1;
        var elEditTxtCon = document.querySelector('.edit-txt-container');
        // elEditTxtCon.innerHTML += renderNewLine(gMeme.txts[idx].line, idx);
        renderTxtContainer();
    }
}

function deleteLine(elBtn) {
    var idx = elBtn.id.split('-')[1];
    gMeme.txts.splice(idx, 1);
    renderTxtContainer();
    renderMeme(gMeme);
}

function downloadCanvas(elBtn) {
    var dataURL = document.getElementById('meme-canvas').toDataURL();
    elBtn.href = dataURL;
}

function changeTeamMember() {
    var elCurTeamMember = document.getElementById('team-' + gCurTeamIdx);
    toggleWin(elCurTeamMember);

    gCurTeamIdx++;
    gCurTeamIdx = (gCurTeamIdx >= gteams.length ? 0 : gCurTeamIdx);
    var elTeamMember = document.getElementById('team-' + gCurTeamIdx);
    toggleWin(elTeamMember);
}


function toggleMenu(elHamburger) {
    var mainMenu = document.querySelector('.main-menu ul');
    var nav = document.querySelector('nav');
    mainMenu.classList.toggle('open');
    nav.classList.toggle('close');
    elHamburger.classList.toggle('open');
}

//** imges ** //
function createImgs() {
    var imgs = [];

    imgs.push(createImg('img/meme/img01.jpg', ['cartoon', 'surprised', 'yelling', 'all']));
    imgs.push(createImg('img/meme/img02.jpg', ['dog', 'cute', 'animal', 'all']));
    imgs.push(createImg('img/meme/img03.jpg', ['what?', 'angry', 'black', 'all']));
    imgs.push(createImg('img/meme/img04.jpg', ['matrix', 'movie', 'all']));
    imgs.push(createImg('img/meme/img05.jpg', ['cartoon', 'movie', 'spiderman', 'all']));
    imgs.push(createImg('img/meme/img06.jpg', ['cartoon', 'movie', 'toy story', 'one day', 'all']));
    imgs.push(createImg('img/meme/img07.jpg', ['cartoon', 'batman', 'slap', 'all']));
    imgs.push(createImg('img/meme/img08.jpg', ['cute', 'cat', 'animal', 'cartoon', 'all']));
    imgs.push(createImg('img/meme/img09.jpg', ['dance', 'kids', 'black', 'cute', 'all']));
    imgs.push(createImg('img/meme/img10.jpg', ['haim', 'tv', 'יצאת צדיק', 'all']));

    return imgs;
}

function createImg(url, keywords) {
    return {
        id: ++gNextId,
        url: url,
        keywords: keywords
    };
}

function searchImg(searchValue) {
    var filteredImgs = [];
    if (searchValue === '') {
        filteredImgs = gImgs;
    } else {
        filteredImgs = gImgs.filter(function (img) {
            return img.keywords.indexOf(searchValue.toLowerCase()) !== -1;
        });
    }
    renderImgs(filteredImgs);
}

function addImg() {
    var elImgInput = document.querySelector('#imgFiles');
    if (elImgInput.value !== '') {
        gImgs.push(createImg(elImgInput.value, ['all']));
        renderImgs(gImgs);
        elImgInput.value = '';
    }
}

function searchImgInput() {
    var searchValue = document.querySelector('.search input').value;
    searchImg(searchValue);
}




//** render **/
function renderImgs(imgs) {
    var strHtml = '';

    var strHtmls = imgs.map(function (img, idx) {
        strHtml = `<img  class="pointer" id="${img.id}" src="${img.url}" onclick="openMemeEditor(this)"/>`;
        return strHtml;
    });

    var elImgGrid = document.querySelector('.img-grid');
    elImgGrid.innerHTML = strHtmls.join('');
}

function renderWords(imgs) {
    var MIN_SIZE = 15;
    var keywords = createKeywordsForImgs(imgs);
    var wordCountMap = createkeywordsMap(keywords);
    var strHtmls = '';

    for (var key in wordCountMap) {
        var count = wordCountMap[key];
        strHtmls += `<span class="pointer" style="font-size: ${MIN_SIZE * count}px" onclick="searchImg('${key}')">${key}</span>`;
    }
    var wordsCloud = document.querySelector('.filter-cloud');
    wordsCloud.innerHTML = strHtmls;
}

function renderTeam() {
    var strHtml = '';
    var strHtmls = gteams.map(function (team, idx) {
        strHtml = renderTeamMemeber(team, idx);
        return strHtml;
    });

    var elAbout = document.querySelector('.about-container');
    elAbout.innerHTML = strHtmls.join('');
}

function renderNewLine(txt, idx) {
    var width = getCanvasWidth();
    var options = renderOptions();
    return `
    <div class="meme-txt-wrapper">  
        <div>
            <input type="text" class="input-base meme-line-txt" id="txt-input-${idx}" oninput="changeMemeText(this)" value="${txt}"></input>
        </div>
        <div class="txt-ctrl flex justify-start align-center flex-wrap" id=txt-${idx}>
            <button id="btn-left-${idx}" class="fa clear-btn base-btn base-btn-small" onclick="alignText(${idx}, 'left')"></button>
            <button id="btn-center-${idx}" class="fa clear-btn base-btn base-btn-small" onclick="alignText(${idx}, 'center')"></button>
            <button id="btn-right-${idx}" class="fa clear-btn base-btn base-btn-small" onclick="alignText(${idx}, 'right')"></button>
            <button class="fa clear-btn base-btn base-btn-small" onclick="increaseFont(${idx})"></button>
            <button class="fa clear-btn base-btn base-btn-small" onclick="decreaseFont(${idx})"></button>
            <input class="base-btn base-btn-small" type="color" name="color" id="input-color-${idx}" onchange="changeFontColor(this, ${idx})" value="${gMeme.txts[idx].color}"></input>
            <button class="fa clear-btn base-btn base-btn-small" onclick="moveUp(${idx})"></button>
            <button class="fa clear-btn base-btn base-btn-small" onclick="moveDown(${idx})"></button>
            <button id=btn-${idx} class="fa clear-btn base-btn base-btn-small" onclick="deleteLine(this)"></button>
            <form class="style-form flex justify-start align-center">
                <div>               
                    <label class="fa cb-container"> Shadow
                    <input type="checkbox" onchange="switchShadow(this,${idx})">
                    <span class="checkmark"></span>
                </div>
                <div class="font-select">
                    <label class="fa" for="txt-font"></label>
                    <select id = "font" onchange = "changeFont(this,${idx})">
                    ${options}
                    </select>
                </div>
            </form>
        </div>
    </div>
    `;
}

function renderOptions() {
    var fonts = [{ fontName: "impactRegular", displayedText: "Impact" },
    { fontName: "Verdana", displayedText: "Verdana" },
    { fontName: "Comic Sans MS", displayedText: "Comic Sans MS" },
    { fontName: "Times New Roman", displayedText: "Times New Roman" },
    { fontName: "Arial Black", displayedText: "Arial Black" }
    ];

    var strHtmls = '';
    var options = fonts.map(function (font) {
        strHtmls += `<option value ="${font.fontName}">${font.displayedText}</option>`;
    });

    return strHtmls;
}

function renderTxtContainer() {
    var strHtml = '';
    var strHtmls = gMeme.txts.map(function (txt, idx) {
        strHtml = renderNewLine(txt.line, idx);
        return strHtml;
    });

    var elEditTxtCon = document.querySelector('.edit-txt-container');
    elEditTxtCon.innerHTML = strHtmls.join('');
}

function renderTeamMemeber(team, idx) {

    return `
    <div id="team-${idx}" class="${idx ? 'close' : 'open'} flex space-between align-start">
        <div class="about-img">
        <img src=${team.url} />
        </div>
            <div class="about-info flex flex-column justify-end" id="about">
                <div class="info">
                <h1>${team.name}</h1>
                <h2>${team.title}</h2>
                <p>${team.description}</p>
                </div>
                <div class="social flex">
                    <ul class="clean-list inline-flex">
                        <li class="fa facebook pointer flex justify-center align-center">
                            <a href="${team.facebook}"></a>
                        </li>
                        <li class="fa twitter pointer flex justify-center align-center">
                            <a href="${team.twitter}"></a>
                        </li>
                        <li class="fa google-plus pointer flex justify-center align-center">
                            <a href="${team.google}"></a>
                        </li>
                        <li class="fa pinterest pointer flex justify-center align-center">
                            <a href="${team.pintrest}"></a>
                        </li>
                        <li class="fa linkedin pointer flex justify-center align-center">
                            <a href="${team.linkedin}"></a>
                        </li>
                        <li class="fa dribbble pointer flex justify-center align-center">
                            <a href="${team.dribble}"></a>
                        </li>
                    </ul>
                </div>
            </div>
            <button class="fa pointer clear-btn" onclick="changeTeamMember()"></button>
        </div>
    </div>
    `;
}