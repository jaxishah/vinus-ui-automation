const loginPopup = "javascript:openPopup('login');";
export const MENU_CONFIG = {
    beforeLogin: [
        {
            name: '카지노',
            hasSubmenu: false,
            link: '/game-casino/casinos'
        },
        {
            name: '슬롯',
            hasSubmenu: false,
            link: '/game-casino/slots'
        },
        {
            name: '홀덤',
            hasSubmenu: false,
            link: '/game-casino/holdem'
        },
        {
            name: '미니 게임',
            hasSubmenu: true,
            link: '/game-mini/list',
            submenu: [
                { name: '해피 파워볼', link: loginPopup },
                { name: '파워사다리', link: loginPopup },
                { name: '해피 사다리', link: loginPopup },
                { name: '보글 파워볼', link: loginPopup },
                { name: '보글사다리', link: loginPopup },
                { name: 'EOS 3분파워볼', link: loginPopup },
                { name: 'EOS 5분파워볼', link: loginPopup },
                { name: '메가밀리언', link: loginPopup },
                { name: '애리조나파워볼', link: loginPopup },
                { name: '네임드 3분파워볼', link: loginPopup },
                { name: '네임드 5분파워볼', link: loginPopup},
                { name: '코인 3분사다리', link: loginPopup },
                { name: '코인 5분사다리', link: loginPopup},
                { name: '코인 3분파워볼', link: loginPopup },
                { name: '코인 5분파워볼', link: loginPopup },
                { name: 'PBG 파워볼', link: loginPopup },
                { name: '스피드키노', link: loginPopup},
                { name: '동행 키노사다리', link: loginPopup },
                { name: '에볼루션 파워볼3턴', link: loginPopup },
                { name: '에볼루션 파워볼5턴', link: loginPopup },
                { name: '두옌하 카지노', link: loginPopup },
                { name: '엔트리 파워볼', link: loginPopup },
                { name: '동행 파워볼', link: loginPopup },
                { name: '동행 파워사다리', link: loginPopup }
            ]
        },
        {
            name: '스포츠',
            hasSubmenu: true,
            link: 'javascript:void(0);',
            submenu: [
                { name: 'BT1 스포츠',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/bt1?plus=','sports','bt1')" },
                { name: 'BT1 스포츠 S+',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/bt1?plus=yes','sports','bt1splus')" },
                { name: '국내형 스포츠',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/multi?sport=&seq=league','sports','sports')" },
                { name: '유럽형 스포츠',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/europe?sport=&seq=league','sports','sports2')" },
                { name: '라이브 스포츠',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/live-sport?sport=&seq=time','sports','livesports')" }
            ]
        },
        {
            name: '아케이드',
            hasSubmenu: false,
            link: '/game-casino/arcades'
        },
        {
            name: '1:1문의',
            hasSubmenu: false,
            link: '/my-ask/list'
        },
        {
            name: '쿠폰내역',
            hasSubmenu: false,
            link: '/coupon/log',
            specialClass: 'point'
        },
        {
            name: '공지사항',
            hasSubmenu: true,
            link: '/notice/list',
            submenu: [
                { name: '공지사항', link: '/notice/list' },
                { name: '이벤트', link: '/event/list' },
                { name: '게시판', link: '/free-board/list' },
                { name: '출석체크', link: '/attendance/month' },
                { name: '자주 하는 질문', link: '/faq/list' }
            ]
        },
        {
            name: '이벤트',
            hasSubmenu: false,
            link: '/event/list'
        }
    ],
    afterLogin: [
        {
            name: '카지노',
            hasSubmenu: false,
            link: '/game-casino/casinos'
        },
        {
            name: '슬롯',
            hasSubmenu: false,
            link: '/game-casino/slots'
        },
        {
            name: '홀덤',
            hasSubmenu: false,
            link: '/game-casino/holdem'
        },
        {
            name: '미니 게임',
            hasSubmenu: true,
            link: '/game-mini/list',
            submenu: [
                { name: '해피 파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=happy-powerball','mini-game','happy-powerball')" },
                { name: '파워사다리', link: "javascript:openGameUrl('/game-mini/bet?name=power-ladder','mini-game','power-ladder')" },
                { name: '해피 사다리', link: "javascript:openGameUrl('/game-mini/bet?name=happy-ladder','mini-game','happy-ladder')" },
                { name: '보글 파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=boggle-powerball','mini-game','boggle-powerball')" },
                { name: '보글사다리', link: "javascript:openGameUrl('/game-mini/bet?name=boggle-ladder','mini-game','boggle-ladder')" },
                { name: 'EOS 3분파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=eos3-powerball','mini-game','eos3-powerball')" },
                { name: 'EOS 5분파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=eos-powerball','mini-game','eos-powerball')" },
                { name: '메가밀리언', link: "javascript:openGameUrl('/game-mini/bet?name=megamillion','mini-game','megamillion')" },
                { name: '애리조나파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=arizona','mini-game','arizona')" },
                { name: '네임드 3분파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=named3-powerball','mini-game','named3-powerball')" },
                { name: '네임드 5분파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=named5-powerball','mini-game','named5-powerball')" },
                { name: '코인 3분사다리', link: "javascript:openGameUrl('/game-mini/bet?name=ecoin3-ladder','mini-game','ecoin3-ladder')" },
                { name: '코인 5분사다리', link: "javascript:openGameUrl('/game-mini/bet?name=ecoin5-ladder','mini-game','ecoin5-ladder')" },
                { name: '코인 3분파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=ecoin3-powerball','mini-game','ecoin3-powerball')" },
                { name: '코인 5분파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=ecoin5-powerball','mini-game','ecoin5-powerball')" },
                { name: 'PBG 파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=pbg-powerball','mini-game','pbg-powerball')" },
                { name: '스피드키노', link: "javascript:openGameUrl('/game-mini/bet?name=keno-ball','mini-game','keno-ball')" },
                { name: '동행 키노사다리', link: "javascript:openGameUrl('/game-mini/bet?name=keno-ladder','mini-game','keno-ladder')" },
                { name: '에볼루션 파워볼3턴', link: "javascript:openGameUrl('/game-mini/bet?name=evo3-powerball','mini-game','evo3-powerball')" },
                { name: '에볼루션 파워볼5턴', link: "javascript:openGameUrl('/game-mini/bet?name=evo5-powerball','mini-game','evo5-powerball')" },
                { name: '두옌하 카지노', link: "javascript:openGameUrl('/game-mini/bet?name=baccarat','mini-game','baccarat')" },
                { name: '엔트리 파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=ntry-powerball','mini-game','ntry-powerball')" },
                { name: '동행 파워볼', link: "javascript:openGameUrl('/game-mini/bet?name=dh-ball','mini-game','dh-ball')" },
                { name: '동행 파워사다리', link: "javascript:openGameUrl('/game-mini/bet?name=dh-ladder','mini-game','dh-ladder')" }
            ]
        },
        {
            name: '스포츠',
            hasSubmenu: true,
            link: 'javascript:void(0);',
            submenu: [
                { name: 'BT1 스포츠',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/bt1?plus=','sports','bt1')" },
                { name: 'BT1 스포츠 S+',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/bt1?plus=yes','sports','bt1splus')" },
                { name: '국내형 스포츠',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/multi?sport=&seq=league','sports','sports')" },
                { name: '유럽형 스포츠',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/europe?sport=&seq=league','sports','sports2')" },
                { name: '라이브 스포츠',link: 'javascript:;' , onclick: "javascript:openGameUrl('/game-sports/live-sport?sport=&seq=time','sports','livesports')" }
            ]
        },
        {
            name: '아케이드',
            hasSubmenu: false,
            link: '/game-casino/arcades'
        },
        {
            name: '배팅내역',
            hasSubmenu: true,
            link: '/game/bet-log',
            submenu: [
                { name: '스포츠', link: '/game/bet-log?name=sports' },
                { name: '해피 파워볼', link: '/game/bet-log?name=happy-powerball' },
                { name: '파워사다리', link: '/game/bet-log?name=power-ladder' },
                { name: '해피 사다리', link: '/game/bet-log?name=happy-ladder' },
                { name: '보글 파워볼', link: '/game/bet-log?name=boggle-powerball' },
                { name: '보글사다리', link: '/game/bet-log?name=boggle-ladder' },
                { name: 'EOS 3분파워볼', link: '/game/bet-log?name=eos3-powerball' },
                { name: 'EOS 5분파워볼', link: '/game/bet-log?name=eos-powerball' },
                { name: '메가밀리언', link: '/game/bet-log?name=megamillion' },
                { name: '애리조나파워볼', link: '/game/bet-log?name=arizona' },
                { name: '네임드 3분파워볼', link: '/game/bet-log?name=named3-powerball' },
                { name: '네임드 5분파워볼', link: '/game/bet-log?name=named5-powerball' },
                { name: '코인 3분사다리', link: '/game/bet-log?name=ecoin3-ladder' },
                { name: '코인 5분사다리', link: '/game/bet-log?name=ecoin5-ladder' },
                { name: '코인 3분파워볼', link: '/game/bet-log?name=ecoin3-powerball' },
                { name: '코인 5분파워볼', link: '/game/bet-log?name=ecoin5-powerball' },
                { name: 'PBG 파워볼', link: '/game/bet-log?name=pbg-powerball' },
                { name: '스피드키노', link: '/game/bet-log?name=keno-ball' },
                { name: '동행 키노사다리', link: '/game/bet-log?name=keno-ladder' },
                { name: '에볼루션 파워볼3턴', link: '/game/bet-log?name=evo3-powerball' },
                { name: '에볼루션 파워볼5턴', link: '/game/bet-log?name=evo5-powerball' },
                { name: '두옌하 카지노', link: '/game/bet-log?name=baccarat' },
                { name: '엔트리 파워볼', link: '/game/bet-log?name=ntry-powerball' },
                { name: '동행 파워볼', link: '/game/bet-log?name=dh-ball' },
                { name: '동행 파워사다리', link: '/game/bet-log?name=dh-ladder' }
            ]
        },
        {
            name: '게임결과',
            hasSubmenu: true,
            link: 'javascript:void(0);',
            submenu: [
                { name: '스포츠', link: '/game/result?name=sports' },
                { name: '해피 파워볼', link: '/game/result?name=happy-powerball' },
                { name: '파워사다리', link: '/game/result?name=power-ladder' },
                { name: '해피 사다리', link: '/game/result?name=happy-ladder' },
                { name: '보글 파워볼', link: '/game/result?name=boggle-powerball' },
                { name: '보글사다리', link: '/game/result?name=boggle-ladder' },
                { name: 'EOS 3분파워볼', link: '/game/result?name=eos3-powerball' },
                { name: 'EOS 5분파워볼', link: '/game/result?name=eos-powerball' },
                { name: '메가밀리언', link: '/game/result?name=megamillion' },
                { name: '애리조나파워볼', link: '/game/result?name=arizona' },
                { name: '네임드 3분파워볼', link: '/game/result?name=named3-powerball' },
                { name: '네임드 5분파워볼', link: '/game/result?name=named5-powerball' },
                { name: '코인 3분사다리', link: '/game/result?name=ecoin3-ladder' },
                { name: '코인 5분사다리', link: '/game/result?name=ecoin5-ladder' },
                { name: '코인 3분파워볼', link: '/game/result?name=ecoin3-powerball' },
                { name: '코인 5분파워볼', link: '/game/result?name=ecoin5-powerball' },
                { name: 'PBG 파워볼', link: '/game/result?name=pbg-powerball' },
                { name: '스피드키노', link: '/game/result?name=keno-ball' },
                { name: '동행 키노사다리', link: '/game/result?name=keno-ladder' },
                { name: '에볼루션 파워볼3턴', link: '/game/result?name=evo3-powerball' },
                { name: '에볼루션 파워볼5턴', link: '/game/result?name=evo5-powerball' },
                { name: '두옌하 카지노', link: '/game/result?name=baccarat' },
                { name: '엔트리 파워볼', link: '/game/result?name=ntry-powerball' },
                { name: '동행 파워볼', link: '/game/result?name=dh-ball' },
                { name: '동행 파워사다리', link: '/game/result?name=dh-ladder' }
            ]
        },
        {
            name: '충전하기',
            hasSubmenu: false,
            link: '/money/charge'
        },
        {
            name: '환전하기',
            hasSubmenu: false,
            link: '/money/exchange'
        },
        {
            name: '1:1문의',
            hasSubmenu: false,
            link: '/my-ask/list'
        },
        {
            name: '쿠폰내역',
            hasSubmenu: false,
            link: '/coupon/log',
            specialClass: 'point'
        },
        {
            name: '공지사항',
            hasSubmenu: true,
            link: '/notice/list',
            submenu: [
                { name: '공지사항', link: '/notice/list' },
                { name: '이벤트', link: '/event/list' },
                { name: '게시판', link: '/free-board/list' },
                { name: '출석체크', link: '/attendance/month' },
                { name: '자주 하는 질문', link: '/faq/list' }
            ]
        }
    ]
}