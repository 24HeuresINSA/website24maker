$( document ).ready(function() {

	var newColHtml = '<div class="btn-group pull-right">' +
		'<button id="bEdit" type="button" class="btn btn-black p-2"  onclick="rowEdit(this);">' +
		'Modifier <i class="ion ion-edit m-1"></i>' +
		'</button>' +
		'<button id="bElim" type="button" class="btn btn-white p-2"  onclick="rowElim(this);">' +
		'<i class="ion ion-trash-a m-1" aria-hidden="true"></i>' +
		'</button>';

	var cont1, cont2, cont3, cont4;

	$('tbody tr').each(function(index){
		$(this).find('.buttonRaw').append(newColHtml);
	});

	rowEdit = function (but) {
		var $row = $(but).parents('tr');
		var uuid = $row.find('.idRaw').html();
		$.ajax({
			type: "GET",
			url: "/courses/coureur/"+uuid,
			complete: function (xhr, status, errorThrown) {
				if (xhr.status == 200) {
					var data = JSON.parse(xhr.responseText);
					$(".update-coureur input[name='coureur_prenom']").val(data.coureur_prenom);
					$(".update-coureur input[name='coureur_id']").val(data.coureur_id);
					$(".update-coureur input[name='coureur_nom']").val(data.coureur_nom);
					$(".update-coureur select[name='coureur_etudiant']").val(data.coureur_etudiant);
					$(".update-coureur input[name='coureur_commentaire']").val(data.coureur_commentaire);
					$(".update-coureur input[name='coureur_telephone']").val(data.coureur_telephone);
					$(".update-coureur input[name='coureur_email']").val(data.coureur_email);
					$(".update-coureur input[name='coureur_date_naissance']").val(data.coureur_date_naissance);
					$(".update-coureur select[name='coureur_taille_tee_shirt']").val(data.coureur_taille_tee_shirt);
					$('#modalEdit').modal({
						show: true
					});
				} else {

				}
			}
		});

	}

	/*$('.submit').on('submit', function(event){
		event.preventDefault();
		var formData = $('form').serializeArray();

		if(formData[1].value != formData[2].value){
			$('.errorMessage').removeClass('d-none');
			$('.errorMessage').text('The passwords are not similar');
		}else{
			$('.errorMessage').addClass('d-none');
		}
		if(formData[3].value != formData[4].value){
			$('.errorMessage').removeClass('d-none');
			$('.errorMessage').text('The decrypt key are not similar');
		}else{
			$('.errorMessage').addClass('d-none');
		}

		var ladata = {
			user_login: formData[0].value,
			user_password: formData[1].value,
			user_passwordB: formData[2].value,
			user_public_key: formData[3].value,
			user_public_keyB: formData[4].value,
			user_email: formData[5].value
		};

		$.ajax({
			type: "POST",
			url: "/user",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(ladata),
			complete: function(xhr, status, errorThrown){
				console.log("Status : "+xhr.status);
				console.log("Response : "+xhr.responseText);
				if(xhr.status == 201){
					$('.errorMessage').addClass('d-none');
					$('#exampleModalCenter').modal({
						show: true
					});
					setTimeout(function(){
						window.location = "/login";
					}, 4000);
				}else if(xhr.status == 400 || xhr.status == 409){
					$('.errorMessage').removeClass('d-none');
					$('.errorMessage').text(JSON.parse(xhr.responseText).message);
				}else{
					$('.errorMessage').removeClass('d-none');
					console.log(JSON.parse(xhr.responseText).message);
				}
			}
		});

	});*/

	rowElim = function (but) {
		var $row = $(but).parents('tr');
		$row.attr('id', 'editing');
		var uuid = $row.find('.idRaw').html();

		$('#modalConfirmDelete').modal({
			show: true
		});

		$('#btnNO').click(function(){
		});

		$('#btnYES').click(function(){
			$row.remove();
			$.ajax({
				type: "DELETE",
				url: "/courses/supprimer-coureur/"+uuid,
				complete: function (xhr, status, errorThrown) {
					if (xhr.status == 204) {
						window.location = "/courses/connexion";
					} else if (xhr.status == 400 || xhr.status == 409) {

					} else {

					}
				}
			});
		});

	}

});