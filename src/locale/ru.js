export default {
  toolbar: {
    undo: 'Отменить',
    redo: 'Повторить',
    print: 'Распечатать',
    paintformat: 'Применить формат',
    clearformat: 'Очистить форматирование',
    format: 'Форматирование',
    fontName: 'Шрифт',
    fontSize: 'Размер шрифта',
    fontBold: 'Полужирный шрифт',
    fontItalic: 'Курсив',
    underline: 'Подчеркивание',
    strike: 'Зачеркнутый',
    color: 'Цвет текста',
    bgcolor: 'Цвет заливки',
    border: 'Границы',
    merge: 'Объединить ячейки',
    align: 'Горизонтальное выравнивание',
    valign: 'Вертикальное выравнивание',
    textwrap: 'Перенос текста',
    freeze: 'Заморозить ячейку',
    autofilter: 'Фильтр',
    formula: 'Функции',
    more: 'Еще',
  },
  contextmenu: {
    copy: 'Копировать',
    cut: 'Вырезать',
    paste: 'Вставить',
    pasteValue: 'Вставить только значения',
    pasteFormat: 'Вставить только формат',
    hide: 'Скрыть',
    insertRow: 'Вставить строку',
    insertColumn: 'Вставить столбец',
    deleteSheet: 'Удалить',
    deleteRow: 'Удалить строку',
    deleteColumn: 'Удалить столбец',
    deleteCell: 'Удалить ячейку',
    deleteCellText: 'Удалить текст ячейки',
    validation: 'Проверка данных',
    cellprintable: 'Включить экспорт',
    cellnonprintable: 'Отключить экспорт',
    celleditable: 'Разрешить редактирование',
    cellnoneditable: 'Отключить редактирование',
    autofitCellWidth: 'Автоподбор ширины ячеек',
    autofitCellHeight: 'Автоподбор высоты ячеек'
  },
  print: {
    size: 'Размер страницы',
    orientation: 'Ориентация страницы',
    orientations: ['Пейзаж', 'Портрет'],
  },
  format: {
    normal: 'Обычный',
    text: 'Простой текст',
    number: 'Число',
    percent: 'Проценты',
    rmb: 'RMB',
    usd: 'USD',
    eur: 'EUR',
    date: 'Дата',
    time: 'Время',
    datetime: 'Дата и время',
    duration: 'Продолжительность',
  },
  formula: {
    sum: 'Sum',
    average: 'Average',
    max: 'Max',
    min: 'Min',
    _if: 'IF',
    and: 'AND',
    or: 'OR',
    concat: 'Concat',
  },
  validation: {
    required: 'это должно быть обязательно',
    notMatch: 'он не соответствует его правилу проверки',
    between: 'это между {} и {}',
    notBetween: 'это не между {} и {}',
    notIn: 'его нет в списке',
    equal: 'он равен {}',
    notEqual: 'это не равно {}',
    lessThan: 'это меньше чем {}',
    lessThanEqual: 'он меньше или равен {}',
    greaterThan: 'это больше чем {}',
    greaterThanEqual: 'он больше или равен {}',
  },
  error: {
    pasteForMergedCell: 'Невозможно сделать это для объединенных ячеек',
  },
  calendar: {
    weeks: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  },
  button: {
    next: 'Следующий',
    cancel: 'Отмена',
    remove: 'Удалять',
    save: 'Сохранить',
    ok: 'OK',
  },
  sort: {
    desc: 'Сортировка Я -> А',
    asc: 'Сортировать А -> Я',
  },
  filter: {
    empty: 'пустой',
  },
  dataValidation: {
    mode: 'Режим',
    range: 'Диапазон ячеек',
    criteria: 'Критерии',
    modeType: {
      cell: 'Клетка',
      column: 'Столбец',
      row: 'Строка',
    },
    type: {
      list: 'Список',
      number: 'Число',
      date: 'Дата',
      phone: 'Телефон',
      email: 'Эл.адрес',
    },
    operator: {
      be: 'между',
      nbe: 'не между',
      lt: 'меньше, чем',
      lte: 'меньше или равно',
      gt: 'больше чем',
      gte: 'больше или равно',
      eq: 'равно',
      neq: 'не равно',
    },
  },
};
