export default function scrollBar() {
   let thumb = slider.querySelector('.thumb');
   let text = document.querySelector('.text');

   thumb.addEventListener('touchstart', (event) => {
      event.preventDefault();
      let shiftY = event.touches[0].clientY - thumb.getBoundingClientRect().top;
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);

      function onMouseMove(event) {
         let newTop = event.touches[0].clientY - shiftY - slider.getBoundingClientRect().top;
         if (newTop < 0) {
            newTop = 0;
         }
         let rightEdge = slider.offsetHeight - thumb.offsetHeight;
         if (newTop > rightEdge) {
            newTop = rightEdge;
         }
         thumb.style.top = newTop + 'px';
         text.style.transform = `translateY(-${newTop}px)`;
      }

      function onMouseUp() {
         document.removeEventListener('touchend', onMouseUp);
         document.removeEventListener('touchmove', onMouseMove);
      }
   });
}


