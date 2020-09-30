$(document).ready(function() {
    paginatorInitialize(4);
})

function paginatorInitialize(itemsPerPage) {
    // inicializo los items que se van a mostrar
    let currentPage = 1;
    let totalItems = document.querySelectorAll('.elementos li').length; //aquí leo la longitud de los items
    let totalPages = Math.round(totalItems / itemsPerPage);
    console.info(totalPages);
    let itemsToPaginate = document.querySelectorAll('.elementos li');
    itemsToPaginate.forEach((item, i) => {
        i + 1 <= itemsPerPage ? item.classList.add('d-block') : null;
    }); //recorro cada item y le coloco la clas si está en el rango de los items a paginar

    // creo un contenedor para los items del paginador
    let paginatorContainer = document.createElement('div');
    paginatorContainer.setAttribute('class', 'paginator-container')
    document.querySelector('body').append(paginatorContainer);
    let goBack = document.createElement('span');
    let goForward = document.createElement('span');
    goBack.innerHTML = '<';
    goBack.setAttribute('class', 'go-back');
    goForward.innerHTML = '>';
    goForward.setAttribute('class', 'go-forward');
    document.querySelector('body').insertBefore(goBack, paginatorContainer);
    document.querySelector('body').append(goForward);

    // creo cada item para paginar
    for (i = 1; i <= totalPages; i++) {
        let paginatorItem = document.createElement('span');
        paginatorItem.setAttribute('class', 'paginator-item');
        paginatorItem.setAttribute('data-value', `${i}`);
        paginatorItem.innerHTML = i;
        document.querySelector('.paginator-container').append(paginatorItem);
    };

    // aplico funcionalidad a cada item del paginador
    // funcion general
    function changeItemsToView() {
        itemsToPaginate.forEach((item, i) => {
            if (item.classList.contains('d-block')) {
                item.classList.remove('d-block');
            }
            i + 1 > (itemsPerPage * currentPage) - itemsPerPage && i + 1 <= itemsPerPage * currentPage ? item.classList.add('d-block') : null;
        });
    }
    // ir hacia atrás
    let paginatorItems = document.querySelectorAll('.paginator-item');
    document.querySelector('.go-back').addEventListener('click', function() {
            if (currentPage === 1) {
                currentPage = 1
            } else {
                currentPage--;
                changeItemsToView();
            }
        })
        // ir hacia adelante
    document.querySelector('.go-forward').addEventListener('click', function() {
        if (currentPage === totalPages) {
            currentPage = totalPages
        } else {
            currentPage++;
            changeItemsToView();
        }
    })
    paginatorItems.forEach(item => {
        item.addEventListener('click', function() {
            currentPage = parseInt(item.getAttribute('data-value'));
            changeItemsToView();

        })
    });
}