const random = require('./random')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require("fs");

const adapter = new FileSync('db.json')
const db = low(adapter)
const langFolder = "../../transparent-psi-languages/"


this.dbInit = () => {
  db.defaults({ ids: [], count: 0 })
    .write()
}

this.saveId = (labId, expId, labScore, expScore) => {
  db.get('ids')
    .push({labId: labId, expId: expId, labScore: labScore, expScore: expScore})
    .write()
}

this.idCheck = (labId, expId) => {
  return db.get('ids')
    .find({ labId: labId, expId: expId})
    .value()
}

this.getAllId = () => {
  return db
    .getState()
}

this.getUser = (req, erotic="18", nonErotic="18") => {
  let picNumber = 1
  let picType = random.coinFlip() ? "erotic" : "nonErotic"
  if (picType == "erotic") {
    picNumber = Math.floor(random.generate() * Number(erotic))
  } else {
    picNumber = Math.floor(random.generate() * Number(nonErotic))
  }
  return {
    id : req.session.secureId,
    side : random.coinFlip() ? "left" : "right",
    picType : picType,
    picNumber : picNumber
	};
};

let neutral = [
  "2200.jpg" , "2215.jpg" , "2280.jpg" , 
  "2383.jpg" , "2399.jpg" , "2455.jpg" , 
  "2516.jpg" , "2700.jpg" , "2890.jpg" , 
  "2214.jpg" , "2230.jpg" , "2372.jpg" , 
  "2394.jpg" , "2435.jpg" , "2487.jpg" , 
  "2635.jpg" , "2840.jpg" , "9190.jpg"
]
let picByType = {
  'mm': [
    "bern400.jpg" ,"bern402.jpg" ,"bern404.jpg" ,"bern406.jpg" ,"bern408.jpg" ,"bern410.jpg" ,
    "bern412.jpg" ,"bern414.jpg" ,"bern416.jpg","bern401.jpg" ,"bern403.jpg" ,"bern405.jpg",
    "bern407.jpg" ,"bern409.jpg" ,"bern411.jpg" ,"bern413.jpg" ,"bern415.jpg" ,"bern417.jpg"
  ],
  'fm': [
    "bern100.jpg" ,"bern102.jpg" ,"bern104.jpg" ,"bern106.jpg" ,"bern108.jpg" ,"bern110.jpg" ,
    "bern112.jpg" ,"bern114.jpg" ,"bern116.jpg","bern101.jpg" ,"bern103.jpg" ,"bern105.jpg",
    "bern107.jpg" ,"bern109.jpg" ,"bern111.jpg" ,"bern113.jpg" ,"bern115.jpg" ,"bern117.jpg"
  ],
  'mf': [
    "bern200.jpg" ,"bern202.jpg" ,"bern204.jpg" ,"bern206.jpg" ,"bern208.jpg" ,"bern210.jpg" ,
    "bern212.jpg" ,"bern214.jpg" ,"bern216.jpg","bern201.jpg" ,"bern203.jpg" ,"bern205.jpg",
    "bern207.jpg" ,"bern209.jpg" ,"bern211.jpg" ,"bern213.jpg" ,"bern215.jpg" ,"bern217.jpg"
  ],
  'ff': [
    "bern300.jpg" ,"bern302.jpg" ,"bern304.jpg" ,"bern306.jpg" ,"bern308.jpg" ,"bern310.jpg" ,
    "bern312.jpg" ,"bern314.jpg" ,"bern316.jpg","bern301.jpg" ,"bern303.jpg" ,"bern305.jpg",
    "bern307.jpg" ,"bern309.jpg" ,"bern311.jpg" ,"bern313.jpg" ,"bern315.jpg" ,"bern317.jpg"
  ],
}

this.getPicByType = (type) => random.shuffle(neutral.concat(picByType[type]));
this.getLang = (lang) => JSON.parse(fs.readFileSync(langFolder + lang + ".json"))
this.getLangs = () => fs.readdirSync(langFolder).filter((lang) => lang.includes(".json")).map((element) => element.split(".")[0])
this.dbInit()

module.exports = this;