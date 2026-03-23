// ユーザーが自分でテキストや画像を編集しやすいように分離されたデータです
// ※画像ファイル（背景、キャラ）は、assets/images/内にご自身の画像を配置して、パスを変更することで自由に差し替えられます！

const CHARACTER_NAMES = {
    heroine: "文花",
    hero: "勇斗", // プレイヤー自身
    hero_calling_heroine_before: "文花さん",
    hero_calling_heroine_after: "文花"
};

// ゲーム全体の基本設定
const GAME_CONFIG = {
    // スタート画面の背景画像をここで設定（空文字で真っ黒になります）
    titleBackground: "assets/images/disneyland.jpeg"
};

const GAME_STORY_DATA = [
    {
        id: "scene1_restaurant",
        title: "バイト先（紅〇餃子房）",
        background: "assets/images/benitora.jpg",
        dialogues: [
            { speaker: "文花", text: "あ、こんにちは…", emotion: "normal" },
            { speaker: "勇斗 (自分)", text: "こんにちは…！（初めて見る子だ！まだ紅〇にも一緒になったことない人いたんだ！AIU生って言ってたけど、かわいかったな…）", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "初めまして！榎木勇斗と申します！", emotion: "normal" },
            { speaker: "文花", text: "初めまして！加藤文花です！", emotion: "normal2" }
        ],
        question: { speaker: "文花", text: "みんなからはふーやんって呼ばれてます！", emotion: "normal2" },
        choices: [
            {
                text: "ふーやん！？面白い呼び名だね！…でも俺は文花さんって呼ぼうかな！", emotion: "happy",
                isCorrect: true,
                successDialogues: [
                    { speaker: "文花", text: "本当ですか！？そしたら私は勇斗さんって呼んでいいですか！", emotion: "happy2" }
                ]
            },
            {
                text: "ふーやん！いいね俺もふーやんって呼ばせてもらお～",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "ふーん", emotion: "sad" }
            },
            {
                text: "ふーやん！…それめっちゃいいやーん",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "………", emotion: "sad" }
            }
        ]
    },
    {
        id: "scene2_bus",
        title: "帰りのバスの中",
        background: "assets/images/bus.jpg",
        dialogues: [
            { speaker: "文花", text: "勇斗さんと一緒になれてよかったです！", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "俺も文花さんと今日一緒になれてよかったよ！また何か留学先のことでもなんでも聞きたいことあったらいつでも言ってね！", emotion: "happy" },
            { speaker: "文花", text: "はい…", emotion: "mu" }
        ],
        question: { speaker: "文花", text: "あの…もしよかったら、今度一緒にご飯でも行きませんか？", emotion: "normal3" },
        choices: [
            {
                text: "えほんと！ぜひぜひ～（まさかほんとに誘ってくれるなんて！嬉しい！）", emotion: "happy",
                isCorrect: true,
                successDialogues: [
                    { speaker: "文花", text: "えっ、本当ですか！？（やったーーー！）", emotion: "happy2" }
                ]
            },
            {
                text: "えほんと！他誰誘う？（まあさすがに二人じゃないほうがいいよな）", emotion: "sad",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "えっ、うーん…", emotion: "sad" }
            },
            {
                text: "…zzz",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "あれ、寝てる…この短時間で人って寝れるの？？？", emotion: "sad" }
            }
        ]
    },
    {
        id: "scene3_akakara",
        title: "赤から鍋屋",
        background: "assets/images/akakara.jpg",
        dialogues: [
            { speaker: "文花", text: "うわー、赤から鍋最高ですね！辛さもちょうどいいし。", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "美味しいね。{heroine_name}、辛いのも結構いけるんだね！", emotion: "happy" }
        ],
        question: { speaker: "文花", text: "あ、そういえば…先輩って彼女とかいらっしゃるんですか？", emotion: "mu" },
        choices: [
            {
                text: "（どきっ…これってもしかして）…残念ながら彼女はいないんだ～", emotion: "shy",
                isCorrect: true,
                successDialogues: [
                    { speaker: "文花", text: "へぇーいないんですねー…", emotion: "happy2" },
                    { speaker: "文花,勇斗", text: "（ドキドキ）", emotion: "shy" }
                ]
            },
            {
                text: "そ、それは秘密かな～",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "えー（まあでも彼女さんいそうだなー）", emotion: "mu" }
            },
            {
                text: "…どう思う？ふふふ",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "（ちとめんどいな）えーなんですかそれ～", emotion: "mu" }
            }
        ]
    },
    {
        id: "scene4_crepe",
        title: "帰りのクレープ屋",
        background: "assets/images/crepe.jpeg",
        dialogues: [
            { speaker: "文花", text: "いやー赤からおいしかったですね！…って目の前にクレープ屋が！", emotion: "happy" }
        ],
        question: { speaker: "文花", text: "私クレープ大好きなんですよね…（ジー）", emotion: "normal3" },
        choices: [
            {
                text: "…買ってあげよっか？",
                isCorrect: true,
                successDialogues: [
                    { speaker: "文花", text: "…いいんですか？…お願いしたいです！", emotion: "happy2" },
                    { speaker: "勇斗 (自分)", text: "うん！いいよ～（文花さんが喜んでくれるなら全然安いもんだ）", emotion: "happy" },
                    { speaker: "文花", text: "…ありがとうございます！う～んおいしいです！", emotion: "happy2" },
                    { speaker: "文花", text: "…一口食べますか？", emotion: "normal3" },
                    { speaker: "勇斗 (自分)", text: "あ、えっと…大丈夫…（いや正直めっちゃ食べたいけどなんかひよっていらないって言っちゃった(´；ω；`)ｳｯ…）", emotion: "sad" },
                ]
            },
            {
                text: "おいしそうだけど、もうお腹いっぱいだね",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "そうですね。帰りましょう", emotion: "sad" }
            },
            {
                text: "クレープってカロリー高そうだよね",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "…まあスイーツは別腹ってやつですよ！", emotion: "sad" }
            }
        ]
    },
    {
        id: "scene5_car",
        title: "帰りの車の中",
        background: "assets/images/car.jpg",
        dialogues: [
            { speaker: "文花", text: "今日はありがとうございました！すっごく楽しかったです！", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "こちらこそ。運転してくれてありがとう！俺もすごい楽しかったよ。", emotion: "happy" }
        ],
        question: { speaker: "文花", text: "あの、先輩。もしよかったらまたご飯ご一緒できませんか？", emotion: "mu" },
        choices: [
            {
                text: "！！！文花さんがいいならもちろん！（…嬉しすぎる）",
                isCorrect: true,
                successDialogues: [
                    { speaker: "文花", text: "本当ですか！やった！来週空けておきますね！", emotion: "happy" }
                ]
            },
            {
                text: "もしかしてリトアニアのこともっと聞きたい感じ？それなら俺同期につなげられるよ～",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "それもそうなんですけど、そういうことじゃないです！", emotion: "sad" }
            },
            {
                text: "…zzz",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "え？また寝てる…普通にどうなってるの？", emotion: "sad" }
            }
        ]
    },
    {
        id: "scene6_ramen",
        title: "ラーメン屋",
        background: "assets/images/ramen.jpg",
        dialogues: [
            { speaker: "文花", text: "ここの油そば、最高ですね！", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "気に入ってもらえたならよかった", emotion: "happy" }
        ],
        question: { speaker: "勇斗 (自分)", text: "（今までの二回のデートで文花さんのことどんどん気になってる！どっちも文花さんから誘ってもらえてるし次は俺から誘わなければ…）", emotion: "serious" },
        choices: [
            {
                text: "文花さん今度一緒に映画でも見ない？映画館でも俺の部屋でも",
                isCorrect: true,
                successDialogues: [
                    { speaker: "文花", text: "はい！行きたいです！とても！（嬉しそうに頷く）", emotion: "happy2" },
                    { speaker: "勇斗 (自分)", text: "（…！…）…やった！（すごい食い気味で誘いに乗ってくれた！嬉しい！）", emotion: "happy" }
                ]
            },
            {
                text: "（…いやでももう卒業しちゃうからな…）また友達とでも来て他の味も試してみてよ！",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "…そうします！", emotion: "sad" }
            },
            {
                text: "（…いやでもさすがに留学の話とかを聞きたかっただけだもんな）聞きたいことは聞けたかな？",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "…はい！（ほんとはもっと勇斗さんのことも聞きたかったな）", emotion: "sad" }
            }
        ]
    },
    {
        id: "scene7_room",
        title: "勇斗の部屋",
        background: "assets/images/room.png",
        transitionImage: "assets/images/1.jpeg",
        dialogues: [
            { speaker: "文花", text: "映画、結局全然見てないですね（笑）。ずっとお話ししちゃって。", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "ほんとだね（笑）。でも、すごく楽しかった。", emotion: "happy" },
            { speaker: "文花", text: "……あの、", emotion: "mu" }
        ],
        question: { speaker: "勇斗 (自分)", text: "（よし…今ここで思い切って伝えよう）", emotion: "shy" },
        choices: [
            {
                text: "「{heroine_name}は今好きな人っている？」",
                isCorrect: true,
                successDialogues: [
                    { speaker: "文花", text: "…！……はい！", emotion: "mu" },
                    { speaker: "勇斗 (自分)", text: "…それって俺が知ってる人かな？", emotion: "happy" },
                    { speaker: "文花", text: "……うん………", emotion: "mu" },
                    { speaker: "勇斗 (自分)", text: "…それって…俺かな？俺、文花さんのことが好きなんだ", emotion: "serious" },
                    { speaker: "文花", text: "…！！！……とてもうれしいです！", emotion: "happy" },
                    { speaker: "文花", text: "…でも留学が控えていて遠距離正直自信ないです…", emotion: "sad" },
                    { speaker: "勇斗", text: "そ、そしたら留学が終わった後でも…", emotion: "sad" },
                    { speaker: "文花", text: "えーそうなっちゃうんですか…？", emotion: "sad" },
                    { speaker: "勇斗", text: "…ごめん。撤回させてほしい。俺が責任取るから。離れていても絶対に大切にする。だから、付き合ってほしい。", emotion: "serious" },
                    { speaker: "文花", text: "…はい！よろしくお願いします！", emotion: "happy" }
                ]
            },
            {
                text: "「お茶、おかわりいる？」",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "あ、いえ、大丈夫です…。あの、実は私から少し話したいことがあって…" }
            },
            {
                text: "「今日はいい天気ですね」",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "えっ、あっ、そうですね…？" }
            }
        ]
    },
    // ---- 以下は恋人になった後のデート（名前の呼び方が変わる） ----
    {
        id: "scene8_America",
        title: "アメリカ留学",
        background: "assets/images/america.jpg",
        transitionImage: "assets/images/2.jpeg",
        dialogues: [
            { speaker: "勇斗 (自分)", text: "付き合って早速遠距離さみしいな…", emotion: "sad" },
            { speaker: "文花", text: "でも、来る遠距離の予行練習として前向きにとらえるのだ！", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "そうだね！それに毎日電話もできて寂しくないどころか力が湧いてくる…うおーー！", emotion: "happy" },
            { speaker: "文花", text: "私もダンス公演思いっきり楽しんでくるね！", emotion: "happy" }
        ]
    },
    {
        id: "scene9_birthday",
        title: "勇斗の誕生日…初めての夜",
        background: "assets/images/birthday.jpeg",
        transitionImage: "assets/images/3.jpeg",
        dialogues: [
            { speaker: "文花", text: "勇斗さん、お誕生日おめでとうございます！", emotion: "birthday" },
            { speaker: "勇斗 (自分)", text: "ありがとう。こうやってお祝いしてもらうの初めてで、すっごく嬉しいよ。", emotion: "happy" },
            { speaker: "文花", text: "…私勇斗さんとこうやってずっと一緒にいたいです。", emotion: "birthday" },
            { speaker: "勇斗 (自分)", text: "……！俺も同じ気持ちだよ" },
            { speaker: "文花", text: "私、勇斗さんが望むならなんでもあげます", emotion: "birthday" },
            { speaker: "勇斗 (自分)", text: "…ほんとうに？ありがとう。絶対に悲しませないよ！文花愛してる。", emotion: "serious" },
            { speaker: "文花", text: "はい…。私も、世界で一番愛してます…！", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "（そっと唇を重ね合い、お互いの体温を確かめ合うように強く抱きしめ合った。少しの緊張と、抑えきれない高揚感が、次第に深い幸福感へと溶けていく…byチャッピー）", emotion: "happy2" }
        ]
    },
    {
        id: "scene10_disney",
        title: "東京ディズニーランド",
        background: "assets/images/disneyland.jpg",
        transitionImage: "assets/images/4.jpeg",
        dialogues: [
            { speaker: "文花", text: "あいにくの雨だけど、逆にいい感じだね", emotion: "disney" },
            { speaker: "勇斗 (自分)", text: "そうだね。待ち時間が長くてもずっと話してられるし、傘に隠れてこうやって…", emotion: "happy" },
            { speaker: "文花", text: "！！！…勇斗さんったらもう///", emotion: "disney" }
        ]
    },
    {
        id: "scene11_Kawasaki",
        title: "川崎",
        background: "assets/images/kawasaki.jpg",
        transitionImage: "assets/images/5.jpeg",
        dialogues: [
            { speaker: "文花", text: "勇斗さんの聖地に来たーーー！", emotion: "happy2" },
            { speaker: "勇斗 (自分)", text: "ようこそ文花！きてくれてありがとう～", emotion: "happy" },
            { speaker: "文花", text: "勇斗さんを生み出した川崎…ナイス！！！", emotion: "happy" }
        ]
    },
    {
        id: "scene12_domecity",
        title: "東京ドームシティ",
        background: "assets/images/domecity.jpg",
        transitionImage: "assets/images/6.jpeg",
        dialogues: [
            { speaker: "文花", text: "いつも投稿するときに眺めてたホテルに来れるなんて…", emotion: "happy2" },
            { speaker: "勇斗 (自分)", text: "文花の夢をかなえられて嬉しいよ！", emotion: "happy" },
            { speaker: "文花", text: "勇斗さんいつもありがとう！…大好き///", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "文花…大好きだーーー！とりゃーーー！", emotion: "happy" }
        ]
    },
    {
        id: "scene13_kashiwa",
        title: "柏での成人式",
        background: "assets/images/kashiwa.jpg",
        transitionImage: "assets/images/7.jpeg",
        dialogues: [
            { speaker: "文花", text: "……。", emotion: "seijin" },
            { speaker: "文花", text: "どうですか？私の振袖姿。おかしくないですか？", emotion: "seijin" }
        ],
        question: { speaker: "勇斗 (自分)", text: "（あまりの美しさに、言葉を失ってしまった…）", emotion: "serious" },
        choices: [
            {
                text: "あまりにも綺麗すぎて、見とれてた。世界で一番可愛いよ。",
                isCorrect: true,
                successDialogues: [
                    { speaker: "文花", text: "ふふっ、ありがとうございます。先輩のスーツ姿もすごくかっこいいですよ。", emotion: "seijin" },
                    { speaker: "勇斗 (自分)", text: "俺たち、これからもずっと一緒に歩んでいこうね。", emotion: "happy" },
                    { speaker: "文花", text: "はい！ずっとずっと、傍においてくださいね！", emotion: "seijin" }
                ]
            },
            {
                text: "まあまあ似合ってるじゃん",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "まあまあ！？もっと可愛いって言ってくれると思ってたのに！", emotion: "sad" }
            },
            {
                text: "（照れて黙り込む）",
                isCorrect: false,
                failResponse: { speaker: "文花", text: "もう、ちゃんと感想言ってください！綺麗ですか？", emotion: "mu" }
            }
        ]
    },
    {
        id: "scene14_takasaki",
        title: "高崎",
        background: "assets/images/harappa.jpg",
        transitionImage: "assets/images/8.jpeg",
        dialogues: [
            { speaker: "文花", text: "高崎パスタ、めっちゃボリュームありますね（笑）", emotion: "happy" },
            { speaker: "文花", text: "美味しいけど、少し食べきれないかも…", emotion: "sad" },
            { speaker: "勇斗 (自分)", text: "俺が食べるよ。ほら、あーんして？" },
            { speaker: "文花", text: "（恥ずかしそうに）あ、あーん…！", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "あはは、可愛い。美味しいね、これ。" }
        ]
    },
    {
        id: "scene15_kawagoe",
        title: "川越・小江戸散策",
        background: "assets/images/kawagoe.jpg",
        transitionImage: "assets/images/9.jpeg",
        dialogues: [
            { speaker: "勇斗 (自分)", text: "昔の町並み見ながら食べ歩きするの楽しいね～", emotion: "happy" },
            { speaker: "文花", text: "勇斗さん！私この牛乳飲みたいです！", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "牛乳！？（文花のチョイスは面白いな…ほんでかわいい///）", emotion: "happy" }
        ]
    },
    {
        id: "scene16_kaikatsu",
        title: "快活倶楽部",
        background: "assets/images/kaikatsu.jpg",
        transitionImage: "assets/images/10.jpeg",
        dialogues: [
            { speaker: "勇斗 (自分)", text: "あんまり惹かれる映画はないな…どうしようか…（チラッ）", emotion: "shy" },
            { speaker: "文花", text: "……", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "…ガバッ", emotion: "happy" }
        ]
    },
    {
        id: "scene17_lithuania",
        title: "リトアニア",
        background: "assets/images/lithuania.jpeg",
        transitionImage: "assets/images/11.webp",
        dialogues: [
            { speaker: "勇斗 (自分)", text: "ついに１年の留学が始まったね", emotion: "happy" },
            { speaker: "文花", text: "そうだね…でも私たちなら大丈夫", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "うん！毎日電話したいね。お互い忙しくなるだろうけど、１時間くらいできたらいいね", emotion: "happy" },
            { speaker: "文花", text: "そうだね！", emotion: "happy" },
            { speaker: "", text: "2か月後", isCutin: true },
            { speaker: "勇斗 (自分)", text: "文花～♡大好きだよ～♡んーーーまっ（投げキッス）", emotion: "happy" },
            { speaker: "文花", text: "キャ～～～♡私も～♡…って気づいたら今日もあっという間に二時間たってる！？", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "ほんとだ！ほんとにしゃべることに尽きないね～", emotion: "happy" },
            { speaker: "文花", text: "そうだね！私毎日この時間を楽しみに過ごしてるんだ", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "そかそか///嬉しいな～", emotion: "happy" },
            { speaker: "勇斗 (自分)", text: "ねぇ文花、これからもよろしくね！", emotion: "happy" },
            { speaker: "文花", text: "うん！こちらこそよろしく！", emotion: "happy" }
        ]
    }
];

function characterName(role) {
    if (role === "heroine") return CHARACTER_NAMES.heroine;
    if (role === "hero") return CHARACTER_NAMES.hero;
    return role;
}
