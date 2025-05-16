
export function openFullscreen(src) {
  const img = document.getElementById("lightbox-img");
  img.src = src;
  document.getElementById("lightbox").style.display = "flex";
}

export function closeFullscreen() {
  document.getElementById("lightbox").style.display = "none";
}



// function verificarTipoDispositivo() {
//   return 'ontouchstart' in window ? 'mobile' : 'desktop';
// }

// export function button_contact() {
//   const tipoDispositivo = verificarTipoDispositivo();
//   const contact_button = document.querySelector(".contact-button");
//   const whats = document.getElementById("whats");
//   const email = document.getElementById("email");

//   if(tipoDispositivo === 'mobile') {
//     contact_button.addEventListener('click', function () {
//       window.open(whats.href, '_blank');
//     });
//   } else {
//     contact_button.addEventListener('click', function () {
//       window.open(email.href, '_blank');
//     });
//   }

// }

export function accordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      console.log(content);

      accordionHeaders.forEach(otherHeader => {
        if(otherHeader !== this) {
          otherHeader.classList.remove('active');
          otherHeader.nextElementSibling.style.maxHeight = '0';
        }
      });

      this.classList.toggle('active');

      content.style.maxHeight = isActive ? '0' : content.scrollHeight + 'px';

      if(!isActive) {
        setTimeout(() => {
          const targetHeading = content.querySelector('h3');
          if(targetHeading) {
            targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });

          }
        }, 300);
      }
    });

  });
}


export function abrirAccordionHome(targetId) {
  console.log(targetId)
  const target = document.getElementById(targetId);
  target.click();

}
