// const data = {
//   '5': {
//     'header': 'Противозачаточная инъекция на 3 месяца для 1 женщины',
//     'body': `У Альбертины Гомес четверо детей:  Андэрсон, Тоно, Марко и Антонио. Старшие Андэрсон и Тоно ходят в школу — на обучение остальных у семьи нет денег. По местным меркам Альбертина живет хорошо — они с мужем держат небольшой магазинчик, в котором продают чипсы, газировку и снеки. Соседи считают, что Альбертине повезло, потому что она может купить достаточно кукурузы и фасоли, чтобы прокормить всех своих детей, а по праздникам в ее семье даже едят курицу. Альбертина и ее муж  больше не хотят иметь детей, но контрацептивы сложно найти в местных аптеках, и стоят они очень дорого.
//              Каждые три месяца мы делаем Альбертине противозачаточную инъекцию — с ней женщина может не бояться незапланированной беременности.
//              В большинстве семей в деревнях Гватемалы  от 4 до 12  детей. Половину из них их родители не могут прокормить.`
//   },
//   '10': {
//     'header': 'Header for 10',
//     'body': `Body of 10
//     Second line`
//   },
//   '25': {
//     'header': 'Header for 25',
//     'body': `Body of 25
//     Second line`
//   },
//   '50': {
//     'header': 'Header for 50',
//     'body': `Body of 50
//     Second line`
//   },
//   '100': {
//     'header': 'Header for 100',
//     'body': `Body of 100
//     Second line`
//   },
// }

function $(selector: string) {
  const result = [];
  document.querySelectorAll(selector).forEach((element) => {
    result.push(element);
  });
  return result
}

const donateButtonEl = $('#donateButton')[0];

const allAmountsButtons = $('#amounts button');
const onClickAmount = (e) => {
  const amount = e.currentTarget.getAttribute("data-value")
  for (const el of allAmountsButtons) {
    el.classList.toggle("isActive", el === e.currentTarget);
  }
  for (const detailsEl of $('#details .amount-details')) {
    if (detailsEl.getAttribute("data-value") === amount) {
      detailsEl.classList.add("isVisible")
    } else {
      detailsEl.classList.remove("isVisible")
    }
  }
  donateButtonEl.classList.add('isVisible')
};
for (const element of allAmountsButtons) {
  element.addEventListener('click', onClickAmount)
}
