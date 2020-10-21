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

let shamNeutral = [
  "sham-2200.jpg", "sham-2215.jpg", "sham-2280.jpg", 
  "sham-2383.jpg", "sham-2399.jpg", "sham-2455.jpg", 
  "sham-2516.jpg", "sham-2700.jpg", "sham-2890.jpg", 
  "sham-2214.jpg", "sham-2230.jpg", "sham-2372.jpg", 
  "sham-2394.jpg", "sham-2435.jpg", "sham-2487.jpg", 
  "sham-2635.jpg", "sham-2840.jpg", "sham-9190.jpg"]

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

let shamPicByType = {
  'mm': [
    "sham-bern400.jpg", "sham-bern402.jpg", "sham-bern404.jpg", "sham-bern406.jpg", "sham-bern408.jpg", "sham-bern410.jpg", 
    "sham-bern412.jpg", "sham-bern414.jpg", "sham-bern416.jpg", "sham-bern401.jpg", "sham-bern403.jpg", "sham-bern405.jpg", 
    "sham-bern407.jpg", "sham-bern409.jpg", "sham-bern411.jpg", "sham-bern413.jpg", "sham-bern415.jpg", "sham-bern417.jpg"],
  'fm': [
    "sham-bern100.jpg", "sham-bern102.jpg", "sham-bern104.jpg", "sham-bern106.jpg", "sham-bern108.jpg", "sham-bern110.jpg", 
    "sham-bern112.jpg", "sham-bern114.jpg", "sham-bern116.jpg", "sham-bern101.jpg", "sham-bern103.jpg", "sham-bern105.jpg", 
    "sham-bern107.jpg", "sham-bern109.jpg", "sham-bern111.jpg", "sham-bern113.jpg", "sham-bern115.jpg", "sham-bern117.jpg"],
  'mf': [
    "sham-bern200.jpg", "sham-bern202.jpg", "sham-bern204.jpg", "sham-bern206.jpg", "sham-bern208.jpg", "sham-bern210.jpg", 
    "sham-bern212.jpg", "sham-bern214.jpg", "sham-bern216.jpg", "sham-bern201.jpg", "sham-bern203.jpg", "sham-bern205.jpg", 
    "sham-bern207.jpg", "sham-bern209.jpg", "sham-bern211.jpg", "sham-bern213.jpg", "sham-bern215.jpg", "sham-bern217.jpg"],
  'ff': [
    "sham-bern300.jpg", "sham-bern302.jpg", "sham-bern304.jpg", "sham-bern306.jpg", "sham-bern308.jpg", "sham-bern310.jpg", 
    "sham-bern312.jpg", "sham-bern314.jpg", "sham-bern316.jpg", "sham-bern301.jpg", "sham-bern303.jpg", "sham-bern305.jpg", 
    "sham-bern307.jpg", "sham-bern309.jpg", "sham-bern311.jpg", "sham-bern313.jpg", "sham-bern315.jpg", "sham-bern317.jpg"],
}

this.getPicByType = (type) => random.shuffle(neutral.concat(picByType[type]));
this.getShamPicByType = (type) => random.shuffle(shamNeutral.concat(shamPicByType[type]));
this.getLang = (lang) => JSON.parse(fs.readFileSync(langFolder + lang + ".json"))
this.getLangs = () => fs.readdirSync(langFolder).filter((lang) => lang.includes(".json")).map((element) => element.split(".")[0])
this.dbInit()

module.exports = this;