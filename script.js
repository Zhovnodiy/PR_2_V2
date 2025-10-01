(function () {
    const browserInfoEl = document.getElementById('browserInfo');
    if (browserInfoEl) {
        const userAgent = navigator.userAgent;
        let browserName, browserVersion;

        if (userAgent.indexOf("Chrome") > -1) {
            browserName = "Chrome";
            browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("Firefox") > -1) {
            browserName = "Firefox";
            browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("Safari") > -1) {
            browserName = "Safari";
            browserVersion = userAgent.match(/Version\/([0-9.]+)/)[1];
        } else if (userAgent.indexOf("Edge") > -1) {
            browserName = "Edge";
            browserVersion = userAgent.match(/Edge\/([0-9.]+)/)[1];
        } else {
            browserName = "Невідомий браузер";
            browserVersion = "Невідома версія";
        }

        browserInfoEl.textContent = `Ваш браузер: ${browserName}, Версія: ${browserVersion}`;
    }

    const a = 12, b = 4;

   
    const mathOutputEl = document.getElementById('mathOutput');

    if (mathOutputEl) {
        mathOutputEl.innerHTML = `
            <p><b>Сума:</b> ${a + b}</p>
            <p><b>Різниця:</b> ${a - b}</p>
        `;
    }

    window.addEventListener('load', () => {
        alert('Добуток: ' + (a * b));
        alert('Ділення: ' + (a / b));
    });

    function initializeImageZoom() {
        const images = document.querySelectorAll('img.zoomable');
        images.forEach(img => {
            img.originalWidth = img.width;
            img.originalHeight = img.height;

            img.onmouseover = function () {
                this.classList.add('enlarged');
                this.style.transform = 'scale(1.5)';
                this.style.transition = 'transform 0.3s ease';
                this.style.zIndex = '100';
                this.style.position = 'relative';
            };

            img.onmouseout = function () {
                this.classList.remove('enlarged');
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            };
        });
    }

    const imageContainer = document.getElementById('imageContainer');
    const defaultImageContainerHTML = imageContainer ? imageContainer.innerHTML : '';

    function showImage(value) {
        if (!imageContainer) return;

        imageContainer.innerHTML = `
            <div style="text-align: center;">
                <button id="backBtn" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Повернутися
                </button>
                <br><br>
                <p><strong>Збільшена копія:</strong></p>
                <img src="photo/${value}.png" alt="Збільшена копія" width="600" height="400" 
                     class="zoomable" 
                     onmouseover="zoomImage(this)" 
                     onmouseout="unzoomImage(this)">
                <p><strong>Зменшена копія:</strong></p>
                <img src="photo/${value}.png" alt="Зменшена копія" width="300" height="200" 
                     class="zoomable" 
                     onmouseover="zoomImage(this)" 
                     onmouseout="unzoomImage(this)">
            </div>
        `;

        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.onclick = backToMain;
        }
    }

    window.zoomImage = function (img) {
        img.style.transform = 'scale(1.5)';
        img.style.transition = 'transform 0.3s ease';
        img.style.zIndex = '100';
        img.style.position = 'relative';
    };

    window.unzoomImage = function (img) {
        img.style.transform = 'scale(1)';
        img.style.zIndex = '1';
    };

    function backToMain() {
        if (!imageContainer) return;
        imageContainer.innerHTML = defaultImageContainerHTML;
        initializeRadioListeners();
        initializeImageZoom();
    }

    function initializeRadioListeners() {
        const radioButtons = document.querySelectorAll('input[type="radio"][name="pic"]');
        radioButtons.forEach(radio => {
            radio.onchange = function (e) {
                showImage(e.target.value);
            };
        });
    }

    function initializeNavHover() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.onmouseover = function () {
                this.style.color = '#007bff';
                this.style.backgroundColor = '#f8f9fa';
                this.style.transform = 'translateY(-2px)';
            };

            link.onmouseout = function () {
                this.style.color = '';
                this.style.backgroundColor = '';
                this.style.transform = '';
            };
        });
    }

    window.goToPage = function (selectElement) {
        const selectedPage = selectElement.value;
        if (selectedPage) {
            window.location.href = selectedPage;
        }
    };

  
    window.changeLanguage = function (lang) {
        const pages = {
            'UA': 'index.html',
            'RUS': 'index_ru.html'
        };

        if (pages[lang]) {
            window.location.href = pages[lang];
        }
    };

    const dailyMessages = [
        'Успіх — це 1% натхнення і 99% праці. — Томас Едісон',
        'Програмісти не помиляються — у них фічі.',
        'Код — як гумор: якщо треба пояснювати, значить погано.',
        'Чистий код економить час усім.',
        'Навчайся кожен день — це найкраща інвестиція в себе.',
        'Краще зробити і пожалкувати, ніж не зробити і пожалкувати вдвічі.',
        'Компілятор не бреше — він просто не розуміє твої наміри.'
    ];

    function showRandomMessage() {
        const randomIndex = Math.floor(Math.random() * dailyMessages.length);
        const message = dailyMessages[randomIndex];
        console.log('Інформація дня:', message);

        const messageEl = document.createElement('div');
        messageEl.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #007bff;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 1000;
            max-width: 300px;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;
        messageEl.innerHTML = `💡 <strong>Інформація дня:</strong><br>${message}`;
        document.body.appendChild(messageEl);

        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 5000);
    }

    window.onload = function () {
        initializeImageZoom();
        initializeRadioListeners();
        initializeNavHover();
        showRandomMessage();
    };

    window.showImage = showImage;
    window.backToMain = backToMain;

})();