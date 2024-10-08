const axios = require('axios');
const userToken = require('./token'); // Mengimpor token dari file token.js
const readline = require('readline'); // Untuk mengambil input dari pengguna

// Fungsi untuk melakukan check-in harian
async function checkinHarian(tokenPengguna) {
    try {
        // Permintaan POST ke API untuk memicu check-in
        const response = await axios.post('https://api.thelastlord.games/checkin', {
            token: tokenPengguna
        });

        if (response.status === 200) {
            console.log('Check-in harian berhasil:', response.data);
        } else {
            console.log('Gagal melakukan check-in:', response.status, response.data);
        }
    } catch (error) {
        console.error('Terjadi kesalahan saat check-in harian:', error);
    }
}

// Fungsi untuk menampilkan menu pilihan
function showMenu() {
    console.log("Pilih mode check-in:");
    console.log("1. Check-in manual");
    console.log("2. Check-in otomatis setiap 24 jam");
}

// Setup untuk input dari terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Jalankan pilihan menu
showMenu();
rl.question('Masukkan pilihan Anda: ', (choice) => {
    if (choice === '1') {
        console.log("Check-in manual dipilih.");
        checkinHarian(userToken); // Jalankan check-in sekali
        rl.close();
    } else if (choice === '2') {
        console.log("Check-in otomatis dipilih.");
        console.log("Check-in akan berjalan setiap 24 jam.");
        setInterval(() => {
            checkinHarian(userToken);
        }, 24 * 60 * 60 * 1000); // Setiap 24 jam
        rl.close(); // Tutup input setelah memilih
    } else {
        console.log("Pilihan tidak valid. Harap pilih 1 atau 2.");
        rl.close();
    }
});
