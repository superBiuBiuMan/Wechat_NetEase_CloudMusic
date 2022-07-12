import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //视频播放列表标签
    navList: [],
    //初始化显示的navtab项
    selectedId: "",
    //视频标签列表
    videoList: "",
    //当前播放的视频vid
    vid: "",
    //记录视频的播放位置,[{...},{...},{...}]
    videoUpdateTime: [],
    //是否下拉刷新了
    isRefresher: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取视频标签列表
    this.reqNavList();
  },

  //处理下拉刷新
  handleRefresh() {
    console.log("下拉刷新");
    this.reqVideoList(this.data.selectedId);
  },
  //处理上拉加载更多
  handleMore() {
    console.log("上拉加载更多");
    //请求数据 不过这里是假数据~
    let repeatData = [{
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_AD700DA249F2711E4E5B982F4CD2E532",
          "coverUrl": "https://p1.music.126.net/xjA_NjU3eiy0oVjebNJf-g==/109951163894397478.jpg",
          "height": 720,
          "width": 1280,
          "title": "当《极乐净土》遇上炮姐的经典，摩擦出不一样的火花",
          "description": null,
          "commentCount": 332,
          "shareCount": 357,
          "resolutions": [{
              "resolution": 240,
              "size": 25831256
            },
            {
              "resolution": 480,
              "size": 40143007
            },
            {
              "resolution": 720,
              "size": 53732682
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/kBJV7fuExIZCZlm77Y8pLA==/109951163359784378.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 110101,
            "birthday": -2209017600000,
            "userId": 1471157370,
            "userType": 0,
            "nickname": "金曲音乐厅",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163359784380,
            "backgroundImgId": 109951162868128400,
            "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "泛生活视频达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951162868128395",
            "avatarImgIdStr": "109951163359784378"
          },
          "urlInfo": null,
          "videoGroup": [{
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1101,
              "name": "舞蹈",
              "alg": null
            },
            {
              "id": 9102,
              "name": "演唱会",
              "alg": null
            },
            {
              "id": 60101,
              "name": "日语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 3110,
              "name": "宅舞",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_2343255924_5d4SeJrY.webp?wsSecret=3155af7de7f064faa9d4ca4e807b4b5f&wsTime=1657521172",
          "previewDurationms": 4000,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "AD700DA249F2711E4E5B982F4CD2E532",
          "durationms": 193957,
          "playTime": 958229,
          "praisedCount": 3500,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_70BA03D8B5BF371AB187D289A4672DFD",
          "coverUrl": "https://p1.music.126.net/1dpbQNNOsrulc0ooJR7U7w==/109951165360124809.jpg",
          "height": 720,
          "width": 1280,
          "title": "这才是真正的歌唱家! 腾格尔一首《天堂》引全场观众掌声不断！",
          "description": null,
          "commentCount": 990,
          "shareCount": 1911,
          "resolutions": [{
              "resolution": 240,
              "size": 22473410
            },
            {
              "resolution": 480,
              "size": 35358136
            },
            {
              "resolution": 720,
              "size": 48212822
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/-AM5QfYVSfsItPLTngJaEw==/109951163359806590.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 110101,
            "birthday": -2209017600000,
            "userId": 1471080915,
            "userType": 0,
            "nickname": "宇宙音乐榜",
            "signature": "致力于打造全球最权威的音乐榜",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163359806600,
            "backgroundImgId": 109951162868126480,
            "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "泛生活视频达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951162868126486",
            "avatarImgIdStr": "109951163359806590"
          },
          "urlInfo": null,
          "videoGroup": [{
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 15102,
              "name": "华语音乐",
              "alg": null
            },
            {
              "id": 16158,
              "name": "乡村",
              "alg": null
            }
          ],
          "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_1676596328_19IocLAJ.webp?wsSecret=69308a024fde8f4a6160c9fe08d8f788&wsTime=1657521172",
          "previewDurationms": 4000,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [{
            "name": "天堂",
            "id": 151200,
            "pst": 0,
            "t": 0,
            "ar": [{
              "id": 5198,
              "name": "腾格尔",
              "tns": [],
              "alias": []
            }],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "600902000007913837",
            "fee": 8,
            "v": 14,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 15238,
              "name": "跨越.新天堂(精华典藏版)",
              "picUrl": "http://p4.music.126.net/_2-mfxIGGnt5KJh4cE7qJQ==/745468883644326.jpg",
              "tns": [],
              "pic": 745468883644326
            },
            "dt": 460000,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 18421654,
              "vd": 12185
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 11053033,
              "vd": 14044
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 7368723,
              "vd": 12215
            },
            "a": null,
            "cd": "1",
            "no": 13,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 22019,
            "mv": 0,
            "publishTime": 1038672000000,
            "privilege": {
              "id": 151200,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 320000,
              "fl": 128000,
              "toast": false,
              "flag": 258,
              "preSell": false
            }
          }],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "70BA03D8B5BF371AB187D289A4672DFD",
          "durationms": 267494,
          "playTime": 771817,
          "praisedCount": 5288,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_4509B941D174FEE6F2D0697B750D3981",
          "coverUrl": "https://p1.music.126.net/jOsq55eQU8U4tCdwb6LZQw==/109951163725487329.jpg",
          "height": 1080,
          "width": 1920,
          "title": "没揭晓之前，你猜出来哪个是张宇了吗《都是月亮惹的祸》",
          "description": "",
          "commentCount": 1129,
          "shareCount": 1187,
          "resolutions": [{
              "resolution": 240,
              "size": 30503867
            },
            {
              "resolution": 480,
              "size": 52610766
            },
            {
              "resolution": 720,
              "size": 78781447
            },
            {
              "resolution": 1080,
              "size": 122889933
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 230000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/YaziwMop753r1ZlCaYFdkw==/109951163710128957.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 230100,
            "birthday": -2209017600000,
            "userId": 1683743264,
            "userType": 0,
            "nickname": "好歌曲goodmusic",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163710128960,
            "backgroundImgId": 109951162868126480,
            "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "视频达人(华语、音乐现场)"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951162868126486",
            "avatarImgIdStr": "109951163710128957"
          },
          "urlInfo": null,
          "videoGroup": [{
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 4101,
              "name": "娱乐",
              "alg": null
            },
            {
              "id": 3101,
              "name": "综艺",
              "alg": null
            },
            {
              "id": 76108,
              "name": "综艺片段",
              "alg": null
            },
            {
              "id": 77102,
              "name": "内地综艺",
              "alg": null
            }
          ],
          "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_2186661097_NSuhbK7A.webp?wsSecret=c973f32dd890e17749d6423458675cdf&wsTime=1657521172",
          "previewDurationms": 4000,
          "hasRelatedGameAd": false,
          "markTypes": [
            111
          ],
          "relateSong": [{
            "name": "月亮惹的祸",
            "id": 5243631,
            "pst": 0,
            "t": 0,
            "ar": [{
              "id": 6469,
              "name": "张宇",
              "tns": [],
              "alias": []
            }],
            "alia": [
              "无线电视剧《圆月弯刀》国语主题曲"
            ],
            "pop": 100,
            "st": 0,
            "rt": "600902000005653853",
            "fee": 8,
            "v": 899,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 511419,
              "name": "大人的情歌",
              "picUrl": "http://p4.music.126.net/3ZIdpAdQQEhuhFWKwhtNkg==/109951167038663312.jpg",
              "tns": [],
              "pic_str": "109951167038663312",
              "pic": 109951167038663310
            },
            "dt": 260773,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 10433350,
              "vd": -54298
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 6260027,
              "vd": -54298
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 4173366,
              "vd": -54298
            },
            "a": null,
            "cd": "1",
            "no": 9,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 1,
            "s_id": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 13009,
            "mv": 0,
            "publishTime": 1256832000000,
            "privilege": {
              "id": 5243631,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 256,
              "preSell": false
            }
          }],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "4509B941D174FEE6F2D0697B750D3981",
          "durationms": 241627,
          "playTime": 2640224,
          "praisedCount": 10438,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_5F164913752A45BDAD5A3A230DEEC8D7",
          "coverUrl": "https://p1.music.126.net/wztnWSfLg2ISCsfh0w0BJw==/109951163573497566.jpg",
          "height": 1080,
          "width": 1920,
          "title": "宇多田光《Beautiful World 》 EVA承载了太多的童年回忆",
          "description": "宇多田光《Beautiful World》，这首歌是为EVA剧场版《ヱヴァンゲリヲン新劇場版:序》(新世纪福音战士 剧场版：序)演唱的主题歌。凡事都要勇于尝试，即使受到挫折，也会从中吸取些经验。如果只能实现一个愿望，就让我在你身边沉睡，无论在何处。",
          "commentCount": 619,
          "shareCount": 1014,
          "resolutions": [{
              "resolution": 240,
              "size": 30288044
            },
            {
              "resolution": 480,
              "size": 55892294
            },
            {
              "resolution": 720,
              "size": 83569998
            },
            {
              "resolution": 1080,
              "size": 125612020
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 330000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/Vh15ofgGmgSGhqO5VoswOQ==/109951167235930856.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 330100,
            "birthday": 841507200000,
            "userId": 268678989,
            "userType": 200,
            "nickname": "随身音乐厅",
            "signature": "音乐的魅力，在于人的精神与音乐的共鸣。",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951167235930850,
            "backgroundImgId": 109951165395733630,
            "backgroundUrl": "http://p1.music.126.net/JoV68ORMXbVRqYMDNp28GA==/109951165395733633.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": [
              "华语"
            ],
            "experts": {
              "1": "音乐视频达人",
              "2": "生活图文达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "backgroundImgIdStr": "109951165395733633",
            "avatarImgIdStr": "109951167235930856"
          },
          "urlInfo": null,
          "videoGroup": [{
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 60101,
              "name": "日语现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 14194,
              "name": "励志",
              "alg": null
            }
          ],
          "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_1590509539_EOP9ExxM.webp?wsSecret=ea8ce366d83125b59069ec328a22f207&wsTime=1657521172",
          "previewDurationms": 4000,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [{
            "name": "Beautiful World",
            "id": 666443,
            "pst": 0,
            "t": 0,
            "ar": [{
              "id": 18122,
              "name": "宇多田ヒカル",
              "tns": [],
              "alias": []
            }],
            "alia": [
              "动画电影《新世纪福音战士新剧场版:序》片尾曲"
            ],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 1,
            "v": 34,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 64250,
              "name": "Beautiful World / Kiss & Cry",
              "picUrl": "http://p4.music.126.net/0dD1op9wHdWIdO6gk1OQlQ==/18298072510006687.jpg",
              "tns": [],
              "pic_str": "18298072510006687",
              "pic": 18298072510006690
            },
            "dt": 316040,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 12644353,
              "vd": -60232
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 7586629,
              "vd": -60232
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 5057767,
              "vd": -60232
            },
            "a": null,
            "cd": "1",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 1,
            "s_id": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 7003,
            "mv": 372346,
            "publishTime": 1188316800000,
            "privilege": {
              "id": 666443,
              "fee": 1,
              "payed": 0,
              "st": 0,
              "pl": 0,
              "dl": 0,
              "sp": 0,
              "cp": 0,
              "subp": 0,
              "cs": false,
              "maxbr": 999000,
              "fl": 0,
              "toast": false,
              "flag": 260,
              "preSell": false
            }
          }],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "5F164913752A45BDAD5A3A230DEEC8D7",
          "durationms": 339072,
          "playTime": 594565,
          "praisedCount": 3503,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_BC4401C606890CBE9708EDAB3351DA4D",
          "coverUrl": "https://p1.music.126.net/brhBgni41XEc16GRFNlfeA==/109951163973310747.jpg",
          "height": 720,
          "width": 1280,
          "title": "洪真英靠打糕舞火起来，你喜欢吗？",
          "description": "欢迎关注",
          "commentCount": 16,
          "shareCount": 14,
          "resolutions": [{
              "resolution": 240,
              "size": 10036605
            },
            {
              "resolution": 480,
              "size": 15120867
            },
            {
              "resolution": 720,
              "size": 21026748
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 450000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/03aZrxD2UYTWnn4xlN3OGg==/109951164330331719.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 450700,
            "birthday": -2209017600000,
            "userId": 1791858052,
            "userType": 0,
            "nickname": "热门好听音乐",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951164330331710,
            "backgroundImgId": 109951162868126480,
            "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951162868126486",
            "avatarImgIdStr": "109951164330331719"
          },
          "urlInfo": null,
          "videoGroup": [{
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1101,
              "name": "舞蹈",
              "alg": null
            },
            {
              "id": 57107,
              "name": "韩语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 57110,
              "name": "饭拍现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_2421204591_da2Yx3Ir.webp?wsSecret=be939d45662bf71db4a25eb97126c333&wsTime=1657521172",
          "previewDurationms": 4000,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "BC4401C606890CBE9708EDAB3351DA4D",
          "durationms": 78646,
          "playTime": 86686,
          "praisedCount": 118,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_22CE3C6E5BC2CCD57D57B380431EDEB5",
          "coverUrl": "https://p1.music.126.net/fAbtbgU-yV7qzn6SKvoXxg==/109951164300571921.jpg",
          "height": 1080,
          "width": 1920,
          "title": "霉霉现场开口脆直到不能自拔的神级现场",
          "description": "霉霉开口脆直到不能自拔的神级现场\nBack To December 现场",
          "commentCount": 260,
          "shareCount": 584,
          "resolutions": [{
              "resolution": 240,
              "size": 33529733
            },
            {
              "resolution": 480,
              "size": 54461193
            },
            {
              "resolution": 720,
              "size": 78090351
            },
            {
              "resolution": 1080,
              "size": 152459231
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 1000000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/VIn97149XgPVlhoK0ynlWg==/109951166123418792.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 1004400,
            "birthday": 966873600000,
            "userId": 337294427,
            "userType": 0,
            "nickname": "ins潮流音乐",
            "signature": "分享好看的音乐视频，欢迎关注！",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951166123418780,
            "backgroundImgId": 109951164173160200,
            "backgroundUrl": "http://p1.music.126.net/SzdIQPN7aEpSsebgtsofLw==/109951164173160187.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "backgroundImgIdStr": "109951164173160187",
            "avatarImgIdStr": "109951166123418792"
          },
          "urlInfo": null,
          "videoGroup": [{
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 12100,
              "name": "流行",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 64100,
              "name": "Taylor Swift",
              "alg": null
            },
            {
              "id": 13172,
              "name": "欧美",
              "alg": null
            },
            {
              "id": 14137,
              "name": "感动",
              "alg": null
            }
          ],
          "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_2643070591_PWhcvxza.webp?wsSecret=8e961fd7986bd879b00bd72859a6c8f6&wsTime=1657521172",
          "previewDurationms": 4000,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [{
            "name": "Back To December",
            "id": 19293014,
            "pst": 0,
            "t": 0,
            "ar": [{
              "id": 44266,
              "name": "Taylor Swift",
              "tns": [],
              "alias": []
            }],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "600902000008723946",
            "fee": 1,
            "v": 39,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 1770441,
              "name": "Back To December",
              "picUrl": "http://p3.music.126.net/1V5SEzMUWB25_j3R0lvfhw==/6668538023378075.jpg",
              "tns": [],
              "pic": 6668538023378075
            },
            "dt": 294000,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 11771919,
              "vd": -24700
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 7063191,
              "vd": -22300
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 4708827,
              "vd": -20700
            },
            "a": null,
            "cd": "1",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 7003,
            "mv": 32561,
            "publishTime": 1300550400000,
            "privilege": {
              "id": 19293014,
              "fee": 1,
              "payed": 0,
              "st": 0,
              "pl": 0,
              "dl": 0,
              "sp": 0,
              "cp": 1,
              "subp": 0,
              "cs": false,
              "maxbr": 320000,
              "fl": 0,
              "toast": false,
              "flag": 260,
              "preSell": false
            }
          }],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "22CE3C6E5BC2CCD57D57B380431EDEB5",
          "durationms": 348323,
          "playTime": 260595,
          "praisedCount": 3795,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_3E10978FB06564E4D59FFF816ACEA0C8",
          "coverUrl": "https://p1.music.126.net/p-HHDF4EIvPmx5pvRzBYeA==/109951163574052583.jpg",
          "height": 720,
          "width": 1280,
          "title": "日本天团组合现场演唱并翻跳《极乐净土》，舞姿惊艳台下观众",
          "description": null,
          "commentCount": 407,
          "shareCount": 244,
          "resolutions": [{
              "resolution": 240,
              "size": 28891318
            },
            {
              "resolution": 480,
              "size": 54046599
            },
            {
              "resolution": 720,
              "size": 71318649
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/kBJV7fuExIZCZlm77Y8pLA==/109951163359784378.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 110101,
            "birthday": -2209017600000,
            "userId": 1471157370,
            "userType": 0,
            "nickname": "金曲音乐厅",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163359784380,
            "backgroundImgId": 109951162868128400,
            "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "泛生活视频达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951162868128395",
            "avatarImgIdStr": "109951163359784378"
          },
          "urlInfo": null,
          "videoGroup": [{
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 60101,
              "name": "日语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_1821686304_HD54A3OG.webp?wsSecret=b5121bdb14054d1a1ef2a1f551d0ae9e&wsTime=1657521172",
          "previewDurationms": 4000,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [{
            "name": "極楽浄土",
            "id": 411907897,
            "pst": 0,
            "t": 0,
            "ar": [{
              "id": 19605,
              "name": "GARNiDELiA",
              "tns": [],
              "alias": []
            }],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 515,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 34686637,
              "name": "約束 -Promise code-",
              "picUrl": "http://p3.music.126.net/Lt9fXIVYnrmAQDGVSwW08Q==/109951165049760045.jpg",
              "tns": [],
              "pic_str": "109951165049760045",
              "pic": 109951165049760050
            },
            "dt": 218800,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 8754199,
              "vd": -72773
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 5252537,
              "vd": -70132
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 3501706,
              "vd": -68363
            },
            "a": null,
            "cd": "1",
            "no": 2,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 2706476,
            "mv": 5337635,
            "publishTime": 1471363200000,
            "tns": [
              "极乐净土"
            ],
            "privilege": {
              "id": 411907897,
              "fee": 8,
              "payed": 0,
              "st": 0,
              "pl": 128000,
              "dl": 0,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 128000,
              "toast": false,
              "flag": 4,
              "preSell": false
            }
          }],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "3E10978FB06564E4D59FFF816ACEA0C8",
          "durationms": 201526,
          "playTime": 678981,
          "praisedCount": 2452,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_0AA589C8DCF755025B7E409BB890E0D9",
          "coverUrl": "https://p1.music.126.net/7-IVaM5PlVMWxHbXzQ9mzA==/109951163574078900.jpg",
          "height": 720,
          "width": 1280,
          "title": "TFBOYS - Heart （20151231湖南卫视跨年演唱会）",
          "description": "那个时候还没变声…超萌！元气满满！！",
          "commentCount": 138,
          "shareCount": 299,
          "resolutions": [{
              "resolution": 240,
              "size": 10858157
            },
            {
              "resolution": 480,
              "size": 18413269
            },
            {
              "resolution": 720,
              "size": 24594398
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/5rK5EE48oekIjNHyR3GIYg==/109951163424583352.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 110101,
            "birthday": -2209017600000,
            "userId": 1345020800,
            "userType": 0,
            "nickname": "拾號播放器",
            "signature": "让我们一起泡在音乐水里面",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163424583360,
            "backgroundImgId": 109951162868128400,
            "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "backgroundImgIdStr": "109951162868128395",
            "avatarImgIdStr": "109951163424583352"
          },
          "urlInfo": null,
          "videoGroup": [{
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 59101,
              "name": "华语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 11137,
              "name": "TFBOYS",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_1837791360_tn9YqwLF.webp?wsSecret=7864262a6a8b99d4040be6f025dacee1&wsTime=1657521172",
          "previewDurationms": 4000,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [{
            "name": "同一秒快乐",
            "id": 487379494,
            "pst": 0,
            "t": 0,
            "ar": [{
              "id": 827728,
              "name": "TFBOYS",
              "tns": [],
              "alias": []
            }],
            "alia": [],
            "pop": 95,
            "st": 0,
            "rt": null,
            "fee": 0,
            "v": 22,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 35688402,
              "name": "同一秒快乐",
              "picUrl": "http://p4.music.126.net/cX6zjss0qL_VcsJ0S2rHfQ==/19077626253753132.jpg",
              "tns": [],
              "pic_str": "19077626253753132",
              "pic": 19077626253753132
            },
            "dt": 214123,
            "h": {
              "br": 320000,
              "fid": 0,
              "size": 8567162,
              "vd": -50054
            },
            "m": {
              "br": 192000,
              "fid": 0,
              "size": 5140315,
              "vd": -50054
            },
            "l": {
              "br": 128000,
              "fid": 0,
              "size": 3426891,
              "vd": -50054
            },
            "a": null,
            "cd": "1",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 406019,
            "mv": 5599926,
            "publishTime": 1498752000007,
            "privilege": {
              "id": 487379494,
              "fee": 0,
              "payed": 0,
              "st": 0,
              "pl": 320000,
              "dl": 999000,
              "sp": 7,
              "cp": 1,
              "subp": 1,
              "cs": false,
              "maxbr": 999000,
              "fl": 320000,
              "toast": false,
              "flag": 128,
              "preSell": false
            }
          }],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "0AA589C8DCF755025B7E409BB890E0D9",
          "durationms": 63594,
          "playTime": 453584,
          "praisedCount": 3583,
          "praised": false,
          "subscribed": false
        }
      }
    ]
    repeatData = repeatData.concat(this.data.videoList);
    this.setData({
      videoList: repeatData,
    });
  },
  //用户单击视频播放了
  handlePlay(event) {
    // console.log("用户单击视频播放了");
    let vidNow = event.target.id; //获取当前单击的视频vid
    //1.如果现在单击的vid不等于上一个视频的vid,并且具有视频上下文,才进行暂停
    // vidNow !== this.vid && this.currentVideContext && this.currentVideContext.stop();
    //0.设置当前播放的id
    this.vid = vidNow; //复制id
    this.setData({
      vid: vidNow
    })
    // 1.创建上下文,并将video身上的vid作为唯一标识
    this.currentVideContext = wx.createVideoContext(vidNow);
    //调整播放位置
    let {
      videoUpdateTime
    } = this.data;
    //1.寻找播放列表当中的记录,通过vid
    let findResult = videoUpdateTime.find(item => item.vid === vidNow);
    //2.vid找到了,跳转到指定位置
    if (findResult) {
      this.currentVideContext.seek(findResult.currentTime);
    }
    //自动播放
    this.currentVideContext.play();
  },
  //处理播放到末尾的时候的进度条,播放结束应该在播放列表当中移除
  handleEndPlay(event) {
    let vidNow = event.target.id;
    let {
      videoUpdateTime
    } = this.data;
    let index = videoUpdateTime.findIndex(item => item.vid === vidNow);
    if (index !== -1) {
      //移除
      videoUpdateTime.splice(index, 1);
    }
    //更新
    this.setData({
      videoUpdateTime,
    })
  },
  //记录播放进度条
  handleUpdatePlay(event) {
    // console.log("记录播放进度条");
    let {
      videoUpdateTime
    } = this.data;
    let vid = event.target.id; //获取视频的vid
    //查找是否已经有过了
    let findResult = videoUpdateTime.find(item => item.vid === vid);
    //如果有,就更新播放记录列表,没有就添加进播放记录列表
    if (findResult) {
      //更新播放进度
      findResult.currentTime = event.detail.currentTime;
    } else {
      //添加播放记录
      videoUpdateTime.push({
        vid: event.target.id,
        currentTime: event.detail.currentTime,
      });
    }
    this.setData({
      videoUpdateTime: videoUpdateTime
    })
  },
  //用户单击nav上的tab标签了
  changNavTab(event) {
    this.setData({
      selectedId: event.target.id,
      //清空数据
      videoList: [],
    });
    //显示加载
    wx.showLoading({
      title: '正在加载',
    });
    this.reqVideoList(this.data.selectedId);
  },
  //请求获取视频标签nav列表
  async reqNavList() {
    let result = await request('/video/group/list');
    //如果没有值的情况下,就直接返回
    if (!result.data) {
      return;
    }
    //取前十四个
    result = result.data.slice(0, 14); //左闭右开的范围
    this.setData({
      navList: result,
      // 设置初始化显示的id
      selectedId: result[0].id,
    });
    //获取视频数据
    this.reqVideoList(this.data.selectedId);
  },
  //请求获取对应视频标签下方的视频数据
  async reqVideoList(id) {
    let result = await request("/video/group", {
      id,
    });
    //如果没有值的情况下,就直接返回
    if (!result.datas) {
      return;
    }
    //为结果添加id
    let reqList = []; //0.所有的请求
    let videoList = result.datas.map((item, index) => {
      // 1.为了后期统一获取数据并且是同步的
      reqList.push(this.reqVideoPlayUrl(item.data.vid));
      //手动添加唯一标识符
      item.id = index;
      return item;
    })
    //2.获取所有的video播放列表
    let videoListAll = await Promise.all(reqList);
    wx.hideLoading(); //隐藏加载提示
    //3.添加到videoList数据当中
    videoList = videoList.map((item, index) => {
      item.data.urlInfo = videoListAll[index].urls[0];
      return item;
    })
    this.setData({
      videoList: videoList,
      isRefresher: false,
    });
  },
  //请求获取vid对应的视频播放地址
  reqVideoPlayUrl(vid) {
    return request("/video/url", {
      id: vid
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage({from}) {
    if (from === 'menu') {
      return {
        title: "梦洁小站-云音乐",
        path: "/pages/video/video",
        imageUrl: 'https://dreamlove.top/img/favicon.png',
      }
    } else {
      //为按钮
      return {
        title: "我分享给你一份视频,点开看看吧!",
        path: "/pages/video/video",
      }
    }

  }
})