function formatString(input) {
    let delimiterIndex = Math.max(input.indexOf(':'), input.indexOf('.'), input.indexOf('_'));
    let relevantPart = delimiterIndex !== -1 ? input.slice(0, delimiterIndex) : input;
    let cleanedInput = relevantPart.replace(/[^a-zA-Zа-яА-Я -]/g, '').replaceAll('-', '_');
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
    // let image = document.getElementById(`image`).value;
    let kodik = document.getElementById(`kodik`).value;
    let anime365 = document.getElementById(`anime365`).value;
    let animelib = document.getElementById(`animelib`).value;
    let aniu = document.getElementById(`aniu`).value;
    let animego = document.getElementById(`animego`).value;
    let anixart = document.getElementById(`anixart`).value;
    let rus_cover = document.getElementById(`rus_cover`).checked;

    document.getElementById(`anime365-search`).href = `https://smotret-anime.com/catalog/search?q=${title}`;
    document.getElementById(`aniu-search`).href = `https://aniu.ru/search/?q=${title}&page=1`;
    document.getElementById(`animego-search`).href = `https://animego.org/search/all?q=${title}`;
    // <a href="/imggen/?title=${title}&ep=${episode}&image=${image}" target="_blank">Превью можно скачать здесь</a>
    text = `<div id="result"><b>${title}</b> ${episode>0?" <i>("+Number(episode)+" серия)</i>":(episode.includes('-')?" <i>("+episode+" серии)</i>":"")}<br><br>`;
    if (dubbers) text += `<b>🎙 Роли озвучивали:</b> ${dubbers.slice(-2)==', '?dubbers.slice(0, -2):dubbers}<br>`;
    if (sounders) text += `<b>🔊 Работа со звуком:</b> ${sounders.slice(-2)==', '?sounders.slice(0, -2):sounders}<br>`;
    if (subbers) text += `<b>💬 Перевод на русский:</b> ${subbers.slice(-2)==', '?subbers.slice(0, -2):subbers}<br>`;
    let sources = [
        { name: "Kodik", value: kodik },
        { name: "Anime365", value: anime365 },
        { name: "AnimeLib", value: animelib },
        { name: "Aniu", value: aniu },
        { name: "AnimeGO", value: animego },
        { name: "Anixart", value: anixart }
    ];
    let activeSources = sources.filter(source => source.value);
    if (activeSources.length > 0) {
        text += "<br><b>📺 Смотрите на:</b><br>";
        activeSources.forEach(source => {
            text += `${source.name} — ${source.value}<br>`;
        });
        text += "<br>";
    }
    text += `<span style="color: #afe0f0;">@AniLane_Off #${formatString(title)} #${type.toLowerCase()} #${dub_type.toLowerCase()} #${dub_var.toLowerCase()}${rus_cover?" #русский_кавер":""}</span><button id="copyButton" class="fa fa-copy"></button>`;
    
    document.getElementById(`preview`).innerHTML = text + `</div> <div class="form-text" style="color: #555;">Для форматирования текста в Telegram напишите <span style="font-style: italic;color: #777;">/md <текст></span>.</div>`;
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


let wordList = ["PartyCorn", "slics", "Sherl7", "ASSIA", "Rias Gremory", "SadFrozz", "prama", "Lerkins", "Fallstar", "Winchester", "SetDerin", "Emily", "Myavka", "fl.exe", "GingerBread"];

let inputFields = document.querySelectorAll(".autocomplete-input");
let suggestionContainers = document.querySelectorAll(".autocomplete-suggestions");

inputFields.forEach((inputField, index) => {
    let timeoutId = null;

    inputField.addEventListener("input", function () {
        let inputContent = inputField.value.trim();
        let inputWords = inputContent.split(", ");
        let lastWord = inputWords[inputWords.length - 1].toLowerCase();
        let suggestions = [];

        if (!lastWord) {
            suggestionContainers[index].style.display = "none";
            return;
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            for (let word of wordList) {
                if (word.toLowerCase().includes(lastWord)) {
                    suggestions.push(word);
                }
            }

            displaySuggestions(suggestions, suggestionContainers[index], inputField);
        }, 0);
    });

    document.addEventListener("click", function (event) {
        if (!inputField.contains(event.target)) {
            suggestionContainers[index].style.display = "none";
        }
    });
});

function displaySuggestions(suggestions, suggestionContainer, inputField) {
    suggestionContainer.innerHTML = "";

    if (suggestions.length === 0) {
        suggestionContainer.style.display = "none";
        return;
    }

    suggestionContainer.style.display = "block";

    for (let suggestion of suggestions) {
        let suggestionElement = document.createElement("div");
        suggestionElement.textContent = suggestion;

        suggestionElement.addEventListener("click", function () {
            let inputContent = inputField.value.trim();
            let inputWords = inputContent.split(", ");
            inputWords[inputWords.length - 1] = suggestion + ', ';
            inputField.value = inputWords.join(", ");

            suggestionContainer.style.display = "none";

            inputField.focus();
        });

        suggestionContainer.appendChild(suggestionElement);
    }
}
