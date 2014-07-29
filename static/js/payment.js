$(function () {
    function paymillResponseHandler(error, result) {
        if (error) {
            $('#payment-errors').text(error.apierror);
            $('#payment-submit').removeAttr('disabled');
        } else {
            var form = $("#payment-form");

            var token = result.token;
            form.append("<input type='hidden' name='paymillToken' value='" + token + "'/>");
            form.get(0).submit();
        }
    }
    console.log('bar');
    $('#payment-form').submit(function (event) {
        console.log('foobar');
        // Deactivate Submit button while we process the action.
        $('#payment-submit').attr('disabled', 'disabled');
        console.log($('#expiry-month').val(), $('#expiry-year').val());
        paymill.createToken({
            number: $('#card-number').val(),
            exp_month: $('#expiry-month').val(),
            exp_year: $('#expiry-year').val(),
            cvc: $('#cvv').val(),
            amount_int: $('#payment-amount').val(),
            currency: $('#payment-currency').val(),
            cardholder: $('#card-holder-name').val()
        }, paymillResponseHandler);

        return false;
    });
    console.log('foo');
});


