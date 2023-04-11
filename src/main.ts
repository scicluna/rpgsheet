//Classic global dom grab
const background = document.querySelector('main');
const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
const backwards = document.querySelectorAll('.backwards');
const onwards = document.querySelectorAll('.onwards');
const forms = document.querySelectorAll('form')
const formBackgrounds = document.querySelectorAll<HTMLDivElement>('.form-background')
const musicIcon = document.querySelector('.musictoggle')
const raceSelect = document.getElementById('raceinput') as HTMLSelectElement
const statInputs = document.querySelectorAll<HTMLInputElement>('.stat')
const classSelect = document.getElementById('classinput') as HTMLDivElement
const backgroundSelect = document.getElementById('backgroundinput') as HTMLDivElement

const audio = document.getElementById('audio') as HTMLAudioElement
audio.volume = 0.05
audio.loop = true

import { dragonBornStats, dwarfStats, elfStats, gnomeStats, halfOrcStats, halfElfStats, halflingStats, humanStats, tieflingStats } from "./ts/raceinformation";
import { artificer, barbarian, bard, cleric, druid, fighter, monk, paladin, ranger, rogue, sorcerer, warlock, wizard } from "./ts/classinformation";
import { acolyte, charlatan, criminal, entertainer, folkhero, gladiator, guildartisan, hermit, knight, noble, outlander, pirate, sage, sailor, soldier, urchin } from "./ts/backgroundinformation";

//Dealing with Wrappers
function advanceWrapper(e: Event) {
  e.preventDefault();
  const formNo = wrapper?.getAttribute('data-wrapper');

  if (!formNo || parseInt(formNo) == forms.length - 1) return;

  const wrapperIncrement = (current: string) => {
    const newCurrent = parseInt(current) + 1;
    return newCurrent.toString();
  }

  wrapper?.setAttribute('data-wrapper', wrapperIncrement(formNo));
  wrapperSnap();
}

function retractWrapper(e: Event) {
  e.preventDefault();
  const formNo = wrapper?.getAttribute('data-wrapper');

  if (!formNo || formNo == '0') return;

  const wrapperDecrement = (current: string) => {
    const newCurrent = parseInt(current) - 1;
    return newCurrent.toString();
  }

  wrapper?.setAttribute('data-wrapper', wrapperDecrement(formNo));
  wrapperSnap();
}

function wrapperSnap() {
  const formNo = wrapper?.getAttribute('data-wrapper');
  if (!formNo || !wrapper || !background) return;

  const currentForm = document.querySelector<HTMLDivElement>(`#form${formNo}`)
  if (!currentForm) return;

  const newTransform = (parseInt(formNo) * -20) - 10
  wrapper.style.transform = `translate(${newTransform}%,-50%)`;
  const newImage = `url(./src/images/form${formNo}.webp)`

  changeBackgroundImage(background, newImage)

  formBackgrounds.forEach((form, i) => {
    if (i == parseInt(formNo)) {
      form.style.opacity = '0'
    } else form.style.opacity = '1'
    changeBackgroundImage(form, `url(./src/images/form${i}.webp)`)
  })

  handleText(formNo)
}

function changeBackgroundImage(element: HTMLElement, newImageUrl: string) {
  element.style.backgroundImage = newImageUrl;
}

backwards.forEach(btn => btn.addEventListener('click', retractWrapper));
onwards.forEach(btn => btn.addEventListener('click', advanceWrapper));
wrapperSnap()
//End Wrappers

//Music Toggle
function musicToggle() {
  if (!audio || !musicIcon) return
  audio.paused ? audio.play() : audio.pause()
  if (audio.paused) {
    musicIcon.classList.add('inactive')
    musicIcon.classList.remove('golden-outline')
  } else {
    musicIcon.classList.remove('inactive')
    musicIcon.classList.add('golden-outline')
  }
}
musicIcon?.addEventListener('click', musicToggle)
audio.play()
//Music End

//Text Effect
function handleText(formIndex: string) {
  const letterWrappers = document.querySelectorAll('.letterwrapper')
  letterWrappers.forEach(wrapper => {
    wrapper.innerHTML = ''
  })
  switch (formIndex) {
    case '0': slowText('Who might you be?', 'top')
      break;
    case '1': slowText('What are your Strengths and Weaknesses?', 'bottom')
      break;
    case '2': slowText('Which lineage do you belong to?', 'top')
      break;
    case '3': slowText('What path do you walk?', 'bottom')
      break;
    case '4': slowText('Before you adventured, what did you do?', 'top')
      break;
  }
}

function slowText(str: string, target: string) {
  let letterWrapper;
  target == 'top' ? letterWrapper = document.querySelector<HTMLDivElement>('.letterwrappertop')
    : letterWrapper = document.querySelector<HTMLDivElement>('.letterwrapperbottom')

  for (const letter of str) {
    const newLetter = document.createElement('div')
    newLetter.innerText = letter
    newLetter.classList.add('faded')
    newLetter.classList.add('newletter')
    letterWrapper?.append(newLetter)
  }

  const newLetters = document.querySelectorAll<HTMLDivElement>('.newletter')
  newLetters.forEach((letter, i) => {
    fadeInLetter(letter, i)
  })
}

function fadeInLetter(letter: HTMLElement, index: number) {
  setTimeout(() => {
    letter.classList.remove('faded')
  }, index * 250)
}
//text effect end

//race display
function chooseRace(race: string) {
  switch (race) {
    case 'dragonborn': raceText(dragonBornStats)
      break;
    case 'dwarf': raceText(dwarfStats)
      break;
    case 'elf': raceText(elfStats)
      break;
    case 'gnome': raceText(gnomeStats)
      break;
    case 'half-elf': raceText(halfElfStats)
      break;
    case 'half-orc': raceText(halfOrcStats)
      break;
    case 'halfling': raceText(halflingStats)
      break;
    case 'human': raceText(humanStats)
      break;
    case 'tiefling': raceText(tieflingStats)
      break;
    default: raceText('')
  }
}

function raceText(description: string) {
  const raceInfo = document.querySelector<HTMLDivElement>('.raceinformation')
  if (!raceInfo) return
  raceInfo.innerText = ''

  const infoBlock = document.createElement('p')
  infoBlock.innerText = description
  raceInfo.append(infoBlock)
}

raceSelect.addEventListener('change', (e: Event) => {
  chooseRace((e.target as HTMLSelectElement).value)
})
//race display end

//stat handling
function handleStatChange() {
  const modifiers = document.querySelectorAll<HTMLParagraphElement>('.modifier')
  const pointsRemaining = document.querySelector<HTMLHeadElement>('#statpoints')

  if (!pointsRemaining) return

  let total = 0
  statInputs.forEach((stat, i) => {
    const score = stat.value

    if (parseInt(score) > 15) {
      stat.value = '8'
      return
    }
    modifiers[i].innerText = (Math.floor((parseInt(score) - 10) / 2)).toString()

    if (parseInt(score) < 14) {
      total += parseInt(score) - 8
    } else total += parseInt(score) == 14 ? parseInt(score) - 7 : parseInt(score) - 6
  })

  pointsRemaining.innerText = (27 - total).toString()
}
statInputs.forEach(statInput => {
  statInput.addEventListener('change', handleStatChange)
})
//Stat handling end

//Class handling
function chooseClass(className: string) {
  switch (className) {
    case 'artificer': classText(artificer)
      break;
    case 'barbarian': classText(barbarian)
      break;
    case 'bard': classText(bard)
      break;
    case 'cleric': classText(cleric)
      break;
    case 'druid': classText(druid)
      break;
    case 'fighter': classText(fighter)
      break;
    case 'monk': classText(monk)
      break;
    case 'paladin': classText(paladin)
      break;
    case 'ranger': classText(ranger)
      break;
    case 'rogue': classText(rogue)
      break;
    case 'sorcerer': classText(sorcerer)
      break;
    case 'warlock': classText(warlock)
      break;
    case 'wizard': classText(wizard)
      break;
    default: classText('')
  }
}

function classText(description: string) {
  const classInfo = document.querySelector<HTMLDivElement>('.classinformation')
  if (!classInfo) return
  classInfo.innerText = ''

  const infoBlock = document.createElement('p')
  infoBlock.innerText = description
  classInfo.append(infoBlock)
}

classSelect.addEventListener('change', (e: Event) => {
  chooseClass((e.target as HTMLSelectElement).value)
})
//Class handling end

//Background handling start
function chooseBackground(background: string) {
  switch (background) {
    case 'acolyte': backgroundText(acolyte)
      break;
    case 'charlatan': backgroundText(charlatan)
      break;
    case 'criminal': backgroundText(criminal)
      break;
    case 'entertainer': backgroundText(entertainer)
      break;
    case 'folkhero': backgroundText(folkhero)
      break;
    case 'gladiator': backgroundText(gladiator)
      break;
    case 'guildartisan': backgroundText(guildartisan)
      break;
    case 'hermit': backgroundText(hermit)
      break;
    case 'knight': backgroundText(knight)
      break;
    case 'noble': backgroundText(noble)
      break;
    case 'outlander': backgroundText(outlander)
      break;
    case 'pirate': backgroundText(pirate)
      break;
    case 'sage': backgroundText(sage)
      break;
    case 'sailor': backgroundText(sailor)
      break;
    case 'soldier': backgroundText(soldier)
      break;
    case 'urchin': backgroundText(urchin)
      break;
    default: backgroundText('')
  }
}

function backgroundText(description: string) {
  const backgroundInfo = document.querySelector<HTMLDivElement>('.backgroundinformation')
  if (!backgroundInfo) return
  backgroundInfo.innerText = ''

  const infoBlock = document.createElement('p')
  infoBlock.innerText = description
  backgroundInfo.append(infoBlock)
}

backgroundSelect.addEventListener('change', (e: Event) => {
  chooseBackground((e.target as HTMLSelectElement).value)
})
//Background handling end

//Handle Submission start

//Handle Submission end

//Generate Char Sheet start

//Generate Char Sheet end


