const background = document.querySelector('main');
const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
const backwards = document.querySelectorAll('.backwards');
const onwards = document.querySelectorAll('.onwards');
const forms = document.querySelectorAll('form')

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

backwards.forEach(btn => btn.addEventListener('click', retractWrapper));
onwards.forEach(btn => btn.addEventListener('click', advanceWrapper));

function wrapperSnap() {
  const formNo = wrapper?.getAttribute('data-wrapper');
  if (!formNo || !wrapper || !background) return;

  const currentForm = document.querySelector<HTMLDivElement>(`#form${formNo}`)
  if (!currentForm) return;

  const newTransform = (parseInt(formNo) * -20) - 10
  wrapper.style.transform = `translate(${newTransform}%,-50%)`;
  const newImage = `url(./src/images/form${formNo}.webp)`

  changeBackgroundImage(background, newImage)

  forms.forEach((form, i) => {
    form.style.backgroundImage = `url(./src/images/form${i}.webp)`
  })
  currentForm.style.backgroundImage = 'none'
}

function changeBackgroundImage(element: HTMLElement, newImageUrl: string) {


  element.style.backgroundImage = newImageUrl;

}