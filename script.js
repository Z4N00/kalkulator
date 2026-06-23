const jenisJagung = document.getElementById("jenisJagung");
const hargaKg = document.getElementById("hargaKg");

const jenisTanah = document.getElementById("jenisTanah");
const hargaTanah = document.getElementById("hargaTanah");

jenisJagung.addEventListener("change", function () {
  hargaKg.value = jenisJagung.value;
});

jenisTanah.addEventListener("change", function () {
  if (jenisTanah.value === "manual") {
    hargaTanah.value = "";
    hargaTanah.placeholder = "Masukkan harga sendiri";
    hargaTanah.focus();
  } else {
    hargaTanah.value = jenisTanah.value;
  }
});

function bukaMenu(menu) {
  document.getElementById("jagung").classList.add("hidden");
  document.getElementById("tanah").classList.add("hidden");
  document.getElementById("makanan").classList.add("hidden");
  document.getElementById("ternak").classList.add("hidden");

  document.getElementById(menu).classList.remove("hidden");
}

function rupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
}

function hitungJagung() {
  let jumlahKarung = Number(document.getElementById("jumlahKarung").value);
  let kgPerKarung = Number(document.getElementById("kgPerKarung").value);
  let harga = Number(document.getElementById("hargaKg").value);

  let namaJagung = jenisJagung.options[jenisJagung.selectedIndex].text;

  let totalKgPipilan = jumlahKarung * kgPerKarung;
  let nilaiProduksi = totalKgPipilan * harga;

  document.getElementById("hasilJagung").innerHTML = `
    <b>Jenis Jagung:</b> ${namaJagung}<br>
    <b>Jumlah Karung:</b> ${jumlahKarung} karung<br>
    <b>Estimasi Pipilan:</b> ${jumlahKarung} × ${kgPerKarung} kg = ${totalKgPipilan} kg<br>
    <b>Harga per Kg:</b> ${rupiah(harga)}<br>
    <hr>
    <b>Nilai Produksi 27.a:</b><br>
    <span style="font-size:20px; color:#ff7a00; font-weight:bold;">
      ${rupiah(nilaiProduksi)}
    </span>
  `;
}

function ubahCaraLuas() {
  let cara = document.getElementById("caraLuas").value;

  if (cara === "langsung") {
    document.getElementById("inputLangsung").classList.remove("hidden");
    document.getElementById("inputPerkalian").classList.add("hidden");
  } else {
    document.getElementById("inputLangsung").classList.add("hidden");
    document.getElementById("inputPerkalian").classList.remove("hidden");
  }
}

function hitungTanah() {
  let cara = document.getElementById("caraLuas").value;
  let harga = Number(document.getElementById("hargaTanah").value);
  let luas = 0;

  if (cara === "langsung") {
    luas = Number(document.getElementById("luasTanah").value);
  } else {
    let panjang = Number(document.getElementById("panjangTanah").value);
    let lebar = Number(document.getElementById("lebarTanah").value);
    luas = panjang * lebar;
  }

  let nilaiTanah = luas * harga;

  let namaTanah =
    jenisTanah.value === "manual"
      ? "Harga tanah sesuai input sendiri"
      : jenisTanah.options[jenisTanah.selectedIndex].text;

  document.getElementById("hasilTanah").innerHTML = `
    <b>Jenis Lokasi:</b> ${namaTanah}<br>
    <b>Luas Tanah:</b> ${luas} m²<br>
    <b>Harga per m²:</b> ${rupiah(harga)}<br>
    <hr>
    <b>Nilai Aset Tanah 28.a:</b><br>
    <span style="font-size:20px; color:#ff7a00; font-weight:bold;">
      ${rupiah(nilaiTanah)}
    </span>
  `;
}

function hitungMakanan() {
  let jumlahOrang = Number(document.getElementById("jumlahOrang").value);
  let berasPerOrang = Number(document.getElementById("berasPerOrang").value);
  let hargaBeras = Number(document.getElementById("hargaBeras").value);

  let kebutuhanBerasPerHari = jumlahOrang * berasPerOrang;
  let kebutuhanBerasPerMinggu = kebutuhanBerasPerHari * 7;
  let totalBiayaBeras = kebutuhanBerasPerMinggu * hargaBeras;

  document.getElementById("hasilMakanan").innerHTML = `
    <b>Jumlah Anggota:</b> ${jumlahOrang} orang<br>
    <b>Konsumsi Beras:</b> ${berasPerOrang} kg/orang/hari<br>
    <b>Kebutuhan Beras per Hari:</b> ${kebutuhanBerasPerHari.toFixed(1)} kg<br>
    <b>Kebutuhan Beras per Minggu:</b> ${kebutuhanBerasPerMinggu.toFixed(1)} kg<br>
    <b>Harga Beras:</b> ${rupiah(hargaBeras)} / kg<br>
    <hr>
    <b>Estimasi Pengeluaran Beras 1 Minggu:</b><br>
    <span style="font-size:20px; color:#ff7a00; font-weight:bold;">
      ${rupiah(totalBiayaBeras)}
    </span>
    <br><br>
    <small><b>Catatan:</b> Belum termasuk lauk, sayur, atau kebutuhan makanan lainnya dalam 1 minggu, jadi bisa ditambahkan sendiri.</small>
  `;
}
