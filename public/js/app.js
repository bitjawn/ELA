$(document)
.ready(function(){
  $('.view-article').on('click', function(){
    var $aId = $(this).data('id');
    var $uId = $('.user-id').data('user');
    var $IDs = $aId + ';' + $uId;

    var $url = '/articles/article/' + $IDs;

    $.ajax({
      type:'GET',
      url:$url,
      success:function(response) {
        window.location.href='article/' + $IDs;
      },
      error: function(err) {
        console.log(err);
      }
    });

  });

  // $('.private').val($('.show').is(':checked'));

  $('.show').change(function(){
    $('.private').val($(this).is(':checked'));
  });

  // $('.edit-private').val($('.edit-show').is(':checked'));

  $('.cancel-edit').on('click', function(){
    $url = '/articles/list';
    $.ajax({
      url:$url,
      type:'GET',
      success:function(response) {
        window.location.href = $url;
      },
      error:function(err) {
        console.log(err);
      }
    });
  });

  $('.delete-article').on('click', function(){
    $aId = $(this).data('id');
    $url = '/articles/article/delete/' + $aId;

    if (confirm('Are you sure you want to delete this article?')) {
      $.ajax({
        url:$url,
        type:'DELETE',
        success:function(response) {
          window.location.href = '/articles/list';
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });

  // $('.edit-show').change(function(){
  //   $('.edit-private').val($(this).is(':checked'));
  // });

  $('#textInput').on('click', function(){
    addTextInput();
  });

  $('#passwordInput').on('click', function(){
    addPasswordInput();
  });

  $('#emailInput').on('click', function(){
    addEmailInput();
  });



})
.foundation()

function addTextInput() {
	var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('reg-form')) + 1,
        name = 'input' + count;

    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

    /*

        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fi-pencil', italic);

    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'text', input);
    addAttribute('id', name, input);

	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);

	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('reg-form').removeChild(divParent);
	});

    $(italic).appendTo(span);
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.registration-form');
}

function addPasswordInput() {
    var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('reg-form')) + 1,
        name = 'input' + count;

    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

    /*

        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fi-lock', italic);

    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'password', input);
    addAttribute('id', name, input);

	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);

	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('reg-form').removeChild(divParent);
	});

    $(italic).appendTo(span);
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.registration-form');
}

function addEmailInput() {
	var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('reg-form')) + 1,
        name = 'input' + count;

    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

    /*

        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fi-mail', italic);

    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'email', input);
    addAttribute('id', name, input);

	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);

	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('reg-form').removeChild(divParent);
	});

    $(italic).appendTo(span);
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.registration-form');
}
