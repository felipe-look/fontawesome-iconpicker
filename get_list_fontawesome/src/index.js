import axios from "axios";

const iconPrefix = "fa-";
const styleMap = {
  brands: "fa-brands",
  regular: "fa-regular",
  solid: "fa-solid"
};

const fontAwesomeVersion = "6.4.2";
const jsonUrl = `https://raw.githubusercontent.com/FortAwesome/Font-Awesome/${fontAwesomeVersion}/metadata/icons.json`;

axios
  .get(jsonUrl)
  .then(function (response) {
    const icons = response.data;
    var parsedIcons = [];

    for (let [iconName, iconData] of Object.entries(icons)) {
      var icone = {};
      for (let iconStyle of Object.values(iconData.styles)) {
        icone["title"] = `${styleMap[iconStyle]} ${iconPrefix}${iconName}`;
        icone["searchTerms"] = [];
        for (let iconTerms of Object.values(iconData.search.terms)) {
          
          if(iconTerms){
            icone['searchTerms'].push(iconTerms);
          }
        }
        if(icone['title'] === 'fa-solid fa-house'){
          console.log(icone);
        }
        parsedIcons.push(icone);
      }
      // for (let iconStyle of Object.values(iconData.styles)) {
      //   icone[0] = `${styleMap[iconStyle]} ${iconPrefix}${iconName}`;
      //   for (let iconTerms of Object.values(iconData.search.terms)) {
      //     if (iconTerms) {
      //       icone[1] = iconTerms;
      //     }
      //     // parsedIcons.push(icone);
      //   }
      //   // parsedIcons.push(icone);
      //   // parsedIcons.push(`${styleMap[iconStyle]} ${iconPrefix}${iconName}`);
      // }
      // parsedIcons.push(icone);
    }

    parsedIcons = parsedIcons.sort();

    // console.log(parsedIcons);
    document.getElementById("app").textContent = JSON.stringify(parsedIcons);
  })
  .catch(function (error) {
    console.log(error);
  });
