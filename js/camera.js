const botonCamera = document.querySelector("[data-video-boton]");
const video = document.querySelector("[data-video]");
const campoCamera = document.querySelector("[data-camera]");

const tomarFoto = document.querySelector("[data-tomar-foto]");
const mensaje = document.querySelector("[data-mensaje]");
const videoCanvas = document.querySelector("[data-video-canvas]");
let imgUrl = "";

const enviar = document.querySelector("[data-enviar]");

botonCamera.addEventListener("click", async () => {
  const iniciarVideo = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  botonCamera.style.display = "none";
  campoCamera.style.display = "block";
  video.srcObject = iniciarVideo;
});

tomarFoto.addEventListener("click", () => {
  videoCanvas
    .getContext("2d")
    .drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
  imgUrl = videoCanvas.toDataURL("image/jpeg");
  campoCamera.style.display = "none";
  mensaje.style.display = "block";
});

enviar.addEventListener("click", () => {
  const recibirDatos = localStorage.getItem("registro");
  const datos = JSON.parse(recibirDatos);

  datos.img_url = imgUrl;
  localStorage.setItem("registro", JSON.stringify(datos));
  window.location.href = "./abrir-cuenta-form-3.html"
});
