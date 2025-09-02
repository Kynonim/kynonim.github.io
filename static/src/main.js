const simple = document.getElementById("simple");
const nav = document.getElementById("navbar");

function getDeviceInfo() {
  const w = window.innerWidth;
  return w <= 480 ? "Watch"
    : w > 480 && w <= 768 ? "Mobile"
    : w > 768 && w <= 1024 ? "Tablet"
    : w > 1024 && w <= 1680 ? "Laptop"
    : "Desktop";
}

let device = getDeviceInfo();
const teks = ["Riky Ripaldo", "Malas Ngoding", "Member Imphnen", "Kynonim"];
const kolors = ["#FF5733", "#33FF57", "#f5ff33", "#FF3357"];
const nama = document.getElementById("nama");

let teksIndex = 0, karakterIndex = 0, isHapus = false;

const ketik = () => {
  const current = teks[teksIndex];
  if (!isHapus) {
    nama.textContent = current.substring(0, karakterIndex + 1).toString();
    nama.style.color = kolors[teksIndex];
    karakterIndex++;
    karakterIndex === current.length ? (isHapus = true, setTimeout(ketik, 2000)) : setTimeout(ketik, 100);
  } else {
    nama.textContent = current.substring(0, karakterIndex - 1).toString();
    nama.style.color = kolors[teksIndex];
    karakterIndex--;
    karakterIndex === 0 ? (isHapus = false, teksIndex = (teksIndex + 1) % teks.length, setTimeout(ketik, 500)) : setTimeout(ketik, 50);
  }
};
ketik();

function getFontSize() {
  return device === "Watch" ? 14
    : device === "Mobile" ? 18
    : device === "Tablet" ? 24
    : device === "Laptop" ? 32
    : 40;
}

const motivasiSection = document.getElementById("motivasi");
const kata = ["Hallo Enggan Ngoding", "Jangan Ngoding", "Mending Turu", "Scroll Facebook Aja", "Mending Main Game", "Mending Nonton Anime", "Mending Nonton Film", "Mending Nonton TV", "Coding Hanya Buang Waktu", "Hapus VSCodenya", "Coding Hanyalah Tipuan", "Tetap Malas Ya", "Jangan Semanggat", "Jangan Pikirkan Masa Depan"];
const kataAcak = () => kata[Math.floor(Math.random() * kata.length)], ukuranFontAcak = () => Math.floor(Math.random() * getFontSize() + 20) + "px";

setInterval(() => {
  const elementTeks = document.createElement("div");
  elementTeks.className = "teks-acak";
  elementTeks.textContent = kataAcak();
  elementTeks.style.fontSize = ukuranFontAcak();

  const posX = Math.random() * (motivasiSection.offsetWidth - 100);
  const posY = Math.random() * (motivasiSection.offsetHeight - 50)
  elementTeks.style.position = "absolute";
  elementTeks.style.left = `${posX}px`;
  elementTeks.style.top = `${posY}px`;

  motivasiSection.appendChild(elementTeks);
  setTimeout(() => elementTeks.remove, 3000)
}, 2000);

function checkNavbar() {nav.style.display = (nav.style.display === "flex") ? "none" : "flex";}

window.addEventListener("resize", () => {
  simple.style.color = device === "Mobile" ? kolors[0] : device === "Tablet" ? kolors[1] : device === "Laptop" ? kolors[2] : kolors[3];
  if (device === "Mobile") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
});

const links = document.querySelectorAll('#navbar a');
links.forEach(link => {
  link.addEventListener('click', function () {
    links.forEach(el => el.classList.remove('active'));
    this.classList.add('active');
  });
});
