
# Тестовое задание React + TypeScript разработчика.

Стек разработки:  

React 17.0+  
TypeScript  
SCSS, style modules  
Можно использовать Axios  
Можно использовать Redux  
Можно использовать create-react-app  

Примечания:  
Дизайн решения на ваше усмотрение. Главное, чтобы было наличие SCSS в сочетание с style modules  

Основные параметры запросов:  
page - номер страницы  
limit - количество элементов на странице  
sortBy - сортировка  
order - порядок сортировки  

Описание страниц:  

Страница “Список пользователей”  

Выводится список пользователей. У каждого пользователя показывается аватар, имя и возраст  
Должен быть доступен поиск по имени пользователя (поиск через сервер, с помощью параметра name в запросе)  
Должна присутствовать пагинация с возможностью выбора количества элементов на странице (5, 10, все)  
Должна присутствовать сортировка по возрасту (с переключением варианта по убыванию/по возрастанию)  
У каждого пользователя рядом кнопки “удалить” и “редактировать”. При удалении - запрос на сервер с удалением конкретного пользователя. При нажатии на “редактировать” открывается модальное окно, где можно изменить имя и возраст (2 поля). По умолчанию эти поля заполнены текущими значениями пользователя  
При нажатии на имя пользователя происходит переход на страницу конкретного пользователя  


Страница “Пользователь”  
Должна отображаться вся информация, которая находится в объекте User  
Возможность вернуться назад к списку  
Должны показываться продукты пользователя (запрос к /products с соответствующим параметром userId)  
Должна быть возможность удалить конкретный продукт у пользователя  

