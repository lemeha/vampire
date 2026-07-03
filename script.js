// ============================================================
// УПРАВЛЕНИЕ ФОНАМИ
// ============================================================

function setBackground(className) {
    document.body.classList.remove(
        'bg-start',
        'bg-block1',
        'bg-transition1',
        'bg-block2',
        'bg-transition2',
        'bg-block3'
    );
    if (className) {
        document.body.classList.add(className);
    }
}
setBackground('bg-start');

// ============================================================
// СТАРТОВАЯ СТРАНИЦА И МОДАЛЬНОЕ ОКНО №1
// ============================================================

var startPage = document.getElementById('startPage');
var quizPage = document.getElementById('quizPage');
var transitionPage1 = document.getElementById('transitionPage1');
var transitionPage2 = document.getElementById('transitionPage2');
var startBtn = document.getElementById('startBtn');
var birthdateInput = document.getElementById('birthdate');
var transitionBtn1 = document.getElementById('transitionBtn1');
var transitionBtn2 = document.getElementById('transitionBtn2');

var modalOverlay = document.getElementById('modalOverlay');
var modalText = document.getElementById('modalText');
var modalIcon = document.getElementById('modalIcon');
var modalBtn = document.getElementById('modalBtn');

// Модальное окно №2 (подарок из пуфика)
var giftModalOverlay = document.getElementById('giftModalOverlay');
var giftModalBtn = document.getElementById('giftModalBtn');

// Модальное окно №3 (подарок из-под кресла)
var giftModalOverlay2 = document.getElementById('giftModalOverlay2');
var giftModalBtn2 = document.getElementById('giftModalBtn2');

birthdateInput.value = '';
var targetDate = new Date(1995, 6, 4);

startBtn.addEventListener('click', function() {
    var inputDate = new Date(birthdateInput.value);
    
    if (isNaN(inputDate.getTime()) || birthdateInput.value === '') {
        alert('Пожалуйста, введите корректную дату рождения.');
        return;
    }
    
    var inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    var targetDateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    
    if (inputDateOnly < targetDateOnly) {
        modalIcon.textContent = '👵';
        modalText.textContent = 'Ты слишком стара для этого';
        modalBtn.textContent = 'Старчески ворчу';
        modalBtn.className = 'btn btn-primary';
        modalBtn.onclick = function() {
            modalOverlay.classList.remove('show');
        };
        modalOverlay.classList.add('show');
    } else if (inputDateOnly > targetDateOnly) {
        modalIcon.textContent = '👶';
        modalText.textContent = 'Ты слишком молода для этого';
        modalBtn.textContent = 'Вытираю молоко с губ';
        modalBtn.className = 'btn btn-primary';
        modalBtn.onclick = function() {
            modalOverlay.classList.remove('show');
        };
        modalOverlay.classList.add('show');
    } else {
        modalIcon.textContent = '🧛';
        modalText.textContent = 'Уже да)';
        modalBtn.textContent = 'Поехали!';
        modalBtn.className = 'btn btn-success';
        modalBtn.onclick = function() {
            modalOverlay.classList.remove('show');
            startQuiz();
        };
        modalOverlay.classList.add('show');
    }
});

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
    }
});

// ============================================================
// ЗАПУСК КВИЗА (БЛОК 1)
// ============================================================

function startQuiz() {
    startPage.style.display = 'none';
    transitionPage1.style.display = 'none';
    transitionPage2.style.display = 'none';
    quizPage.style.display = 'block';
    setBackground('bg-block1');
    
    if (!musicStarted) {
        startMusic();
    }
    
    currentIndex = 0;
    renderQuestion(currentIndex);
}

// ============================================================
// ПЕРЕХОД МЕЖДУ БЛОКАМИ
// ============================================================

// Переходный экран 1 (между блоками 1 и 2)
function showTransitionScreen1() {
    quizPage.style.display = 'none';
    transitionPage1.style.display = 'block';
    setBackground('bg-transition1');  // Переход 1
}

// Переходный экран 2 (между блоками 2 и 3)
function showTransitionScreen2() {
    quizPage.style.display = 'none';
    transitionPage2.style.display = 'block';
    setBackground('bg-transition2');  // Переход 2
}

// Переход с блока 1 на блок 2
transitionBtn1.addEventListener('click', function() {
    giftModalOverlay.classList.add('show');
});

giftModalBtn.addEventListener('click', function() {
    giftModalOverlay.classList.remove('show');
    
    transitionPage1.style.display = 'none';
    quizPage.style.display = 'block';
    setBackground('bg-block2');  // Блок 2
    
    for (var i = 0; i < quizData.length; i++) {
        if (quizData[i].block === 2) {
            currentIndex = i;
            break;
        }
    }
    renderQuestion(currentIndex);
});

giftModalOverlay.addEventListener('click', function(e) {
    if (e.target === giftModalOverlay) {
        giftModalOverlay.classList.remove('show');
    }
});

// Переход с блока 2 на блок 3
transitionBtn2.addEventListener('click', function() {
    giftModalOverlay2.classList.add('show');
});

giftModalBtn2.addEventListener('click', function() {
    giftModalOverlay2.classList.remove('show');
    
    transitionPage2.style.display = 'none';
    quizPage.style.display = 'block';
    setBackground('bg-block3');  // Блок 3
    
    for (var i = 0; i < quizData.length; i++) {
        if (quizData[i].block === 3) {
            currentIndex = i;
            break;
        }
    }
    renderQuestion(currentIndex);
});

giftModalOverlay2.addEventListener('click', function(e) {
    if (e.target === giftModalOverlay2) {
        giftModalOverlay2.classList.remove('show');
    }
});

// ============================================================
// УПРАВЛЕНИЕ МУЗЫКОЙ
// ============================================================

var audio = document.getElementById('bgMusic');
var musicBtn = document.getElementById('musicBtn');
var isPlaying = false;
var musicStarted = false;
var backgroundWasPlaying = false;

function startMusic() {
    if (musicStarted) return;
    audio.play().then(function() {
        isPlaying = true;
        musicStarted = true;
        backgroundWasPlaying = true;
        musicBtn.textContent = '🔊';
        musicBtn.classList.add('playing');
    }).catch(function() {
        musicBtn.textContent = '🔇';
        musicBtn.classList.remove('playing');
        backgroundWasPlaying = false;
    });
}

musicBtn.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        backgroundWasPlaying = false;
        musicBtn.textContent = '🔇';
        musicBtn.classList.remove('playing');
    } else {
        audio.play().then(function() {
            isPlaying = true;
            musicStarted = true;
            backgroundWasPlaying = true;
            musicBtn.textContent = '🔊';
            musicBtn.classList.add('playing');
        }).catch(function() {
            alert('Не удалось воспроизвести музыку. Проверьте, что файл audio/font.mp3 лежит в папке audio.');
        });
    }
});

// ============================================================
// ФУНКЦИЯ ВОСПРОИЗВЕДЕНИЯ ПРЕВЬЮ САУНДТРЕКОВ
// ============================================================

var currentAudioPlayer = null;
var currentPlayBtn = null;

function playAudioPreview(path, btnElement) {
    if (currentAudioPlayer && currentPlayBtn === btnElement && !currentAudioPlayer.paused) {
        currentAudioPlayer.pause();
        btnElement.textContent = '▶';
        btnElement.classList.remove('playing');
        return;
    }
    
    if (currentAudioPlayer && currentPlayBtn === btnElement && currentAudioPlayer.paused) {
        currentAudioPlayer.play();
        btnElement.textContent = '⏸';
        btnElement.classList.add('playing');
        return;
    }
    
    if (currentAudioPlayer) {
        currentAudioPlayer.pause();
        if (currentPlayBtn) {
            currentPlayBtn.textContent = '▶';
            currentPlayBtn.classList.remove('playing');
        }
        currentAudioPlayer = null;
        currentPlayBtn = null;
    }
    
    backgroundWasPlaying = isPlaying;
    
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        musicBtn.textContent = '🔇';
        musicBtn.classList.remove('playing');
    }
    
    var player = new Audio(path);
    player.volume = 0.5;
    player.play().then(function() {
        currentAudioPlayer = player;
        currentPlayBtn = btnElement;
        btnElement.textContent = '⏸';
        btnElement.classList.add('playing');
    }).catch(function() {
        alert('Не удалось воспроизвести аудио. Проверьте путь: ' + path);
    });
    
    player.addEventListener('ended', function() {
        currentAudioPlayer = null;
        if (currentPlayBtn) {
            currentPlayBtn.textContent = '▶';
            currentPlayBtn.classList.remove('playing');
            currentPlayBtn = null;
        }
    });
}

// ============================================================
// ЛОГИКА РАБОТЫ КВИЗА
// ============================================================

var currentIndex = 0;
var totalQuestions = quizData.length;

var qText = document.getElementById('qText');
var qType = document.getElementById('qType');
var optionsArea = document.getElementById('optionsArea');
var explanationBlock = document.getElementById('explanationBlock');
var errorMsg = document.getElementById('errorMsg');
var checkBtn = document.getElementById('checkBtn');
var nextBtn = document.getElementById('nextBtn');
var resetBtn = document.getElementById('resetBtn');
var qCounter = document.getElementById('qCounter');

var userAnswers = {};

// Функция показа увеличенного изображения
function showImagePreview(src) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999; display:flex; justify-content:center; align-items:center; cursor:pointer; animation:fadeIn 0.3s ease;';
    
    var container = document.createElement('div');
    container.style.cssText = 'position:relative; max-width:90%; max-height:90%; display:flex; justify-content:center; align-items:center;';
    
    var closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'position:absolute; top:-20px; right:-20px; width:44px; height:44px; background:#2a1414; border:2px solid #5a2a2a; border-radius:50%; color:#d0b0a0; font-size:1.4rem; cursor:pointer; transition:0.3s; display:flex; align-items:center; justify-content:center; z-index:10000;';
    closeBtn.addEventListener('mouseenter', function() {
        this.style.borderColor = '#d06060';
        this.style.color = '#d09080';
    });
    closeBtn.addEventListener('mouseleave', function() {
        this.style.borderColor = '#5a2a2a';
        this.style.color = '#d0b0a0';
    });
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        document.body.removeChild(overlay);
    });
    
    var img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'max-width:90vw; max-height:85vh; border-radius:16px; border:2px solid #5a2a2a; box-shadow:0 0 60px rgba(0,0,0,0.8); object-fit:contain;';
    
    container.appendChild(closeBtn);
    container.appendChild(img);
    overlay.appendChild(container);
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    document.body.appendChild(overlay);
}

function renderQuestion(index) {
     var q = quizData[index];
    if (!q) return;

    if (q.block === 1) {
        setBackground('bg-block1');
    } else if (q.block === 2) {
        setBackground('bg-block2');
    } else if (q.block === 3) {
        setBackground('bg-block3');
    }

    qCounter.textContent = 'Вопрос ' + (index + 1) + ' из ' + totalQuestions;
    qText.textContent = q.question;

    if (q.type === 'single') qType.textContent = '🔘 Один вариант';
    else if (q.type === 'multiple') qType.textContent = '☑️ Несколько вариантов';
    else if (q.type === 'match' || q.type === 'match_images') qType.textContent = '🔗 Сопоставление';

    explanationBlock.classList.remove('show');
    explanationBlock.innerHTML = '';
    errorMsg.classList.remove('show');
    nextBtn.disabled = true;
    checkBtn.disabled = false;
    optionsArea.innerHTML = '';

    if (currentAudioPlayer) {
        currentAudioPlayer.pause();
        currentAudioPlayer = null;
        if (currentPlayBtn) {
            currentPlayBtn.textContent = '▶';
            currentPlayBtn.classList.remove('playing');
            currentPlayBtn = null;
        }
    }

    if (q.type === 'match' || q.type === 'match_images') {
        var container = document.createElement('div');

        var grid = document.createElement('div');
        grid.className = 'match-grid';

        var hLeft = document.createElement('div');
        hLeft.className = 'col-header';
        hLeft.textContent = q.leftLabel;
        grid.appendChild(hLeft);

        var hRight = document.createElement('div');
        hRight.className = 'col-header';
        hRight.textContent = q.rightLabel;
        grid.appendChild(hRight);

        var isImageMatch = q.type === 'match_images';
        var leftItems = isImageMatch ? q.leftImages : q.leftItems;
        var numItems = leftItems ? leftItems.length : 0;

        for (var i = 0; i < numItems; i++) {
            var leftDiv = document.createElement('div');
            leftDiv.className = 'match-item left-item';
            leftDiv.style.cssText = 'display:flex; align-items:center; justify-content:center; padding:10px;';
            
            if (isImageMatch && q.leftImages && q.leftImages[i]) {
                var imgContainer = document.createElement('div');
                imgContainer.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:6px; width:100%;';
                
                var numberSpan = document.createElement('span');
                numberSpan.textContent = (i + 1) + '.';
                numberSpan.style.cssText = 'font-weight:700; color:#c09080; font-size:1.1rem; text-shadow: 0 0 10px rgba(0,0,0,0.5);';
                imgContainer.appendChild(numberSpan);
                
                var img = document.createElement('img');
                img.src = q.leftImages[i];
                img.style.cssText = 'max-width:150px; width:100%; height:auto; border-radius:12px; border:2px solid #4a2a2a; display:block; cursor:pointer; transition: transform 0.2s, border-color 0.2s;';
                img.alt = 'Герб ' + (i+1);
                
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showImagePreview(this.src);
                });
                img.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.borderColor = '#d06060';
                    this.style.boxShadow = '0 0 20px rgba(180, 40, 40, 0.3)';
                });
                img.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.borderColor = '#4a2a2a';
                    this.style.boxShadow = 'none';
                });
                
                imgContainer.appendChild(img);
                leftDiv.appendChild(imgContainer);
            } else if (q.leftItems && q.leftItems[i]) {
                leftDiv.textContent = q.leftItems[i];
            }
            grid.appendChild(leftDiv);

            var rightDiv = document.createElement('div');
            rightDiv.className = 'match-item right-item';
            rightDiv.style.cssText = 'display:flex; align-items:center; padding:10px;';
            
            if (q.audioFiles && q.rightItems && q.rightItems[i]) {
                var letter = q.rightItems[i].charAt(0);
                var audioPath = q.audioFiles[letter];
                
                var trackContainer = document.createElement('div');
                trackContainer.style.cssText = 'display: flex; flex-direction: column; gap: 4px; width: 100%;';
                
                var topRow = document.createElement('div');
                topRow.style.cssText = 'display: flex; align-items: center; gap: 10px;';
                
                var letterSpan = document.createElement('span');
                letterSpan.textContent = letter + '.';
                letterSpan.style.cssText = 'font-weight: 600; color: #b08070; min-width: 20px;';
                topRow.appendChild(letterSpan);
                
                if (audioPath) {
                    var playBtn = document.createElement('button');
                    playBtn.textContent = '▶';
                    playBtn.className = 'btn-play';
                    playBtn.dataset.audio = audioPath;
                    playBtn.style.cssText = 'background: none; border: 2px solid #5a2a2a; border-radius: 50%; width: 32px; height: 32px; color: #b08070; cursor: pointer; font-size: 14px; transition: 0.25s; display: flex; align-items: center; justify-content: center; flex-shrink: 0;';
                    playBtn.addEventListener('mouseenter', function() {
                        this.style.borderColor = '#d06060';
                        this.style.color = '#d09080';
                        this.style.boxShadow = '0 0 20px rgba(180, 40, 40, 0.2)';
                    });
                    playBtn.addEventListener('mouseleave', function() {
                        this.style.borderColor = '#5a2a2a';
                        this.style.color = '#b08070';
                        this.style.boxShadow = 'none';
                    });
                    playBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        var path = this.dataset.audio;
                        playAudioPreview(path, this);
                    });
                    topRow.appendChild(playBtn);
                }
                
                var trackName = document.createElement('div');
                trackName.textContent = q.rightItems[i].substring(2);
                trackName.style.cssText = 'font-size: 0.9rem; color: #d0c0b8; padding-left: 30px; line-height: 1.4;';
                
                trackContainer.appendChild(topRow);
                trackContainer.appendChild(trackName);
                rightDiv.appendChild(trackContainer);
            } else if (q.rightItems && q.rightItems[i]) {
                rightDiv.textContent = q.rightItems[i];
            }
            
            grid.appendChild(rightDiv);
        }

        container.appendChild(grid);

        var inputsRow = document.createElement('div');
        inputsRow.className = 'match-inputs';

        var matchInputs = [];

        for (var j = 1; j <= numItems; j++) {
            var group = document.createElement('div');
            group.className = 'match-input-group';
            var label = document.createElement('label');
            label.textContent = j + ' —';
            var input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.dataset.index = j;
            input.dataset.correct = q.correctMap[j];
            input.autocomplete = 'off';
            input.placeholder = '?';
            input.style.textTransform = 'uppercase';

            var key = 'q' + q.id + '_match_' + j;
            if (userAnswers[key]) {
                input.value = userAnswers[key];
            }

            group.appendChild(label);
            group.appendChild(input);
            inputsRow.appendChild(group);
            matchInputs.push(input);
        }

        for (var mi = 0; mi < matchInputs.length; mi++) {
            (function(idx) {
                matchInputs[idx].addEventListener('input', function() {
                    var val = this.value.trim().toUpperCase();
                    if (val.length === 1 && idx < matchInputs.length - 1) {
                        matchInputs[idx + 1].focus();
                    }
                });
                matchInputs[idx].addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && idx < matchInputs.length - 1) {
                        e.preventDefault();
                        matchInputs[idx + 1].focus();
                    }
                });
            })(mi);
        }

        container.appendChild(inputsRow);
        optionsArea.appendChild(container);

    } else {
        var wrapper = document.createElement('div');
        wrapper.className = 'options';

        for (var oi = 0; oi < q.options.length; oi++) {
            var div = document.createElement('div');
            div.className = 'option';

            var input;
            if (q.type === 'single') {
                input = document.createElement('input');
                input.type = 'radio';
                input.name = 'q' + q.id;
                input.value = oi;
            } else {
                input = document.createElement('input');
                input.type = 'checkbox';
                input.name = 'q' + q.id;
                input.value = oi;
            }

            var key2 = 'q' + q.id + '_' + oi;
            if (userAnswers[key2] === true) {
                input.checked = true;
            }

            var label = document.createElement('label');
            label.textContent = q.options[oi];

            div.appendChild(input);
            div.appendChild(label);
            
            div.addEventListener('click', function(e) {
                if (e.target.tagName !== 'INPUT') {
                    var inp = this.querySelector('input');
                    if (inp) {
                        if (inp.type === 'checkbox') {
                            inp.checked = !inp.checked;
                        } else if (inp.type === 'radio') {
                            inp.checked = true;
                            var name = inp.name;
                            var allRadios = document.querySelectorAll('input[name="' + name + '"]');
                            for (var r = 0; r < allRadios.length; r++) {
                                if (allRadios[r] !== inp) {
                                    allRadios[r].checked = false;
                                    var parent = allRadios[r].closest('.option');
                                    if (parent) {
                                        parent.style.borderColor = '';
                                        parent.style.background = '';
                                    }
                                }
                            }
                        }
                        var event = new Event('change', { bubbles: true });
                        inp.dispatchEvent(event);
                    }
                }
            });
            
            wrapper.appendChild(div);
        }

        optionsArea.appendChild(wrapper);
    }

    if (userAnswers['q' + q.id + '_answered']) {
        revealAnswer(q.id);
    }
}

function handleCheck() {
    var q = quizData[currentIndex];
    var qId = q.id;

    clearStyles();
    var isValid = false;

    if (q.type === 'match' || q.type === 'match_images') {
        var inputs = document.querySelectorAll('.match-input-group input');
        var allFilled = true;
        for (var mi = 0; mi < inputs.length; mi++) {
            if (inputs[mi].value.trim() === '') allFilled = false;
        }

        if (!allFilled) {
            errorMsg.textContent = '⚠️ Заполните все поля сопоставления!';
            errorMsg.classList.add('show');
            return;
        }

        isValid = true;

        for (var mi2 = 0; mi2 < inputs.length; mi2++) {
            var inp = inputs[mi2];
            var userVal = inp.value.trim().toUpperCase();
            var correctVal = inp.dataset.correct.toUpperCase();
            var idx = inp.dataset.index;
            userAnswers['q' + q.id + '_match_' + idx] = userVal;

            if (userVal === correctVal) {
                inp.classList.add('correct-input');
            } else {
                inp.classList.add('wrong-input');
            }
        }

    } else {
        var inputs2 = optionsArea.querySelectorAll('input');
        var checked = false;
        for (var ci = 0; ci < inputs2.length; ci++) {
            if (inputs2[ci].checked) checked = true;
        }

        if (!checked) {
            errorMsg.textContent = '⚠️ Выберите хотя бы один вариант!';
            errorMsg.classList.add('show');
            return;
        }

        isValid = true;

        for (var ci2 = 0; ci2 < inputs2.length; ci2++) {
            var inp2 = inputs2[ci2];
            var idx2 = parseInt(inp2.value);
            var isCorrect = false;
            for (var cj = 0; cj < q.correct.length; cj++) {
                if (q.correct[cj] === idx2) isCorrect = true;
            }
            var parent = inp2.closest('.option');
            userAnswers['q' + q.id + '_' + idx2] = inp2.checked;

            if (inp2.checked) {
                if (isCorrect) {
                    parent.style.borderColor = '#3a9a5a';
                    parent.style.background = '#1a2a1a';
                } else {
                    parent.style.borderColor = '#9a3a3a';
                    parent.style.background = '#2a1818';
                }
            } else {
                if (isCorrect) {
                    parent.style.borderColor = '#3a7a4a';
                    parent.style.borderStyle = 'dashed';
                }
            }
        }
    }

    if (isValid) {
        userAnswers['q' + qId + '_answered'] = true;
        explanationBlock.innerHTML = q.explanation;
        explanationBlock.classList.add('show');
        checkBtn.disabled = true;
        nextBtn.disabled = false;
        errorMsg.classList.remove('show');

        if (q.type === 'match' || q.type === 'match_images') {
            var allInputs = document.querySelectorAll('.match-input-group input');
            for (var di = 0; di < allInputs.length; di++) {
                allInputs[di].disabled = true;
            }
        } else {
            var allInputs2 = optionsArea.querySelectorAll('input');
            for (var di2 = 0; di2 < allInputs2.length; di2++) {
                allInputs2[di2].disabled = true;
            }
        }
    }
}

function clearStyles() {
    var opts = optionsArea.querySelectorAll('.option');
    for (var oi2 = 0; oi2 < opts.length; oi2++) {
        opts[oi2].style.borderColor = '';
        opts[oi2].style.background = '';
        opts[oi2].style.borderStyle = '';
    }
    var matchInputs = document.querySelectorAll('.match-input-group input');
    for (var mi3 = 0; mi3 < matchInputs.length; mi3++) {
        matchInputs[mi3].classList.remove('correct-input', 'wrong-input');
        matchInputs[mi3].disabled = false;
    }
}

function revealAnswer(qId) {
    var q = null;
    for (var qi = 0; qi < quizData.length; qi++) {
        if (quizData[qi].id === qId) q = quizData[qi];
    }
    if (!q) return;

    explanationBlock.innerHTML = q.explanation;
    explanationBlock.classList.add('show');
    checkBtn.disabled = true;
    nextBtn.disabled = false;

    if (q.type === 'match' || q.type === 'match_images') {
        var inputs = document.querySelectorAll('.match-input-group input');
        for (var ri2 = 0; ri2 < inputs.length; ri2++) {
            var inp = inputs[ri2];
            var userVal = inp.value.trim().toUpperCase();
            var correctVal = inp.dataset.correct.toUpperCase();
            if (userVal === correctVal) {
                inp.classList.add('correct-input');
            } else if (userVal !== '') {
                inp.classList.add('wrong-input');
            }
            inp.disabled = true;
        }
    } else {
        var inputs2 = optionsArea.querySelectorAll('input');
        for (var ci3 = 0; ci3 < inputs2.length; ci3++) {
            var inp2 = inputs2[ci3];
            var idx2 = parseInt(inp2.value);
            var isCorrect = false;
            for (var cj2 = 0; cj2 < q.correct.length; cj2++) {
                if (q.correct[cj2] === idx2) isCorrect = true;
            }
            var parent = inp2.closest('.option');
            if (inp2.checked) {
                if (isCorrect) {
                    parent.style.borderColor = '#3a9a5a';
                    parent.style.background = '#1a2a1a';
                } else {
                    parent.style.borderColor = '#9a3a3a';
                    parent.style.background = '#2a1818';
                }
            } else {
                if (isCorrect) {
                    parent.style.borderColor = '#3a7a4a';
                    parent.style.borderStyle = 'dashed';
                }
            }
            inp2.disabled = true;
        }
    }
}

function goToNext() {
    if (currentAudioPlayer) {
        currentAudioPlayer.pause();
        currentAudioPlayer = null;
        if (currentPlayBtn) {
            currentPlayBtn.textContent = '▶';
            currentPlayBtn.classList.remove('playing');
            currentPlayBtn = null;
        }
    }
    
    if (backgroundWasPlaying && musicStarted) {
        audio.play().then(function() {
            isPlaying = true;
            musicBtn.textContent = '🔊';
            musicBtn.classList.add('playing');
        }).catch(function() {});
    }
    
    var currentQ = quizData[currentIndex];
    var nextIndex = currentIndex + 1;
    
    if (nextIndex >= totalQuestions) {
        qText.textContent = '🎉 Поздравляем! Вы ответили на все вопросы!';
        qType.textContent = '🏁 Финиш';
        optionsArea.innerHTML = '';
        explanationBlock.classList.remove('show');
        checkBtn.disabled = true;
        nextBtn.disabled = true;
        qCounter.textContent = 'Вопрос ' + (currentIndex + 1) + ' из ' + totalQuestions;
        return;
    }
    
    var nextQ = quizData[nextIndex];
    
    // Переход с блока 1 на блок 2
    if (currentQ.block === 1 && nextQ.block === 2) {
        showTransitionScreen1();
        return;
    }
    
    // Переход с блока 2 на блок 3
    if (currentQ.block === 2 && nextQ.block === 3) {
        showTransitionScreen2();
        return;
    }
    
    // Переход внутри блока
    currentIndex = nextIndex;
    renderQuestion(currentIndex);
}

function resetQuiz() {
    if (currentAudioPlayer) {
        currentAudioPlayer.pause();
        currentAudioPlayer = null;
        if (currentPlayBtn) {
            currentPlayBtn.textContent = '▶';
            currentPlayBtn.classList.remove('playing');
            currentPlayBtn = null;
        }
    }
    
    if (backgroundWasPlaying && musicStarted) {
        audio.play().then(function() {
            isPlaying = true;
            musicBtn.textContent = '🔊';
            musicBtn.classList.add('playing');
        }).catch(function() {});
    }
    
    userAnswers = {};
    currentIndex = 0;
    startPage.style.display = 'block';
    transitionPage1.style.display = 'none';
    transitionPage2.style.display = 'none';
    quizPage.style.display = 'none';
    setBackground('bg-start');
}

checkBtn.addEventListener('click', handleCheck);
nextBtn.addEventListener('click', goToNext);
resetBtn.addEventListener('click', resetQuiz);

startPage.style.display = 'block';
transitionPage1.style.display = 'none';
transitionPage2.style.display = 'none';
quizPage.style.display = 'none';
setBackground('bg-start');