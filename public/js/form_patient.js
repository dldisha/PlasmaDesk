
  function addpatient(h){
    firebase.database().ref('patient/' + h.id).set(h);
  }
  $(function(){

        var check = true;
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
              check =false;
              //alert("event js listener activated");
            }
            else{check=true;}
            form.classList.add('was-validated');
          },false);
        });

       $("form").submit(function(){
        if(check)
        {
          var patient = {

            id: Date.now(),
            date: Date(Date.now()),

      
            patientName: $("#v7").val(),
            mobileNumber: $("#v8").val(),
            emailAddress: $("#v9").val(),
            age: $("#v10").val(),
            gender: $("#v11").val(),
            city: $("#cityId").val(),
            state: $("#stateId").val(),
            country: $("#countryId").val(),
            hospitalName: $("#v14").val(),
            bloodGroup: $("#v15").val()
          };

          addpatient(patient);
          alert("Patient Form Submitted Successfully !");
        }
        else
        {
          alert("Please Try Again");
        }
      });
    });
  
  var addpatientref = firebase.database().ref().child("patient");
    addpatientref.on("value", function(snapshot) {
        $("#show-patient").empty();
        //var patientHTMLitem = "<h3>Patient List</h3>"
        var patientHTMLitem = '<div class="container pt-4">'
        patientHTMLitem += '<div class="row">'
        snapshot.forEach(function(childsnapshot){
          var item = childsnapshot.val();
          patientHTMLitem += '<div class="col-12 col-sm-6 p-5">'
          patientHTMLitem += '<div class="card bg-light mb-3 border-dark" style="max-width: auto;">';//1
          patientHTMLitem += '<div class="card-header text-center bg-dark">'
          patientHTMLitem += '  <ul class="nav nav-tabs card-header-tabs">'
          patientHTMLitem += '  <li class="nav-item mr-auto"><a class="nav-link bg-light text-success" role="button" data-toggle="collapse" aria-expanded="true" href="#active">Active</a></li>'
          patientHTMLitem += '  <div class="text-white"><h5>Patient Card</h5></div>'
          patientHTMLitem += '  <li class="nav-item ml-auto"><a class="nav-link bg-light text-primary" role="button" data-toggle="collapse" aria-expanded="true" href="#info">Info</a></li>'
          patientHTMLitem += '  </ul>'
          patientHTMLitem += '</div>'

          patientHTMLitem += "<div id='active'>"
          patientHTMLitem +=  '<div class="card-body text-dark text-center pr-5">'//2
          patientHTMLitem +=    "<div class='card-text text-left pt-4'><ul>";//3
          patientHTMLitem +=      "<li><b> Donor Name : </b><span>"+ item.patientName + "</span></li>"
          patientHTMLitem +=      "<li><b> Age : </b><span>"+ item.age + "</span></li>"
          patientHTMLitem +=      "<li><b> Gender : </b><span>"+ item.gender + "</span></li>"
          patientHTMLitem +=      "<li><b> Blood Group : </b><span>"+ item.bloodGroup + "</span></li>"
          patientHTMLitem +=      "<li><b> City : </b><span>"+ item.city + "</span></li>"
          patientHTMLitem +=      "<li><b> State : </b><span>"+ item.state + "</span></li>"
          patientHTMLitem +=      "<li><b> Country : </b><span>"+ item.country + "</span></li>"
          patientHTMLitem +=    "</ul></div>";//3
          patientHTMLitem +=  "</div>"
          patientHTMLitem += "</div>"

          patientHTMLitem += "<div class='collapse' id='info'>"
          patientHTMLitem +=  '<div class="card-body text-dark text-center pr-5">'//2
          patientHTMLitem += "<hr>"
          patientHTMLitem +=    '<h5 class="card-title text-danger pb-3"><b>More Info</b></h5>'
          patientHTMLitem +=    "<div class='card-text text-left'><ul>";//3
          patientHTMLitem += "<li><b> Hospital Name : </b><span>"+ item.hospitalName + "</span></li><br>"
          patientHTMLitem +=      "<li><b> Mobile Number : </b><span class='text-primary'>"+ item.mobileNumber + "</span></li>"
          patientHTMLitem +=      "<li><b> Email : </b><span class='text-primary'>"+ item.emailAddress + "</span></li>"
          patientHTMLitem +=    "</ul></div>";//3
          patientHTMLitem +=  "</div>"
          patientHTMLitem += "</div>"

          patientHTMLitem +=    "<button type='button' class='btn btn-outline-danger delete-patient btn-xl mx-2' id="+item.id+">Delete Patient</button>";
          patientHTMLitem +=    '<footer class="blockquote-footer text-center text-muted p-2">'
          
          patientHTMLitem +=    '</footer>'
          //donorHTMLitem +=  '</div>'//2
          patientHTMLitem += '</div>'//1
          patientHTMLitem += "</div>"

  
      });
      patientHTMLitem += "</div>"
      patientHTMLitem += "</div>"

      $("#show-patient").html(patientHTMLitem);
    });
  
    $(document).on("click", ".delete-patient", function(){
      var pass_key = window.prompt('ONLY admins are allowed to delete. Enter your admin key : ');
      if(pass_key == "admin@123"){
        alert("Accepted!");
        var donorID = $(this).attr('id');
      firebase.database().ref("donor/" + donorID).remove();
      alert("Deleted!");
    }else{
      alert("Unauthorized!");
      $(this).prop('disabled', true);
    }
    });