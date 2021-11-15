$(document).ready(function(){
    $('[data-toggle="tooltip]').tooltip();

    $('[data-add-to-cart]').click(function(e){
        alert('اضيف المنتج الي عربة المشتريات');
        e.stopPropagation();
    });
});