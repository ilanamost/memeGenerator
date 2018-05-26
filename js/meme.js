/* */
'use strict';

//** general **//
function creategMeme() {
    return {
        selectedImgId: 0,
        txts: [createNewLineObject(INITIAL_X, INITIAL_TOP_Y),
        createNewLineObject(INITIAL_X, INITIAL_BOTTOM_Y)]
    }
}

function createNewLineObject(x, y) {
    return {
        line: 'Your text will appear here',
        size: 20,
        font: 'Impact',
        align: 'center',
        color: '#ffffff',
        shadowColor: "rgba(0,0,0,0)",
        blur: 0,
        x: x,
        y: y
    }
}

function openMemeEditor(elImg) {
    updMeme(elImg);
    // initializeAlign();
    renderMeme(gMeme);
    changeMainView();
}

function updMeme(elImg) {
    gMeme.selectedImgId = parseInt(elImg.id);
}

function changeMainView(){
    toggleWin(document.querySelector('.img-wrapper'));
    toggleWin(document.querySelector('.meme-container'));
}

function toggleWin(elObject) {
    elObject.classList.toggle('open');
    elObject.classList.toggle('close');
}

function closeMeme(){
    changeMainView();
    gMeme = creategMeme();
    renderTxtContainer();
}

//** render meme and texts **/
function renderMeme(meme) {
    var canvas = document.getElementById('meme-canvas');
    var context = canvas.getContext('2d');
    var memeImg = gImgs.find(function (img) {
        return img.id === gMeme.selectedImgId;
    });
    var img = new Image();
    // debugger;
    img.src = memeImg.url;

    img.onload = function () {
        var curWidth = document.querySelector(".meme-img").offsetWidth;
        canvas.width = Math.min(img.width,curWidth);
        canvas.height = img.height * (canvas.width / img.width);

        var height = getCanvasHeight();
        if(gMeme.txts[1]) gMeme.txts[1].y = height - INITIAL_TOP_Y;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        initializeAlign();
        drawTextForTxts(gMeme, context);
    }
}

function initializeAlign(){
    gMeme.txts.forEach(function (txt, idx) {
        setAlignment(idx, txt.align);
    })
}

function drawTextForTxts(gMeme, context) {
    gMeme.txts.forEach(function (txt) {
        drawTextForTxt(context, txt);
    })
}

function drawTextForTxt(context, txt) {
    context.fillStyle = txt.color;
    context.lineStyle = "#ffff00";
    context.textAlign = txt.align;
    context.font = txt.size + "px" + " " + txt.font;
    context.shadowColor = txt.shadowColor;
    context.shadowBlur = txt.blur;
    context.fillText(txt.line.toUpperCase(), txt.x, txt.y);
}

//** perform changes on meme **/
function changeMemeText(elInput) {
    var idxStr = elInput.id;
    var width = getCanvasWidth();
    var idx = getIdxFromStr(idxStr);
    gMeme.txts[idx].line = elInput.value;

    renderMeme(gMeme);
}

function changeFontColor(elFontColor, idx) {
    gMeme.txts[idx].color = elFontColor.value;
    renderMeme(gMeme);
}

function setAlignment(idx, align){
    var width = getCanvasWidth();
    var rightX = width - gMeme.txts[idx].size - INITIAL_X;
    var centerX = width / 2 - gMeme.txts[idx].size;
    
    switch (align) {
        case 'end':
            gMeme.txts[idx].x = rightX;
            // gMeme.txts[idx].align = 'end';
            break;
    
        case 'center':
            gMeme.txts[idx].x = centerX;
            // gMeme.txts[idx].align = 'center';
            break;
    
        default:
            gMeme.txts[idx].x = INITIAL_X;
            // gMeme.txts[idx].align = 'start';
    }
}
function alignText(idx, direction) {
    //setAlignment(idx, direction);

    switch (direction) {
        case 'right':
            gMeme.txts[idx].align = 'end';
            break;
    
        case 'center':
            gMeme.txts[idx].align = 'center';
            break;
    
        default:
            gMeme.txts[idx].align = 'start';
    }
    renderMeme(gMeme);
}


function increaseFont(idx) {
    var elInput = getElInput(idx);
    var MAX_VAL = 50;

    if (gMeme.txts[idx].size < MAX_VAL) {
        gMeme.txts[idx].size++;
        renderMeme(gMeme);
    }
}

function decreaseFont(idx) {
    var elInput = getElInput(idx);
    var MIN_VAL = 18;

    if (gMeme.txts[idx].size > MIN_VAL) {
        gMeme.txts[idx].size--;
        renderMeme(gMeme);
    }
}

function moveUp(idx) {
    var elInput = getElInput(idx);
    if (gMeme.txts[idx].y > gMeme.txts[idx].size) gMeme.txts[idx].y--;
    renderMeme(gMeme);
}

function moveDown(idx) {
    var elInput = getElInput(idx);
    var height = getCanvasHeight();
    var max = (height - gMeme.txts[idx].size);
    if (gMeme.txts[idx].y < (height - 5)) {
        gMeme.txts[idx].y++;
        renderMeme(gMeme);
    }
}

function switchShadow(elShadow, idx) {
    if (elShadow.checked) {
        gMeme.txts[idx].blur = BLUR;
        gMeme.txts[idx].shadowColor = SHADOW_COLOR;

    } else {
        gMeme.txts[idx].blur = 0;
        gMeme.txts[idx].shadowColor = "rgba(0,0,0,0)";
    }
    renderMeme(gMeme);
}

function changeFont(elFont, idx) {
    gMeme.txts[idx].font = elFont.value;
    renderMeme(gMeme);
}





