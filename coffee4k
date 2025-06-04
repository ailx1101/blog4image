function decrypt_AES(word) {
  word = word.replace(/\s+/g, '');
  var key = CryptoJS.enc.Utf8.parse('qwertyuiopqwerty');
  var iv = key;
  return CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
}

globalThis.decrypt_AES = decrypt_AES;
let homeList = []
globalThis.homeList = homeList;
var rule = {
  host: "http://160.202.243.62:2566", // https://cdn-tupic-duofun-neimenggu.56uxi.com/1.txt
  homeUrl: "/api.php/qijiappapi.index/initV120",
  detailUrl: "/api.php/qijiappapi.index/vodDetail2",
  searchUrl: "/api.php/qijiappapi.index/searchList",
  searchable: 0, // 是否启用全局搜索,
  quickSearch: 1, // 是否启用快速搜索,
  filterable: 0, // 是否启用筛选,
  class_name: "电影&电视剧&动漫&综艺&短剧&臻享视界",
  class_url: "40&4&39&38&44&35",
  headers: {
    "User-Agent": "okhttp/3.10.0",
    "Content-Type":"application/x-www-form-urlencoded"
  },
  play_parse: true, // 服务器解析播放
  推荐: $js.toString(() => {
    let res = request(MY_URL)
    let homeData = dealJson(res)
    let json = dealJson(decrypt_AES(homeData.data))
    let d = []
    for (let data of json.type_list) {
      for (let it of data.recommend_list) {
        d.push({
          title: it.vod_name,//标题
          pic_url: it.vod_pic,//图片
          desc: it.vod_remarks,//描述
          url: it.vod_id,//链接
        });
      }
    }
    setResult(d)
  }),
  搜索: $js.toString(() => {
    let res = post(MY_URL, {
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body:{
        type_id:0,
        keywords:KEY,
        page:MY_PAGE,
      }
    })
    log(res)
    let data = dealJson(res)
    let json = dealJson(decrypt_AES(data.data))
    let arr = json.search_list
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
    let res = post(MY_URL,{
       headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body:{
        vod_id:231,
      }
    })
    
    let data = dealJson(res)
    let json = dealJson(decrypt_AES(data.data))

    let d = json.vod
    let play_url_list = json.vod_play_list
    let play_from = []
    let play_urls = []
    for (let play_url of play_url_list) {
      play_from.push(play_url.player_info.show)
      let urls = play_url.urls
      let p1 = []
      urls.forEach(url => {
        p1.push(url.name + '$' + url.parse_api_url)
      })  
      play_urls.push(p1)
    }

    let p = []
    for (let urls of play_urls) {
      p.push(urls.join('#'))
    }

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
}
