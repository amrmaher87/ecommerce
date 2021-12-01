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

    //تنفيذ حذف المنتجات 
    $('[data-remove-from-cart]').click(function() {
        $(this).parents('[data-product-info]').remove();

        //أعد حساب السعر الإجمالي بعد حذف احد المنتجات
        calculateTotalPrice();
    });


    //عندما تتغير كمية المنتج
    $('[data-product-quantity]').change(function(){

        //اجلب الكمية الجديدة
        var newQuantity = $(this).val();

        //ابحث عن السطر الذي يحتوي علي معلومات هذا المنتج
        var $parent = $(this).parents('[data-product-info]');

        //اجلب سعر القطعة الواحدة من معلومات هذا المنتج
        var pricePerUnit = $parent.attr('data-product-price');

        //السعر الإجمالي للمنتج هو سعر القطعة الواحدة مضروبا في العدد المطلوب
        var totalPriceForProduct = newQuantity * pricePerUnit;

        //عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذا السطر
        $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        //حدث السعر الإجمالي للمنتجات
        calculateTotalPrice();
    });

    function calculateTotalPrice() {

        //انشئ متغير جديد لحفظ السعر الإجمالي
        var totalPriceForAllProducts = 0;

        //لكل سطر يمثل معلومات المنتج في الصفحة
        $('[data-product-info]').each(function() {

            
            //اجلب سعر القطعة الواحدة من الخانة الموافقة
            var pricePerUnit = $(this).attr('data-product-price');

            // اجلب كمية المنتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct =  pricePerUnit * quantity;

            //اضافة هذا المنتج الي السعر الإجمالي و احفظ القيمة في المتغير نفسه
            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        });

        //حدث السعر الإجمالي لكل المنتجات في الصفحة
        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    }
});