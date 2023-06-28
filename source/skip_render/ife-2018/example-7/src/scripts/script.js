$('.form__input').on('focus', function() {
  $(this)
    .siblings('.form__label')
    .children('.form__label__content')
    .addClass('moveToTop')
})

$('.form__input').on('blur', function() {
  if (!$(this).val().length > 0) {
    $(this)
      .siblings('.form__label')
      .children('.form__label__content')
      .removeClass('moveToTop')
  }
})

$('.form__input').change(function() {
  if ($('#email').val().length > 0 && $('#password').val().length > 0) {
    $('.btn').addClass('animated infinite pulse')
  }
})
