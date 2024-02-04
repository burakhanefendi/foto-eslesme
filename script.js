document.addEventListener('DOMContentLoaded', function() {
    const oyunAlani = document.getElementById('oyun-alani');
    let acikKartlar = [];
    let eslesmeler = 0

    function randomPhotoNumber() {
        let sayilar = [];
        while (sayilar.length < 8) { //4 çift için 8 adet numara üretiyoruz.
            let rastgeleSayi = Math.floor(Math.random() * 99) + 1;
            
            if(!sayilar.includes(rastgeleSayi)) {
                sayilar.push(rastgeleSayi, rastgeleSayi);
            }
        }
        return sayilar.sort(() => 0.5 - Math.random());
    }

    const photoNumber = randomPhotoNumber();
    console.log(photoNumber);

    function gorselOlustur(numara) {
        const kart = document.createElement('div')
        kart.classList.add('kart');
        kart.dataset.numara = numara;

        kart.addEventListener('click', () => {
            if(!kart.classList.contains('acik') && acikKartlar.length < 2) {
                kart.style.backgroundImage = `url('https://lipsum.app/id/${numara}/100x100')`;
                kart.classList.add('acik');
                acikKartlar.push(kart);

                if(acikKartlar.length === 2) {
                    eslesmeKontrol();
                }
            }
        });
        return kart
    }

    function eslesmeKontrol() {
        const firstCard = acikKartlar[0];
        const secondCard = acikKartlar[1];

        if(firstCard.dataset.numara === secondCard.dataset.numara) {
            eslesmeler += 1;
            acikKartlar = [];
            if (eslesmeler === 4) {
                basardiniz();
            }
        }else {
            setTimeout(() => {
                firstCard.classList.remove('acik');
                secondCard.classList.remove('acik');
                firstCard.style.backgroundImage = '';
                secondCard.style.backgroundImage = '';
                acikKartlar = [];
            }, 1000)
            
        }

    }

    function basardiniz() {
        alert('tebrikler oyunun amına koydunuz!')
    }


    function gameStart() {
        photoNumber.forEach(numara => {
            const kart = gorselOlustur(numara);
            oyunAlani.appendChild(kart);
        });
    }
    gameStart();
});