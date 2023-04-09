//Classic global dom grab
const background = document.querySelector('main');
const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
const backwards = document.querySelectorAll('.backwards');
const onwards = document.querySelectorAll('.onwards');
const forms = document.querySelectorAll('form')
const formBackgrounds = document.querySelectorAll<HTMLDivElement>('.form-background')
const musicIcon = document.querySelector('.musictoggle')
const audio = document.getElementById('audio') as HTMLAudioElement
audio.volume = 0.05


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
    case '0': slowText('And who might you be?', 'top')
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