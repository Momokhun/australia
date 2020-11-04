
const API_KEY = '8216de756625b084ae2a069592b211cc';


const getRequestURL = (searchText) => {
  const parameters = $.param({
    method: 'flickr.photos.search',
    api_key: API_KEY,
    text: searchText,
    sort: 'interestingness-desc',
    per_page: 4,
    license: '4', 
    extras: 'owner_name,license', 
    format: 'json', 
    nojsoncallback: 1,
  });
  const url = `https://api.flickr.com/services/rest/?${parameters}`;
  return url;
};

const getFlickrImageURL = (photo, q) => {
  let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
    photo.secret
  }`;
  if (q) {
    url += `_${q}`;
  }
  url += '.jpg';
  return url;
};

const getFlickrPageURL = photo => `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;

const getFlickrText = (photo) => {
  let text = `"${photo.title}" by ${photo.ownername}`;
  if (photo.license === '4') {
    text += ' / CC BY';
  }
  return text;
};

Vue.directive('tooltip', {
  bind(el, binding) {
    $(el).tooltip({
      title: binding.value,
      placement: 'bottom',
    });
  },
  unbind(el) {
    $(el).tooltip('dispose');
  },
});

new Vue({
  el: '#gallery', 

  data: {
    photos: [],
  },

  created() {
    const vm = this;
    vm.getImages('Melbourne')
    vm.getImages('Tasmania'); 
  },
  
  methods: {
    getImages(text) {
      const vm = this;
      const url = getRequestURL(text);
      
      $.getJSON(url, (data) => {
        if (data.stat !== 'ok') {
          return;
        }
        _photos = data.photos.photo.map(photo => ({
          id: photo.id,
          imageURL: getFlickrImageURL(photo, 'q'),
          pageURL: getFlickrPageURL(photo),
          text: getFlickrText(photo),
        }));
        vm.photos = vm.photos.concat(_photos)
      });
    }
  },
});
