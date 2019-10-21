$( document ).ready(function() {

	var newColHtml = '<div class="btn-group pull-right">' +
		'<button id="bEdit" type="button" class="btn btn-black p-2"  onclick="rowEdit(this);">' +
		'Modifier <i class="ion ion-edit m-1"></i>' +
		'</button>' +
		'<button id="bCertif" type="button" class="btn btn-color-b p-2"  onclick="rowCertif(this);">' +
		'Charger Certificat <i class="ion ion-edit m-1"></i>' +
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
					$(".update-coureur input[name='coureur_prenom']").val(data.participant_name);
					$(".update-coureur input[name='coureur_id']").val(data.participant_id);
					$(".update-coureur input[name='coureur_nom']").val(data.participant_surname);
					$(".update-coureur select[name='coureur_etudiant']").val(data.participant_student);
					$(".update-coureur input[name='coureur_commentaire']").val(data.participant_comment);
					$(".update-coureur input[name='coureur_telephone']").val(data.participant_telephone);
					$(".update-coureur input[name='coureur_email']").val(data.participant_email);
					$(".update-coureur input[name='coureur_date_naissance']").val(data.participant_birthdate);
					$(".update-coureur select[name='coureur_taille_tee_shirt']").val(data.participant_tee_shirt_size);
					$('#modalEdit').modal({
						show: true
					});
				} else {

				}
			}
		});

	}

	rowCertif = function (but) {
		var $row = $(but).parents('tr');
		var uuid = $row.find('.idRaw').html();
		$(".update-certificat input[name='coureur_id']").val(uuid);
		$('#modalCertificat').modal({
			show: true
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

	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

});