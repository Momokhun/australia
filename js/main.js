
const isMobile = !!new MobileDetect(window.navigator.userAgent).mobile();


const showTab = (tabName) => {
  if ($(`#${tabName}`).is(':visible')) {
    return;
  }

  const tabsContainer = $(`a[href='#${tabName}']`).closest('.tabs');
 
  tabsContainer.find('.tabs__menu li').removeClass('active');
  tabsContainer
    .find(`.tabs__menu a[href='#${tabName}']`)
    .parent('li')
    .addClass('active');

  tabsContainer.find('.tabs__content > *').css({ display: 'none' });
  
  tabsContainer
    .find(`#${tabName}, .tabs__content .${tabName}`)
    .css({
      display: 'block',
      opacity: 0.7,
    })
    .animate(
      {
        opacity: 1,
      },
      400,
    );
};




const parallaxXSpeed = 12;
const parallaxYSpeed = 3;
const parallaxXSpeedSmall = 5;
const parallaxYSpeedSmall = 1;

const showParallax = () => {
  const scrollTop = $(window).scrollTop();

  const offsetX = Math.round(scrollTop / parallaxXSpeed);
  const offsetY = Math.round(scrollTop / parallaxYSpeed);
  const offsetXSmall = Math.round(scrollTop / parallaxXSpeedSmall);
  const offsetYSmall = Math.round(scrollTop / parallaxYSpeedSmall);

  $('.placs').css({
    'background-position':
      `${-offsetX}px ${-offsetY}px, ${
        offsetXSmall
      }px ${-offsetYSmall}px, `
      + '0% 0%',
  });

  $('.food').css({
    'background-position':
      `${offsetX}px ${-offsetY}px, ${
        -offsetXSmall
      }px ${-offsetYSmall}px, `
      + '0% 0%',
  });
};

const initParallax = () => {
  $(window).off('scroll', showParallax);

  if (!isMobile) {
    showParallax();
    $(window).on('scroll', showParallax);
  }
};




$('.animated').waypoint({
  handler(direction) {
    if (direction === 'down') {
      $(this.element).addClass('fadeInUp');
      this.destroy();
    }
  },
  offset: '100%',
});

$(window).on('resize', () => {
  initParallax();
});


$('.tabs__menu a').on('click', (e) => {
  const tabName = $(e.currentTarget).attr('href');
  e.preventDefault();

  if (tabName[0] === '#') {
    showTab(tabName.substring(1));
  }
});



$('.nav-link').on('click', (e) => {
  const destination = $(e.target).attr('href');
  e.preventDefault();

  $('html, body').animate(
    {
      scrollTop: $(destination).offset().top,
    },
    1000,
  );

  $('.navbar-toggler:visible').trigger('click');
});




showTab('place-1');
showTab('food-1');

initParallax();
