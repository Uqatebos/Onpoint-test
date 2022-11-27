export default function mainSlider() {
   const main = document.querySelector('.main-content');
   const btnNext = document.querySelector('.btn-next');
   const home = document.querySelector('.home-page');
   const totalSperm = document.querySelectorAll('.second-tab__sperm div');
   const secondTab = document.querySelector('.second-tab')
   const thirdTab = document.querySelector('.third-tab')
   const moreBtn = document.querySelector('.third-tab-btn__more')
   const modal = document.querySelector('.modal-wrapper')
   const modalItems = document.querySelectorAll('.modal-item')
   const closeModal = document.querySelector('.close-modal')
   const leftArrow = document.querySelector('.left-arrow')
   const rightArrow = document.querySelector('.right-arrow')
   const leftCircle = document.querySelector('.left-circle')
   const rightCircle = document.querySelector('.right-circle')
   let slideIndex = 0;
   function showTab(n = 0) {
      main.style.transform = `translateX(-${1024 * n}px)`
      if (slideIndex == 1) {
         moveSperm()
      } else if (slideIndex < 1) {
         setTimeout(removeSpermClass, 200)
      }
   }
   function prevTab() {
      if (slideIndex > 0) {
         slideIndex--;
         showTab(slideIndex)
      } else {
         return slideIndex;
      }
   }

   function nextTab() {
      if (slideIndex < 2 && main.style.transform != 'translateX(-2048px)') {
         slideIndex++;
         showTab(slideIndex)
      } else {
         return slideIndex;
      }
   }

   home.addEventListener('touchstart', () => {
      if (main.style.transform != 'translateX(-2048px)' || slideIndex != 0) {
         slideIndex = 0;
         showTab(0);
      }
   })

   btnNext.addEventListener('touchstart', () => {
      nextTab();
   })

   let firstTouchX = null;

   main.addEventListener('touchstart', touchStart);
   main.addEventListener('touchmove', touchMove);
   main.addEventListener('touchend', touchEnd);

   function touchStart(e) {
      e.preventDefault();
      main.addEventListener('touchmove', touchMove);
      main.addEventListener('touchend', touchEnd);
      firstTouchX = e.touches[0].clientX;
   }
   function touchMove(event) {
      let secondTouchX = event.touches[0].clientX;
      if (secondTouchX > firstTouchX && (secondTouchX - firstTouchX) >= 200) {
         touchEnd();
         prevTab();
      } else if (secondTouchX < firstTouchX && (firstTouchX - secondTouchX) >= 200) {
         touchEnd();
         nextTab();
      }
   }
   function touchEnd() {
      main.removeEventListener('touchend', touchEnd);
      main.removeEventListener('touchmove', touchMove);
   }

   function moveSperm() {
      totalSperm.forEach(item => {
         item.classList.add('sperm-animation')
      })
   }

   function removeSpermClass() {
      totalSperm.forEach(item => {
         item.classList.remove('sperm-animation');
      })
   }

   //Modal
   moreBtn.addEventListener('touchstart', () => {
      modal.classList.toggle('hidden')
      slideIndex = 0;
      console.log(secondTab)
      console.log(thirdTab)
   })

   closeModal.addEventListener('touchstart', (e) => {
      prevModal();
      modal.classList.toggle('hidden');
      slideIndex = 2;
   })
   let modalIndex = 0;


   function prevModal() {
      if (modalIndex == 1) {
         modalIndex--;
         toggleModal();
         toggleCircle();
      } else {
         return modalIndex;
      }
   }

   function nextModal() {
      if (modalIndex == 0) {
         modalIndex++;
         toggleModal();
         toggleCircle();
      } else {
         return modalIndex;
      }
   }

   function toggleModal() {
      modalItems.forEach(item => {
         item.classList.toggle('hidden')
      })
   }

   function toggleCircle() {
      leftCircle.classList.toggle('circle-active')
      rightCircle.classList.toggle('circle-active')
   }

   leftArrow.addEventListener('touchstart', prevModal);
   rightArrow.addEventListener('touchstart', nextModal);

}
