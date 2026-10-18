export const TG_CONTACT = "https://t.me/mmushkachev";
export const TG_CHANNEL = "https://t.me/mushkachev";

export type WorkRole = "shoot" | "edit" | "crew";

export interface Work {
  postId: number;
  title: string;
  note: string;
  roles: WorkRole[];
  roleLabel: string;
  duration?: string;
  poster: string;
  aspect: "wide" | "tall";
  extraPostId?: number;
}

/**
 * Настоящие публикации из канала Михаила «В тихом омуте» (t.me/mushkachev).
 * duration — только там, где удалось подтвердить по публичной ленте.
 * poster — иллюстративная обложка (сток), НЕ кадр из ролика.
 */
export const WORKS: Work[] = [
  {
    postId: 221,
    title: "Бухта Муравьиная",
    note: "Видео из поездки в Приморский край: Японское море, сосновый лес и тишина. Съёмка и монтаж — мои.",
    roles: ["shoot", "edit"],
    roleLabel: "Съёмка · монтаж",
    duration: "0:43",
    poster:
      "https://images.pexels.com/photos/19076876/pexels-photo-19076876.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    aspect: "wide",
  },
  {
    postId: 219,
    title: "Мерч Staff Brothers × Gastreet",
    note: "Ролик для мерча гастрономического фестиваля. В этом проекте я отвечал за монтаж.",
    roles: ["edit"],
    roleLabel: "Монтаж",
    poster:
      "https://images.pexels.com/photos/30283474/pexels-photo-30283474.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    aspect: "tall",
  },
  {
    postId: 217,
    extraPostId: 218,
    title: "За кадром YouTube-влога",
    note: "Backstage съёмки влога для канала Татьяны Наникашвили: рабочая атмосфера без постановки.",
    roles: ["shoot", "crew"],
    roleLabel: "Backstage · съёмка",
    poster:
      "https://images.pexels.com/photos/34476056/pexels-photo-34476056.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    aspect: "wide",
  },
  {
    postId: 228,
    title: "Короткий атмосферный монтаж",
    note: "Небольшой ролик про настроение и ритм — такой формат хорошо работает в соцсетях.",
    roles: ["edit"],
    roleLabel: "Монтаж",
    poster:
      "https://images.pexels.com/photos/12092991/pexels-photo-12092991.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    aspect: "wide",
  },
  {
    postId: 220,
    title: "Фрагмент с блогером",
    note: "Кадры со съёмки с участием автора блога — живой формат, минимум постановки.",
    roles: ["shoot"],
    roleLabel: "Съёмка",
    poster:
      "https://images.pexels.com/photos/6593773/pexels-photo-6593773.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    aspect: "tall",
  },
  {
    postId: 230,
    title: "Творческая съёмка",
    note: "Совместный творческий проект, с которого начался год. Работали быстро и с настроением.",
    roles: ["shoot", "crew"],
    roleLabel: "Съёмка · команда",
    duration: "1:54",
    poster:
      "https://images.pexels.com/photos/6896328/pexels-photo-6896328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    aspect: "wide",
  },
  {
    postId: 233,
    title: "Проект с «КРЦ», Набережные Челны",
    note: "Командная работа с коллегами из Набережных Челнов — пример выездного проекта.",
    roles: ["crew"],
    roleLabel: "Командный проект",
    duration: "3:00",
    poster:
      "https://images.pexels.com/photos/6899928/pexels-photo-6899928.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    aspect: "wide",
  },
  {
    postId: 232,
    title: "Скетч для SEBERO",
    note: "Совместная работа для бренда SEBERO. Сценарий и организация проекта — командная работа.",
    roles: ["shoot", "crew"],
    roleLabel: "Съёмочная команда",
    poster:
      "https://images.pexels.com/photos/763214/pexels-photo-763214.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    aspect: "tall",
  },
];

export const SHULTZ_POSTS = [
  { id: 691, label: "Выпуск № 691" },
  { id: 749, label: "Выпуск № 749" },
  { id: 755, label: "Выпуск № 755" },
];

export interface Service {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  output: string[];
  img: string;
}

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Мероприятия",
    tagline: "События, которые жалко потерять",
    desc: "Праздники, концерты и выступления, корпоративы, школьные и детские события. Я снимаю так, чтобы не мешать происходящему: нахожусь в нужном месте в нужный момент и не превращаю ваше событие в съёмочную площадку.",
    output: [
      "Полная запись по договорённости",
      "Ролик с лучшими моментами",
      "Короткие версии для соцсетей",
    ],
    img: "https://images.pexels.com/photos/5934962/pexels-photo-5934962.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
  },
  {
    num: "02",
    title: "Видео для бизнеса",
    tagline: "Показать дело, а не рассказать о нём",
    desc: "Съёмка продуктов, заведений, услуг и людей, которые за ними стоят. Кафе, магазин, студия или частная практика — подберём формат под площадку: сайт, соцсети или рекламу.",
    output: [
      "Ролики о продукте и услугах",
      "Видео интерьеров и процессов",
      "Контент для соцсетей заведения",
    ],
    img: "https://images.pexels.com/photos/8629106/pexels-photo-8629106.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
  },
  {
    num: "03",
    title: "Блогерам и авторам",
    tagline: "Камера, которая поспевает за вами",
    desc: "Влоги, Reels и Shorts, выездные и тематические съёмки. Могу снимать вместе с вами как оператор или взять видеоряд на себя полностью — вы занимаетесь контентом, я картинкой и звуком.",
    output: [
      "Вертикальные видео 9:16",
      "Влоги и выездные съёмки",
      "Регулярный контент по расписанию",
    ],
    img: "https://images.pexels.com/photos/9413658/pexels-photo-9413658.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
  },
  {
    num: "04",
    title: "Оператор в вашу команду",
    tagline: "Для продакшенов и продюсеров",
    desc: "Подключаюсь к проектам других команд как оператор: приезжаю со своим оборудованием, быстро встраиваюсь в процесс и держу дисциплину площадки. Основные камеры — Fujifilm X-H2S и X-T4, стабилизатор и беспроводной звук.",
    output: [
      "Работа первой или второй камерой",
      "Съёмка по ТЗ и референсам",
      "Выездные проекты по договорённости",
    ],
    img: "https://images.pexels.com/photos/13811051/pexels-photo-13811051.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
  },
  {
    num: "05",
    title: "Монтаж и постобработка",
    tagline: "Из ваших исходников — готовый ролик",
    desc: "Если съёмка уже есть, а видео нет: соберу ролик из готового материала. Отбор кадров, структура и ритм, цветокоррекция и звуковое оформление — работаю в DaVinci Resolve.",
    output: [
      "Монтаж коротких и длинных роликов",
      "Цветокоррекция и звук",
      "Версии под разные площадки",
    ],
    img: "https://images.pexels.com/photos/32774292/pexels-photo-32774292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
  },
];

export const PROCESS = [
  {
    tc: "00:00",
    title: "Напишите в Telegram",
    text: "Пара предложений своими словами: что снимаем, где и когда. Техническое задание не нужно — разберёмся вместе.",
  },
  {
    tc: "00:01",
    title: "Обсуждаем задачу",
    text: "Уточняем формат результата, длительность и детали дня. Стоимость называю до съёмки, когда задача понятна.",
  },
  {
    tc: "00:02",
    title: "День съёмки",
    text: "Приезжаю с оборудованием и работаю спокойно: событие идёт своим ходом, камера ему не мешает.",
  },
  {
    tc: "00:03",
    title: "Монтаж и готово",
    text: "Отбираю лучшие кадры, собираю ролик, правлю цвет и звук. Готовое видео присылаю удобной ссылкой.",
  },
];

export const FAQ = [
  {
    q: "Сколько стоит съёмка?",
    a: "Фиксированного прайса нет: цена зависит от длительности съёмки, места и объёма монтажа. Напишите, что и когда нужно снять, — я задам пару уточняющих вопросов и назову стоимость до начала работы. Без пакетов «под ключ» и навязанных опций.",
  },
  {
    q: "MSHK.FILM — это студия?",
    a: "Нет, это мой личный бренд. Я, Михаил Мушкачев, и есть MSHK.FILM: вы пишете лично мне, я приезжаю снимать и сам монтирую. Никаких менеджеров и передачи задачи по цепочке.",
  },
  {
    q: "Вы работаете только в Омске?",
    a: "База — Омск, но выездные проекты возможны по договорённости. Уже были съёмки в Приморском крае и совместный проект в Набережных Челнах — часть работ выше как раз из этих поездок.",
  },
  {
    q: "Можно ли заказать только монтаж?",
    a: "Да. Присылаете исходники — я отберу лучшие кадры, соберу ролик, поработаю с цветом и звуком в DaVinci Resolve. Так, например, был сделан ролик для мерча Staff Brothers / Gastreet.",
  },
  {
    q: "Что я получу на выходе?",
    a: "Зависит от задачи, и мы фиксируем это до съёмки: полная запись события, ролик с лучшими моментами, вертикальные версии для соцсетей или всё сразу. Вы точно знаете, за что платите.",
  },
  {
    q: "Как быстро будет готово видео?",
    a: "Сроки зависят от объёма материала и сложности монтажа, поэтому честно обсуждаем их перед съёмкой под вашу задачу — а не называю красивые цифры с потолка.",
  },
  {
    q: "Вы можете присоединиться к нашей съёмочной группе?",
    a: "Да, работаю оператором в составе команд блогеров, продюсеров и продакшенов. Приезжаю со своим комплектом: Fujifilm X-H2S и X-T4, стабилизатор, беспроводная запись звука.",
  },
];

export const NAV = [
  { href: "#works", label: "Работы", scene: "SC.01" },
  { href: "#services", label: "Услуги", scene: "SC.02" },
  { href: "#about", label: "Обо мне", scene: "SC.03" },
  { href: "#process", label: "Процесс", scene: "SC.04" },
  { href: "#faq", label: "Вопросы", scene: "SC.05" },
  { href: "#brief", label: "Обсудить проект", scene: "SC.06" },
];
