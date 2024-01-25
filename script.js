var section  = document.querySelector('#section'),
            text = document.querySelector('#text'),
            malumat = document.querySelector('#melumat'),
            footer = document.querySelector('#footer'),
            country = document.querySelector('#country'),
            trys = document.querySelector('#trys'),
            redy_btn = document.querySelector('#redy_btn'),
            userInput = document.querySelector('#userInput'),
            userSubmit = document.querySelector('#userSubmit'),
            resultOfUser = document.querySelector('#resultOfUser');

        //urekleri elave edirem sehifeye
        function addHearts(e){
            var hearts = [];
            for(let i = 1; i <= e; i ++){
                hearts.push(i)
            }
            var message = hearts.map(a => `<i class="fa fa-regular fa-heart" style="font-size: 20px;"></i>`);
            console.log(message)
            trys.innerHTML = message.join('');
        }
        //canlarin sayisini artirmaq istesem burdan sadece deyeri deyisdirecem ve her sey avtomatik deyisilecek
        var qalanCan = 3;
        //cavabi yoxlamaq ucun yaradilan funskiya
        function testAnswer(answer, real){
            if(answer.toLowerCase() == real.toLowerCase()){
                resultOfUser.innerHTML = "Congratulations";
                userInput.style.display = "none";
                userSubmit.style.display = "none";
                setTimeout(function(){
                    resultOfUser.innerHTML = "Refresh for new game";
                },4000)
                return true;
            }else{
                resultOfUser.innerHTML = "Oups, try again!"
                addHearts(qalanCan-1);
                qalanCan--;
                console.log(qalanCan)
                return false;
            }  
        }
        var dogrusu = ""; // Bu cariable ona gore yaratdim ki sonra buna fetchden gelen deyeri menimsedib islede bilim

        redy_btn.addEventListener('click', function(){
            addHearts(qalanCan);
            redy_btn.style.display = 'none';
            var countries = ['russia', 'peru', 'argentina', 'azerbaijan', 'mexico', 'japan', 'turkey', 'spain', 'sudan', 'mali', 'syria'];
            var randomNumber = Math.floor(Math.random() * countries.length);  //random bir olkeni secsin deye ilk once random bir reqem almaliyam
        // Fetching a country from api
            var element = fetch(`https://restcountries.com/v3.1/name/${countries[randomNumber]}`); // fetch ile api-ni tuturam
            element.then(function(event){
                return event.json();
            }).then(function(menim){
                country.innerHTML = `<p>${country.innerHTML = menim[0].name.common}</p> <img src="${menim[0].flags.svg}">` ; // burda ise elave edirem sehifeme olkenin adini ve bayragini
                dogrusu = `${menim[0].capital}`; // burda dogrusuna bu deyeri menimsedirem ozde stringe, cunki toLowerCase() isledecem
            })
        // testing the answer
            userSubmit.addEventListener('click', function(e){
                e.preventDefault();
                testAnswer(userInput.value, dogrusu)
                userInput.value = "";
                //oyunun sonu
                if(qalanCan == 0){
                    resultOfUser.innerHTML = "You Lost!"
                    userInput.style.display = "none";
                    userSubmit.style.display = "none";
                    setTimeout(function(){
                        resultOfUser.innerHTML = "Refresh for new game";
                    },2000)
                }
            })
                
        })