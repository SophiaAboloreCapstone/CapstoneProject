const apiKey = "5ae2e3f221c38a28845f05b66afc7a4b942f1b2a702f9c54e864e3c6";

  const pageLength = 5; // number of objects per page
  
  let curr_lon = 2.3522219; // place longitude
  let curr_lat = 48.856614; // place latitude
  
  let offset = 0; // offset from first object in the list
  let count = 10; // total objects count
  
  const getUrlParams = () => {
    // const urlParams = new URLSearchParams(window.location.search);
    const countryName = "Mexico"
    return countryName;
  };

  
  const createPlacesCardUrl = (capital, apiKey) =>
  `https://api.opentripmap.com/0.1/en/places/geoname?apikey=${apiKey}&name=${capital}`;
  const createListItemsUrl = ({ lat, lon, apiKey, offset, pageLength }) =>
  `https://api.opentripmap.com/0.1/en/places/radius?apikey=${apiKey}&radius=10000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`;
  const renderAllData = async (countryName) => {
    // create URL + fetch data for country card
    const urlForCountryCard = createCountryCardUrl(countryName);
    const restApiData = await fetchData(urlForCountryCard);
  
    // if the data from API exists as an array
    if (Array.isArray(restApiData) && restApiData.length) {
      const countryCardData = await getCountryCardData(restApiData[0]);
  
      const apiKey = "5ae2e3f221c38a28845f05b6fac16143ca6a7e70223b17f1cc98d3e7";
      const urlForPlacesCard = createPlacesCardUrl(
        countryCardData.capital,
        apiKey
      );
      const placesData = await fetchData(urlForPlacesCard);
  
      const urlForListItems = createListItemsUrl({
        lat: placesData.lat,
        lon: placesData.lon,
        apiKey,
        offset,
        pageLength,
      });
      const listData = await fetchData(urlForListItems);
      const listItemData = await getListItemData(listData);

      console.log("listItemData: ", listItemData)
  
  
      renderCountryCard(countryCardData);
      renderPlacesCard(countryCardData, listItemData, apiKey, placesData);
    }
  };
  const renderCountryCard = (data) => {
    const countryCard = `<div class="ui centered card">
    <div class="image">
      <img src="${data.flag}" id="flag-image" />
    </div>
    <div class="content">
      <a class="header" id="country-name">${data.name}</a>
      <div class="description">Capital: ${data.capital}</div>
      <div class="description">Language: ${data.language}</div>
      <div class="description">Currency: ${data.currency}</div>
    </div>
    <div class="ui bottom attached button teal" id="addFavBtn">
      <i class="heart icon"></i>
      Add to Favourites
    </div>
  </div>`;
    $("#country-card").empty();
    $("#country-card").append(countryCard);
  
    const favCountryList = JSON.parse(localStorage.getItem("favourites"));
  
    if (favCountryList.some((item) => item.country === data.name)) {
      $("#addFavBtn")
        .text("Remove From Favourites")
        .removeClass("teal")
        .addClass("red")
        .attr("id", "removeFavBtn");
      $("#removeFavBtn").click(removeFavourites);
    } else {
      $("#addFavBtn")
        .text("Add to Favourites")
        .removeClass("red")
        .addClass("teal");
      $("#addFavBtn").click(addFavourite);
    }
  };
  const renderPlacesCard = (
    countryCardData,
    listItemData,
    apiKey,
    placesData
  ) => {
    const placesCard = `<div class="ui segment places-aside">
    <div class="ui center aligned segment card-header">
      <h3 class="card-title">Places to see in ${countryCardData.capital}</h3>
    </div>
    <div class="ui celled selection list" id ="places-list">
    </div>
    <div class="ui fluid button" id ="places-button">Show more</div>
  </div>
  <div class="ui placeholder segment places-main">
    <div class="ui fluid card places-card">
      <div class="image center aligned content" id ="places-image-container"><div class="ui placeholder center aligned segment empty-favourites">
      <div class="ui icon header">
        <i class="thumbtack icon"></i>
        Click on a place on to explore ${countryCardData.capital}
      </div>
    </div></div>
      <div class="center aligned content " id ="places-content"></div>
      <div id="places-link"> </div>
    </div>
  </div> `;
    $("#places-container").empty();
    $("#places-container").append(placesCard);
  
    listItemData.forEach(buildListItem);
  
    $("#places-list").on("click", { apiKey }, onListClick);
  
    const showMorePlaces = async () => {
      offset += pageLength;
  
      const newListUrl = createListItemsUrl({
        lat: placesData.lat,
        lon: placesData.lon,
        apiKey,
        offset,
        pageLength,
      });
      const newListData = await fetchData(newListUrl);
      const newListItemData = await getListItemData(newListData);
      $("#places-list").empty();
      newListItemData.forEach(buildListItem);
    };
  
    $("#places-button").on("click", showMorePlaces);
  };
  
  const buildListItem = (item) => {
    $("#places-list").append(`
    <div class="item">
      <div class="content" data-xid="${item.xid}">${item.name}</div>
    </div>
    `);
  };
  
  const renderPlacesPhoto = (selectedPlaceData) => {
    $("#places-image-container").empty();
    $("#places-content").empty();
    $("#places-link").empty();
  
    $("#places-image-container").append(
      `<img class="ui centered image place-image" src="${selectedPlaceData.photo}"/>`
    );
  
    $("#places-content").text(`${selectedPlaceData.description}`);
  
    if (selectedPlaceData.link) {
      $("#places-link").append(`
  <a href="${selectedPlaceData.link}"<button class="ui button learn-btn">Learn more</button></a>
  `);
    }
  };
  // initialiseLocalStorage
  const initialisePage = () => {
    // initialiseLocalStorage();
  
    const countryName = getUrlParams();
  
    if (countryName) {
      renderAllData(countryName);
    }
  };
  initialisePage();