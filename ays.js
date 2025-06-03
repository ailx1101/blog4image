function decrypt_AES(word) {
    word = word.replace(/\s+/g, '');
    var key = CryptoJS.enc.Utf8.parse('1e765e9b09b4dbba');
    return CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
}

function getParse(tab) {
    log(tab)
    if (/NBY/.test(tab)) {
        return "Dcyk392F/OExhyRQ7LoF7dGhBfBbIcZTuPAFjuzJ1t4HXh1Y89US6LWNCWidU39ej8sVy6/TNsCoO3kXhUm4ew=="
    } else if (/xlys/.test(tab)) {
        return "WeoXJRf3ofamaDCtgk6tJq+8bLlBxyceFV9SygTqfsU2RAXg86RHKmTm5CVu2Btz"
    } else if (/BXP/.test(tab) || /BXD/.test(tab) || /BXY/.test(tab) || /BX/.test(tab)) {
        return "hBCBQudkg65wMViOcdch1YXhS8LHgMKu3tY+FfdNw8c5Ng3DE045q4/XFqDTu9V1eoTRugmuZf/IAOaep9JlVg=="
    } else if (/aybb/.test(tab)) {
        return "IV/HTZtG5jjpIHaJuIC5FZqTdEyGuXEtP/ir801EWOuJico1sAlnugeeBQb3B9J7"
    }
    else if (/RR/.test(tab)) {
        return "Be9b63PMD3D7LDeUEokpupOt661l91hYqCb0DK20GBCQM89IHMpoj/5lx5j4GXFh"
    } else if (/BXC/.test(tab) || /BXN/.test(tab)) {
        return "SSy7mDeZRmF6CbZh2bZ5gaC9yd2syRi+3QEkiSUV/YijI2ymTFE1gHlIYX1CTpGmi79fE0gLgssm6Xdr3ESZ6Q=="
    } else if (/youku/.test(tab) || /mgtv/.test(tab) || /qq/.test(tab) || /qiyi/.test(tab) || /bilibili/.test(tab)) {
        return "mfm4XDZwuWorF/SXmgxAaBGaUV+C3Pii8ImKJ2HDYf6wA1LxR/KyEcNPMTmudKekodVnsIO+au4IJU/T1ISk/Q=="
    }
    return "mfm4XDZwuWorF/SXmgxAaBGaUV+C3Pii8ImKJ2HDYf6wA1LxR/KyEcNPMTmudKekodVnsIO+au4IJU/T1ISk/Q=="

}

globalThis.decrypt_AES = decrypt_AES;
globalThis.getParse = getParse;
var rule = {
    host: "http://110.42.7.59:11822", // 网页的域名根, 包含http头如 https://www,baidu.com
    homeUrl: "/api.php/v1.home/data?type_id=20",
    url: "/api.php/v1.classify/content?page=fypage",
    detailUrl: "/api.php/v1.player/details?vod_id=fyid",
    searchUrl: "/api.php/v1.search/data?wd=**&type_id=fyclass&page=fypage",
    searchable: 0, // 是否启用全局搜索,
    quickSearch: 1, // 是否启用快速搜索,
    filterable: 0, // 是否启用筛选,
    class_name: "电影&电视剧&动漫&综艺&短剧&体育&少儿",
    class_url: "1&2&3&4&21&22&24", // 静态分类标识拼接, &分隔
    headers: {
        "User-Agent": "MOBILE_UA",
        'ua': "32e21d0ba2c2aa62770e4cfcafafa71dgIESLZJeAtWLh!@#$%^&*()_+-=[]{}|;:,.<>?xpa5158ae818ecc8b23766f534ecf9afd9"
    },
    play_parse: true, // 服务器解析播放
    推荐: $js.toString(() => {
        let res = request(MY_URL)
        let homeData = dealJson(decrypt_AES(res))
        let json = dealJson(homeData.data)
        let d = []
        let arr = []
        for (let data of json.verLandList) {
            for (let data1 of data.vertical_lands) {
                arr.push(data1)
            }
        }
        arr.forEach(it => {
            d.push({
                title: it.vod_name,//标题
                pic_url: it.vod_pic,//图片
                desc: it.vod_remarks,//描述
                url: it.vod_id,//链接
            });
        })
        setResult(d)
    }),
    一级: $js.toString(() => {
        let body = {
            "area": "全部地区",
            "lang": "全部语言",
            "rank": "最新",
            "type": "全部类型",
            "type_id": MY_CATE,
            "year": "全部年代"
        }
        let res = post(MY_URL, {
            body: body,
            headers: {
                'ua': "32e21d0ba2c2aa62770e4cfcafafa71d6PIb7fPkzvjktSef88be660ab96cbd11c5b270c7f796cb6e"
            }
        })
        let json = dealJson(decrypt_AES(res))
        let arr = json.data.video_list
        let d = []
        arr.forEach(it => {
            d.push({
                title: it.vod_name,//标题
                pic_url: it.vod_pic,//图片
                desc: it.vod_remarks,//描述
                url: it.vod_id,//链接
            });
        })
        setResult(d)
    }),
    搜索: $js.toString(() => {
        let res = request(MY_URL, {
            headers: {
                'ua': "32e21d0ba2c2aa62770e4cfcafafa71d6PIb7fPkzvjktSef88be660ab96cbd11c5b270c7f796cb6e"
            }
        })
        log(res)
        let json = dealJson(decrypt_AES(res))
        let arr = json.data.search_data
        let d = []
        arr.forEach(it => {
            d.push({
                title: it.vod_name,//标题
                pic_url: it.vod_pic,//图片
                desc: it.vod_remarks,//描述
                url: it.vod_id,//链接
            });
        })
        setResult(d)
    }),
    二级: $js.toString(() => {
        let res = request(MY_URL, {
            headers: {
                version: "1.5.0",
                ua: "32e21d0ba2c2aa62770e4cfcafafa71d4!@#$%^&*()_+-=[]{}|;:,.<>?!@#$%^&*()_+-=[]{}|;:,.<>?sqXRbbetm10Ez5db51226391d61c005238bd10a073e7e",
            }
        })
        let json = dealJson(decrypt_AES(res))
        let d = json.data.detail
        let play_url_list = d.play_url_list
        let play_from = []
        let play_urls = []
        for (let play_url of play_url_list) {
            play_from.push(play_url.show)
            let urls = play_url.urls
            let p1 = []
            urls.forEach(url => {
                p1.push(url.name + '$' + url.url)
            })
            play_urls.push(p1)
        }

        let p = []
        for (let urls of play_urls) {
            p.push(urls.join('#'))
        }
        //第1集$https://www.czvod.top/play/70831-1-1.html#第2集$https://www.czvod.top/play/70831-1-2.html$$$第1集$https://www.czvod.top/play/70831-1-1.html#第2集$https://www.czvod.top/play/70831-1-2.html
        VOD = {
            vod_name: d.vod_name,
            vod_pic: d.vod_pic,
            vod_actor: d.vod_actor,
            vod_content: d.vod_content,
            vod_score: d.vod_score,
            vod_year: d.vod_year,
            vod_remarks: d.vod_remarks,
            vod_class: d.vod_class,
            vod_play_url: p.join("$$$"),
            vod_play_from: play_from.join("$$$"),
        }
    }),
    lazy: $js.toString(() => {
        let url = HOST + '/shark/api.php?action=parsevod';
        let res = post(url, {
            headers: {
                "version": "1.5.0",
                "ua": "32e21d0ba2c2aa62770e4cfcafafa71d6PIb7fPkzvjktSefa45909c9faa9de55010623c097a69626",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: {
                parse: getParse(MY_URL),
                url: MY_URL
            }
        })
        let json = dealJson(decrypt_AES(res))
        log(json)
        if (/.(m3u8|mp4|m4a|mp3)/.test(json.url)) {
            input = {
                parse: 0,
                jx: 0,
                url: json.url,
            };
        } else {
            input;
        }
    })
}
