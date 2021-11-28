$(document).ready(function(){
    $('[data-toggle="tooltip]').tooltip();

    $('[data-add-to-cart]').click(function(e){
        alert('اضيف المنتج الي عربة المشتريات');
        e.stopPropagation();
    });

    $('.product-option input[type="radio"]').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });
});