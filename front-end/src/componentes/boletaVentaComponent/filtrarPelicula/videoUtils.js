// src/componentes/boletaVentaComponent/videoUtils.js
export const videoExists = (url) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = url;
  
      video.onloadeddata = () => {
        resolve(true);
      };
  
      video.onerror = () => {
        resolve(false);
      };
    });
  };
  