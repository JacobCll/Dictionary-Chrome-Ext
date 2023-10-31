document.addEventListener("DOMContentLoaded", function () {
  const wordinput = document.getElementById("word");
  const define = document.getElementById("define");
  const output_container = document.getElementById("definition");
  apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  // refresh output div
  const clearelements = () => {
    output_container.innerHTML = "";
  };

  const defineword = () => {
    clearelements();
    const url = apiUrl + wordinput.value;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          // 1 entry for each source
          const entry = document.createElement("div");
          entry.id = "entry";

          output_container.appendChild(entry);
          // for headboard
          const word = data[i].word;
          const phonetic = data[i].phonetic;

          // create headboard-box container
          entry.innerHTML += `
          <div class='headword-box'>
            <span class='headword'>${word}</span> 
            <span>${phonetic}</span>
          </div>
          `;

          // array of meanings
          const meanings = data[i].meanings;

          // iterate over meanings (parts of speech). can have multiple definitions
          for (let j = 0; j < meanings.length; j++) {
            const pos = meanings[j].partOfSpeech;
            entry.innerHTML += `
              <div class='phonetics'>
                <span class='partsofspeech'>${pos}</span> 
                <span class='posword'>${word}<span>
              </div>
            `;
            const defs = meanings[j].definitions;

            const def_family = document.createElement("div");
            def_family.className = "def-family";
            entry.appendChild(def_family);

            const orderedlist = document.createElement("ol");
            orderedlist.className = "deflist";
            def_family.appendChild(orderedlist);

            for (let k = 0; k < defs.length; k++) {
              orderedlist.innerHTML += `<li>${defs[k].definition}</li>`;
            }
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // event listener on click
  define.addEventListener("click", defineword);

  // event listener on keypress (enter)
  wordinput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      defineword();
    }
  });
});
