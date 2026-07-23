/* =====================================
🔥 SCRIPT.JS
BANK DIGITAL APP
===================================== */


/* ============================
DATA DEFAULT
============================ */


let userData = {

    nama:"Aji Irwansyah",

    rekening:"1234567894589",

    saldo:5500000,

    masukHari:1200000,

    keluarHari:350000,

    transaksi:[

        {
            nama:"Transfer Masuk",
            jenis:"Pemasukan",
            tanggal:"18 Juli 2026",
            nominal:500000,
            tipe:"masuk"
        },


        {
            nama:"Pembayaran",
            jenis:"Pengeluaran",
            tanggal:"17 Juli 2026",
            nominal:120000,
            tipe:"keluar"
        }

    ]

};



/* ============================
LOAD DATA
============================ */


function loadData(){


let data =
localStorage.getItem("bankData");


if(data){

    userData =
    JSON.parse(data);

}


}



function saveData(){


localStorage.setItem(
"bankData",
JSON.stringify(userData)
);


}




loadData();





/* ============================
FORMAT RUPIAH
============================ */


function rupiah(angka){


return "Rp " +
angka.toLocaleString("id-ID");


}





/* ============================
UPDATE HOME
============================ */


function updateHome(){


let saldo =
document.getElementById(
"saldoUtama"
);


let masuk =
document.getElementById(
"masukHari"
);



let keluar =
document.getElementById(
"keluarHari"
);



if(saldo){


animateNumber(
saldo,
userData.saldo
);


}



if(masuk){

masuk.innerHTML =
rupiah(userData.masukHari);

}



if(keluar){

keluar.innerHTML =
rupiah(userData.keluarHari);

}



renderTransaksi();


}






/* ============================
ANIMASI ANGKA
============================ */


function animateNumber(
element,
target
){


let start=0;


let duration=700;


let step =
target/(duration/16);



let timer =
setInterval(()=>{


start += step;



if(start>=target){


start=target;


clearInterval(timer);


}



element.innerHTML =
rupiah(
Math.floor(start)
);



},16);



}





/* ============================
RENDER RIWAYAT
============================ */


function renderTransaksi(){


let box =
document.getElementById(
"listTransaksi"
);



if(!box)return;



box.innerHTML="";



userData.transaksi
.forEach((trx)=>{



box.innerHTML += `

<div class="trx-card">


<div class="trx-left">


<div class="trx-icon ${trx.tipe}">
</div>


<div>

<h4>
${trx.nama}
</h4>


<p>
${trx.tanggal}
</p>


</div>


</div>



<h3 class="${trx.tipe=="masuk"?"hijau":"hitam"}">


${trx.tipe=="masuk"?"+":"-"}

${rupiah(trx.nominal)}


</h3>



</div>

`;



});


}






/* ============================
TAMBAH TRANSAKSI MASUK
============================ */


function transaksiMasuk(
jumlah,
nama="Transfer Masuk"
){



userData.saldo += jumlah;


userData.masukHari += jumlah;



userData.transaksi.unshift({


nama:nama,

jenis:"Pemasukan",

tanggal:
new Date()
.toLocaleDateString(
"id-ID"
),


nominal:jumlah,


tipe:"masuk"


});



saveData();


updateHome();


toast(
"Saldo berhasil masuk"
);



}







/* ============================
TAMBAH TRANSAKSI KELUAR
============================ */


function transaksiKeluar(
jumlah,
nama="Pembayaran"
){



if(jumlah >
userData.saldo){


toast(
"Saldo tidak cukup"
);


return;


}



userData.saldo -= jumlah;


userData.keluarHari += jumlah;




userData.transaksi.unshift({


nama:nama,


jenis:"Pengeluaran",


tanggal:
new Date()
.toLocaleDateString(
"id-ID"
),


nominal:jumlah,


tipe:"keluar"


});



saveData();


updateHome();



toast(
"Transaksi berhasil"
);



}






/* ============================
BUTTON MENU
============================ */


function openMasuk(){


let nominal =
prompt(
"Masukkan nominal saldo masuk"
);



if(nominal){

transaksiMasuk(
Number(nominal)
);


}



}




function openKeluar(){


let nominal =
prompt(
"Masukkan nominal saldo keluar"
);



if(nominal){


transaksiKeluar(
Number(nominal)
);



}



}







/* ============================
COPY REKENING
============================ */


function copyRekening(){


navigator.clipboard.writeText(
userData.rekening
);



toast(
"Nomor rekening disalin"
);


}






/* ============================
TOAST
============================ */


function toast(text){


let box =
document.createElement(
"div"
);



box.className="toast";


box.innerHTML=text;



document.body.appendChild(box);



setTimeout(()=>{


box.remove();



},2500);



}






/* ============================
LOGOUT
============================ */


function logout(){



localStorage.removeItem(
"login"
);



toast(
"Berhasil logout"
);



setTimeout(()=>{


location.href="index.html";


},1000);



}






/* ============================
LOAD PROFILE
============================ */


function updateProfile(){



let nama =
document.querySelectorAll(
".profile-name"
);



nama.forEach(
(el)=>{

el.innerHTML =
userData.nama;

}

);



}




/* ============================
AUTO START
============================ */


document.addEventListener(
"DOMContentLoaded",
()=>{


updateHome();


updateProfile();


});
