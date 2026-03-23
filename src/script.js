document.addEventListener('DOMContentLoaded', () => {
    // 状態管理
    let currentSceneIndex = 0;
    let currentDialogueIndex = 0;
    let intimacyScore = 0;
    let isLovers = false; // シーン7クリアでtrue
    let showingQuestionPrompt = false; // 質問文（選択肢直前）を表示中か
    let showingQuestion = false;       // 選択肢UIを表示中か
    let isPlayingSuccessSequence = false; // 成功ダイアログ再生中フラグ

    // UIエレメントの取得
    const backgroundLayer = document.getElementById('background-layer');
    const startButton = document.getElementById('start-button');
    const screenCover = document.getElementById('screen-cover');
    const dialogueContainer = document.getElementById('dialogue-container');
    const dialogueBox = document.getElementById('dialogue-box');
    const speakerName = document.getElementById('speaker-name');
    const dialogueText = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('choices-container');
    const nextIndicator = document.getElementById('next-indicator');
    const intimacyFill = document.getElementById('intimacy-fill');
    const intimacyText = document.getElementById('intimacy-text');
    const sceneTitle = document.getElementById('scene-title');
    const characterSprite = document.getElementById('character-sprite');
    const characterPlaceholder = document.getElementById('character-placeholder');
    const blackoutScreen = document.getElementById('blackout-screen');

    // 初期設定：タイトル画面の背景
    if (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.titleBackground) {
        screenCover.style.backgroundImage = `url('${GAME_CONFIG.titleBackground}')`;
    }

    // テキスト内の変数を置換する関数
    function processText(text) {
        let heroCallsHeroine = isLovers ? CHARACTER_NAMES.hero_calling_heroine_after : CHARACTER_NAMES.hero_calling_heroine_before;
        return text
            .replace(/{heroine_name_after}/g, CHARACTER_NAMES.hero_calling_heroine_after)
            .replace(/{heroine_name}/g, heroCallsHeroine);
    }

    // ゲーム開始
    startButton.addEventListener('click', () => {
        screenCover.classList.add('fade-out');
        setTimeout(() => {
            dialogueContainer.classList.remove('hidden');
            loadScene();
        }, 1000);
    });

    // 会話ウィンドウクリックで進む
    dialogueBox.addEventListener('click', (e) => {
        if (showingQuestion || isPlayingSuccessSequence) return; // 選択肢表示中や成功シーン中はクリックで進まない

        const scene = GAME_STORY_DATA[currentSceneIndex];

        // 通常のセリフがまだ残っている場合
        if (scene.dialogues && currentDialogueIndex < scene.dialogues.length - 1) {
            currentDialogueIndex++;
            showDialogueLine(scene.dialogues[currentDialogueIndex]);
        }
        // 最後のセリフに到達した時
        else if (scene.dialogues && currentDialogueIndex === scene.dialogues.length - 1) {
            if (scene.question) {
                if (!showingQuestionPrompt) {
                    // 第1段階：選択肢直前の「質問メッセージ」だけを表示する
                    showingQuestionPrompt = true;
                    showQuestionPrompt(scene.question);
                } else {
                    // 第2段階：メッセージを読み終わってクリックしたら選択肢ボタンを出す
                    showChoices(scene.choices);
                }
            } else {
                // 質問がないシーン（ただの会話シーン）はそのまま次へ進む
                endSceneAndProceed();
            }
        }
    });

    // シーンの読み込み
    function loadScene() {
        if (currentSceneIndex >= GAME_STORY_DATA.length) {
            // ゲームクリア処理
            showEndScreen();
            return;
        }

        const scene = GAME_STORY_DATA[currentSceneIndex];
        currentDialogueIndex = 0;
        showingQuestion = false;
        showingQuestionPrompt = false;

        // 背景とタイトルの設定
        sceneTitle.innerText = scene.title;
        // 背景画像URLが設定されていれば背景を表示
        backgroundLayer.style.backgroundImage = `url('${scene.background}')`;

        // 恋人判定（scene7クリア以降）
        if (currentSceneIndex === 7) {
            isLovers = true;
            intimacyScore = 100;
            updateIntimacyUI();
        } else if (currentSceneIndex > 7) {
            isLovers = true;
            intimacyScore += 10;
            updateIntimacyUI();
        }

        // 最初のセリフを表示
        if (scene.dialogues && scene.dialogues.length > 0) {
            showDialogueLine(scene.dialogues[currentDialogueIndex]);
        }
    }

    // キャラクターの立ち絵を更新
    function updateCharacterSprite(line) {
        const emotion = line.emotion || "normal";
        let imagePath = "";
        let characterId = "";
        let charName = "";

        // 勇斗が話している時
        if (line.speaker === "勇斗" || line.speaker === "勇斗 (自分)" || line.speaker === CHARACTER_NAMES.hero || line.speaker.includes("勇斗")) {
            imagePath = `assets/images/hayato_${emotion}.png`;
            characterId = "hayato";
            charName = "勇斗";
        }
        // 文花が話している時
        else if (line.speaker === "文花" || line.speaker === CHARACTER_NAMES.heroine || line.speaker.includes("文花")) {
            imagePath = `assets/images/ayaka_${emotion}.png`;
            characterId = "ayaka";
            charName = "文花";
        }

        // どちらか該当する話者であれば画像を更新（それ以外は前の人の画像を残す）
        if (imagePath !== "") {
            characterSprite.src = imagePath;
            characterSprite.classList.remove('sprite-hidden');
            characterPlaceholder.innerText = `[画像未設定]\nassets/images フォルダに\n${characterId}_${emotion}.png\nを配置するとここに${charName}が表示されます`;

            // 画像読み込みエラー時のフォールバック（目印のプレースホルダーを表示）
            characterSprite.onerror = () => {
                characterSprite.classList.add('hidden');
                characterPlaceholder.classList.remove('hidden');
            };
            // 読み込み成功時
            characterSprite.onload = () => {
                characterSprite.classList.remove('hidden');
                characterPlaceholder.classList.add('hidden');
            };
        }
    }

    // セリフ1行を表示
    function showDialogueLine(line) {
        if (line.isCutin) {
            showCutin(line.text);
            return;
        }
        speakerName.innerText = line.speaker;
        dialogueText.innerText = processText(line.text);
        nextIndicator.style.display = 'block';
        updateCharacterSprite(line);
    }

    // 文字だけの黒背景カットイン演出
    function showCutin(text) {
        const transitionScreen = document.getElementById('transition-screen');
        const transitionTitle = document.getElementById('transition-title');
        const uiTop = document.getElementById('ui-top');

        dialogueContainer.classList.add('hidden');
        characterSprite.classList.add('sprite-hidden');
        uiTop.classList.add('hidden');

        transitionTitle.innerText = text;
        transitionScreen.style.backgroundImage = 'none';
        transitionScreen.style.backgroundColor = 'black';

        transitionScreen.classList.remove('hidden');
        requestAnimationFrame(() => {
            transitionScreen.classList.add('active');
        });

        setTimeout(() => {
            transitionScreen.classList.remove('active');
            setTimeout(() => {
                transitionScreen.classList.add('hidden');
                uiTop.classList.remove('hidden');
                dialogueContainer.classList.remove('hidden');

                const scene = GAME_STORY_DATA[currentSceneIndex];
                if (currentDialogueIndex < scene.dialogues.length - 1) {
                    currentDialogueIndex++;
                    showDialogueLine(scene.dialogues[currentDialogueIndex]);
                } else {
                    if (scene.question) {
                        showingQuestionPrompt = true;
                        showQuestionPrompt(scene.question);
                    } else {
                        endSceneAndProceed();
                    }
                }
            }, 1000);
        }, 2000);
    }

    // 選択肢直前の質問文だけを表示
    function showQuestionPrompt(questionLine) {
        speakerName.innerText = questionLine.speaker;
        dialogueText.innerText = processText(questionLine.text);
        nextIndicator.style.display = 'block'; // まだクリックで進行するのでインジケーターを残す
        updateCharacterSprite(questionLine);
    }

    // 選択肢ボタンを表示
    function showChoices(choices) {
        showingQuestion = true;
        nextIndicator.style.display = 'none';

        // 選択肢ボタンの生成
        choicesContainer.innerHTML = '';
        choicesContainer.classList.remove('hidden');

        // 選択肢の順番をランダムにシャッフルする
        const shuffledChoices = [...choices].sort(() => Math.random() - 0.5);

        shuffledChoices.forEach(choice => {
            const btn = document.createElement('div');
            btn.className = 'choice-btn fade-in';
            btn.innerText = processText(choice.text);
            btn.addEventListener('click', () => handleChoiceSelect(choice));
            choicesContainer.appendChild(btn);
        });
    }

    // 選択肢を選んだ時の処理
    function handleChoiceSelect(choice) {
        choicesContainer.classList.add('hidden');

        // 選択肢にemotionが設定されていれば立ち絵をその話者（主人公＝勇斗想定）で更新する
        if (choice.emotion) {
            updateCharacterSprite({ speaker: "勇斗", emotion: choice.emotion });
        }

        if (choice.isCorrect) {
            // 正解の場合：親密度アップ＆成功ダイアログへ
            updateIntimacy();
            playSuccessDialogues(choice.successDialogues);
        } else {
            // 失敗の場合：間違ったときの反応を表示
            speakerName.innerText = choice.failResponse.speaker;
            dialogueText.innerText = processText(choice.failResponse.text);
            updateCharacterSprite(choice.failResponse);

            // 失敗のテキストを3秒見せた後、ブラックアウトして直前のセリフからやり直す
            setTimeout(() => {
                blackoutScreen.classList.remove('hidden');
                // DOMへの反映を待ってからactiveクラスを付与し、暗転アニメーションを開始
                requestAnimationFrame(() => {
                    blackoutScreen.classList.add('active');
                });

                // 画面が完全に暗くなったタイミング（1秒後）で裏のUIを戻す
                setTimeout(() => {
                    const scene = GAME_STORY_DATA[currentSceneIndex];

                    // 「一個前のセリフ」＝scene.question に戻す
                    showingQuestionPrompt = true;
                    showQuestionPrompt(scene.question);
                    showingQuestion = false; // 選択肢自体はいったん隠す

                    // 暗転解除（フェードインで元に戻る）
                    blackoutScreen.classList.remove('active');
                    setTimeout(() => {
                        blackoutScreen.classList.add('hidden');
                    }, 1000); // fade in 完了後
                }, 1000);

            }, 3000); // 3秒間失敗テキストを読ませる
        }
    }

    // 親密度のUI更新
    function updateIntimacyUI() {
        intimacyFill.style.width = `${Math.min(intimacyScore, 100)}%`;
        intimacyText.innerText = `親密度: ${Math.floor(intimacyScore)}%`;

        // 恋人状態の場合はピンク色を濃くする演出を追加
        if (isLovers) {
            intimacyFill.classList.add('lovers-pink');
        }
    }

    // 選択肢正解時の親密度更新
    function updateIntimacy() {
        if (!isLovers) {
            // 付き合う前は均等割り当て
            const increase = 100 / 6;
            intimacyScore += increase;
            if (intimacyScore > 100) intimacyScore = 100;
        }
        updateIntimacyUI();
    }

    // 成功後のダイアログ処理
    function playSuccessDialogues(dialogues) {
        let i = 0;
        showingQuestion = false; // クリックで進めるようにする
        isPlayingSuccessSequence = true; // メインリスナーをブロック

        function showNext() {
            if (i < dialogues.length) {
                showDialogueLine(dialogues[i]);
                i++;
                // 一時的にクリックイベントを上書きして独自のダイアログ進行を行う
                dialogueBox.onclick = (e) => {
                    e.stopImmediatePropagation(); // メインリスナーの誤爆を完全に防ぐ
                    showNext();
                };
            } else {
                // 成功ダイアログ終了 -> 次のシーンへ
                dialogueBox.onclick = null; // リストア
                endSceneAndProceed();
            }
        }
        showNext();
    }

    // シーン終了時の処理
    function endSceneAndProceed() {
        const scene = GAME_STORY_DATA[currentSceneIndex];

        // 「まとめの一枚」画像(transitionImage または summaryImage)が設定されていれば表示してクリックを待つ
        const summaryImg = scene.transitionImage || scene.summaryImage;

        if (summaryImg) {
            showSummaryImage(summaryImg, () => {
                nextScene();
            });
        } else {
            nextScene();
        }
    }

    // まとめの一枚絵を表示する
    function showSummaryImage(imageUrl, callback) {
        const transitionScreen = document.getElementById('transition-screen');
        const transitionTitle = document.getElementById('transition-title');
        const uiTop = document.getElementById('ui-top');

        // UIを隠す
        dialogueContainer.classList.add('hidden');
        characterSprite.classList.add('sprite-hidden');
        uiTop.classList.add('hidden');

        // アイキャッチ用の文字は消す
        transitionTitle.innerText = "";

        // まとめ画像をセット。写真の全体が見えるようにcontainを使用
        transitionScreen.style.backgroundImage = `url('${imageUrl}')`;
        transitionScreen.style.backgroundColor = 'black'; // 隙間を黒で埋める
        transitionScreen.style.backgroundBlendMode = 'normal';
        transitionScreen.style.backgroundSize = 'contain';
        transitionScreen.style.backgroundRepeat = 'no-repeat';

        // クリックで次へ進むイベント
        const clickHandler = () => {
            transitionScreen.removeEventListener('click', clickHandler);
            transitionScreen.classList.remove('active');

            setTimeout(() => {
                transitionScreen.classList.add('hidden');
                uiTop.classList.remove('hidden');
                dialogueContainer.classList.remove('hidden');
                callback();
            }, 500); // 0.5秒でフェードアウトして次へ
        };

        // 誤爆クリックを防ぐため少しだけ遅らせてイベントを貼る
        setTimeout(() => {
            transitionScreen.addEventListener('click', clickHandler);
        }, 100);

        transitionScreen.classList.remove('hidden');
        requestAnimationFrame(() => {
            transitionScreen.classList.add('active');
        });
    }

    function nextScene() {
        currentSceneIndex++;
        setTimeout(() => {
            isPlayingSuccessSequence = false;

            if (currentSceneIndex >= GAME_STORY_DATA.length) {
                showEndScreen();
            } else {
                loadScene();
            }
        }, 100);
    }

    function showEndScreen() {
        dialogueContainer.classList.add('hidden');
        screenCover.innerHTML = '<div style="transform: translateY(-80px); text-align: center;"><h1 class="main-title">To be continued...</h1><p class="subtitle">これからも二人の物語は続く…</p></div>';
        // エンディング時も背景画像を維持するため、色だけリセット
        screenCover.style.backgroundColor = 'rgba(0,0,0,0.85)';
        screenCover.style.backgroundBlendMode = 'normal';
        screenCover.classList.remove('fade-out');
        characterSprite.classList.add('hidden');
        characterPlaceholder.classList.add('hidden');
    }
});
