# FILE MANAGER

Минималистичный дизайн, в котором нет ничего лишнего, только самый нужный функционал, никакой лишней и ненужной информации:D Ну а на самом деле, т.к. дизайнер из 
меня никакой, не нашёл ничего красивого и решил сделать временную верстку, но, как говорится: "временное решение становится постоянным". Изначально проект пустой
, на сервере при первом запуске приосходит инициализация корневых директорий. Пытался сразу подставлять тестовые данные на сервере, но nest игнорирует эти данные, поэтому
думаю сделать это на клиенте

# DOCKER

Для запуска образа: `docker-compose up`
   
# FRONTEND: Vue(Vite) + Pinia  

Для перемещения между директориями в правом верхнем углу указан путь, при нажатии на конкретную часть пути происходит перемещение до этой директории. 
Так же в левом верхнем углу можно выбрать корневую директорию, т.е. "C", "D", "E".

В нижней части приложения находятся кнопки для создания, копирования, перемещения и удаления файлов/директорий из левой части в правую и наоборот. При
нажатии на кнопку появляется модальное окно. При каждом изменении пути в левой или правой части значение сохранятеся в localstorage

P.S. Код на Vue выглядит ну прямо "хочется плакать кровавыми слезами". После нажатия на кнопку происходит полная перезагрузка страницы, что уж очень дико для меня
, данный способ я считаю самым ужасным, но пока не придумал ничего лучше данного "костыля". Вернусь позже и изменю

# BACKEND: NEST

Два контроллера => Два сервиса с бизнес-логикой. Есть возможность создания/копирования/удаления/перемещения для файлов и директорий. Решил разделить логику
работы файлов и директорий, т.к. есть создать один общий контроллер, то в каждом методе нужно будет проводить проверку на тип файла (файл/директория)


![изображение](https://user-images.githubusercontent.com/98597980/234814779-133d438c-da6f-42c1-a7b0-8e3ad39ac924.png)



# Фидбек
 Видно что опыта напиания реальных приложений мало, зато есть хорошее знание JS, умение структурно мыслить + есть понимание о необходимости разделения приложения на уровни. 
 Рекомендую изучить какой нибудь UI фреймворк (Vuematerial, PrimeVUE и т.д.) +  CSS фреймворк (PrimeFlex, bootstrap и т.д.). 
 На мой взгляд на позицию джуна занний более чем достаточно. 