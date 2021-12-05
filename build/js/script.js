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

    var citiesByCountry = {
        sa: ['جدة','الرياض'],
        eg: ['الإسكندرية','القاهرة'],
        jo: ['الزرقاء','عمان'],
        sy: ['حماه','حلب','دمشق'],
    };

    //عندما يتغير البلد
    $('#form-checkout select[name="country"]').change(function() {
        //اجلب رمز البلد
        var country = $(this).val();

        //اجلب مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];

        //فرغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        //أضف المدن الي قائمة المدن
        cities.forEach(function(city){
            var $newOption = $('<option></option>');
            $newOption.text(city);
            $newOption.val(city);

            $('#form-checkout select[name="city"]').append($newOption);
        });
    });

    //عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').change(function() {
        //اجلب القيمة المختارة حاليا
        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivery'){
            //اذا كانت عند الاستلام، فعطل حقول بطاقة الائتمان
            $('#credit-card-info input').prop('disabled', true);
        } else {
            //و إلا ففعلها
            $('#credit-card-info input').prop('disabled', false);
        }

        //بدل معلومات بطاقة الائتمان بين الظهور و الاخفاء
        $('#credit-card-info').toggle();
    });
});