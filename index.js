const KHMER_DIGITS = {"0":"០","1":"១","2":"២","3":"៣","4":"៤","5":"៥","6":"៦","7":"៧","8":"៨","9":"៩"};
const UNITS = {0:"សូន្យ",1:"មួយ",2:"ពីរ",3:"បី",4:"បួន",5:"ប្រាំ",6:"ប្រាំមួយ",7:"ប្រាំពីរ",8:"ប្រាំបី",9:"ប្រាំបួន"};
const TENS = {10:"ដប់",20:"ម្ភៃ",30:"សាមសិប",40:"សែសិប",50:"ហាសិប"};
const TIME_RE = /^\s*(\d{1,2})\s*:\s*(\d{2})\s*(AM|PM)?\s*$/i;

function numberToKhmerDigits(n){return String(n).split("").map(ch=>KHMER_DIGITS[ch]??ch).join("");}
function numberToKhmerWords(n){
  if(n<0||n>59) throw new Error("number out of supported range (0-59)");
  if(n<10) return UNITS[n];
  if(n<20){ if(n===10) return TENS[10]; return TENS[10]+UNITS[n-10];}
  const tens=Math.floor(n/10)*10, ones=n%10;
  if(ones===0) return TENS[tens];
  return TENS[tens]+UNITS[ones];
}
function periodKm(h){ if(h<=5) return "យប់"; if(h<=11) return "ព្រឹក"; if(h<=17) return "រសៀល"; return "ល្ងាច"; }
function to12h(h){ const x=h%12; return x===0?12:x; }
function parseTimeString(s){
  const m=TIME_RE.exec(s);
  if(!m) throw new Error("Invalid time format. Use 'H:MM', 'HH:MM', or 'H:MM AM/PM'.");
  const hour=parseInt(m[1],10), minute=parseInt(m[2],10), ampm=m[3];
  if(minute<0||minute>59) throw new Error("Minute must be 00-59.");
  let hour24;
  if(ampm){
    if(hour<1||hour>12) throw new Error("Hour must be 1-12 when using AM/PM.");
    const ap=ampm.toUpperCase();
    hour24 = (ap==="AM") ? (hour===12?0:hour) : (hour===12?12:hour+12);
  } else {
    if(hour<0||hour>23) throw new Error("Hour must be 0-23 for 24-hour input.");
    hour24=hour;
  }
  return {hour24, minute};
}
function parseDateTime(date){
  if(Number.isNaN(date.getTime())) throw new Error("Invalid Date instance.");
  return {hour24:date.getHours(), minute:date.getMinutes()};
}
function resolveTimeInput(timeInput){
  if(timeInput===undefined) return parseDateTime(new Date());
  if(timeInput instanceof Date) return parseDateTime(timeInput);
  if(typeof timeInput==="string") return parseTimeString(timeInput);
  throw new Error("time must be a string, a Date, or omitted to use current time.");
}
function normalizeArgs(timeInput, options){
  if(timeInput&&typeof timeInput==="object"&&!(timeInput instanceof Date)){
    return {timeInput:undefined, options:timeInput};
  }
  return {timeInput, options:options||{}};
}
function formatTime(timeInput, options){
  const normalized=normalizeArgs(timeInput, options);
  const mode=normalized.options.mode||"digits";
  const {hour24, minute}=resolveTimeInput(normalized.timeInput);
  const hour12=to12h(hour24);
  const period=periodKm(hour24);
  if(mode==="digits"){
    return `ម៉ោង${numberToKhmerDigits(hour12)} និង ${numberToKhmerDigits(minute)} នាទី ${period}`;
  }
  if(mode==="words"){
    return `ម៉ោង${numberToKhmerWords(hour12)} និង ${numberToKhmerWords(minute)} នាទី ${period}`;
  }
  throw new Error("mode must be 'digits' or 'words'");
}
module.exports={formatTime};
