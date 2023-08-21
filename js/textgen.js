function formatString(input) {
    let delimiterIndex = Math.min(input.indexOf(':'), input.indexOf('.'));
    let relevantPart = delimiterIndex !== -1 ? input.slice(0, delimiterIndex) : input;
    let cleanedInput = relevantPart.replace(/[^a-zA-Z0-9а-яА-Я ]/g, '');
    let words = cleanedInput.split(' ').filter(word => word !== '');
    let formattedString = words.join('_').toLowerCase();

    return formattedString;
  }


function update() {
    let title = document.getElementById(`title`).value;
    let episode = document.getElementById(`episode`).value;
    let type = document.getElementById(`type`).value;
    let dub_type = document.getElementById(`dub_type`).value;
    let dub_var = document.getElementById(`dub_var`).value;
    let dubbers = document.getElementById(`dubbers`).value;
    let sounders = document.getElementById(`sounders`).value;
    let subbers = document.getElementById(`subbers`).value;
    let image = document.getElementById(`image`).value;
    let kodik = document.getElementById(`kodik`).value;
    let anime365 = document.getElementById(`anime365`).value;
    let animelib = document.getElementById(`animelib`).value;
    let aniu = document.getElementById(`aniu`).value;
    let anixart = document.getElementById(`anixart`).value;

    document.getElementById(`anime365-search`).href = `https://smotret-anime.com/catalog/search?q=${title}`;
    document.getElementById(`aniu-search`).href = `https://aniu.ru/search/?q=${title}&page=1`;

    text = `<a href="/imggen/?title=${title}&ep=${episode}&image=${image}" target="_blank">Превью можно скачать здесь</a><div id="result"><b>${title}</b> ${episode>0?" <i>("+episode+" серия)</i>":""}<br><br>`;
    if (dubbers) text += `<b>🎙 Роли озвучивали:</b> ${dubbers}<br><br>`;
    if (sounders) text += `<b>🔊 Тайминг и работа со звуком:</b> ${sounders}<br><br>`;
    if (subbers) text += `<b>💬 Перевод на русский:</b> ${subbers}<br><br>`;
    if (kodik || anime365 || animelib || aniu || anixart) text += `📺 Смотрите на:<br>`;
    if (kodik) text += `Kodik — ${kodik}<br>`;
    if (anime365) text += `Anime365 — ${anime365}<br>`;
    if (animelib) text += `AnimeLib — ${animelib}<br>`;
    if (aniu) text += `Aniu — ${aniu}<br>`;
    if (anixart) text += `Anixart — ${anixart}<br>`;
    if (kodik || anime365 || animelib || aniu || anixart) text += `<br>`;
    text += `@AniLane_Off #${formatString(title)} #${type.toLowerCase()} #${dub_type.toLowerCase()} #${dub_var.toLowerCase()}<button id="copyButton" class="fa fa-copy"></button>`;
    
    document.getElementById(`preview`).innerHTML = text + `</div>`;
    spawnCopyButton();
}


function spawnCopyButton() {
    let copyButton = document.getElementById('copyButton');
    let result = document.getElementById('result');

    copyButton.addEventListener('click', function() {
        let range = document.createRange();
        range.selectNode(result);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        let toast = new bootstrap.Toast(document.getElementById('myToast'));
        toast.show();
        setTimeout(function() {
            toast.hide();
        }, 3000);
    });
}


document.addEventListener('input', update)