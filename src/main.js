const teks = ["Riky Ripaldo", "Malas Ngoding", "Member Imphnen", "Kynonim"];
const kolors = ["#FF5733", "#33FF57", "#f5ff33", "#FF3357"];
const nama = document.getElementById("nama");

let teksIndex = 0;
let karakterIndex = 0;
let isHapus = false;

function ketik() {
  const current = teks[teksIndex];
  if (!isHapus) {
    nama.textContent = current.substring(0, karakterIndex + 1);
    nama.style.color = kolors[teksIndex];
    karakterIndex++;
    if (karakterIndex === current.length) {
      isHapus = true;
      setTimeout(ketik, 2000);
    } else {
      setTimeout(ketik, 100);
    }
  } else {
    nama.textContent = current.substring(0, karakterIndex - 1);
    nama.style.color = kolors[teksIndex];
    karakterIndex--;
    if (karakterIndex === 0) {
      isHapus = false;
      teksIndex = (teksIndex + 1) % teks.length; // lopping ke awal jika sudah selesai
      setTimeout(ketik, 500);
    } else {
      setTimeout(ketik, 50);
    }
  }
}
ketik();

const kata = [
  "Hallo Enggan Ngoding", "Jangan Ngoding", "Mending Turu", "Scroll Facebook Aja", "Mending Main Game",
  "Mending Nonton Anime", "Mending Nonton Film", "Mending Nonton TV", "Coding Hanya Buang Waktu",
  "Hapus VSCodenya", "Coding Hanyalah Tipuan", "Tetap Malas Ya", "Jangan Semanggat", "Jangan Pikirkan Masa Depan"
];
const kataAcak = () => kata[Math.floor(Math.random() * kata.length)];
const ukuranFontAcak = () => Math.floor(Math.random() * 40 + 20) + "px";

setInterval(() => {
  const elementTeks = document.createElement("div");
  elementTeks.className = "teks-acak";
  elementTeks.textContent = kataAcak();
  elementTeks.style.fontSize = ukuranFontAcak();

  const posX = Math.random() * (window.innerWidth - 100);
  const posY = Math.random() * (window.innerHeight - 50);
  elementTeks.style.left = `${posX}px`;
  elementTeks.style.top = `${posY}px`;

  document.body.appendChild(elementTeks);
  setTimeout(elementTeks.remove, 3000);
}, 2000);