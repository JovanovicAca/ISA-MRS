Vue.component("RegisterPharmacist", {
    data: function() {
        return {
            pharmacist: {
                name: "",
                surname: "",
                email: "",
                password: "",
                address: "",
                city: "",
                country: "",
                number: "",
                role: "PHARMA"
            },
			employment:{
				startHours: "",
				endHours: ""
			},
			listaApoteka:[],
			apotekaID: "",
        }
    },


    template: ` 
		<div>
		<div id="form">
		<link rel="stylesheet" href="CSS/adminregistrations.css" type="text/css">
		<h1> Register Pharmacist </h1>
			<form>
	
			 <table id="tabela">
	 	    			<tr>
	 	    				<td>Name: </td>
	 	    				<td><input type="text" name="ime" v-model="pharmacist.name" id="ime"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Surname: </td>
	 	    				<td><input type="text" v-model="pharmacist.surname" id="prezime"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Email: </td>
	 	    				<td><input type="text" v-model="pharmacist.email" id="mail"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Password: </td>
	 	    				<td><input type="text" v-model="pharmacist.password" id="sifra"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Address: </td>
	 	    				<td><input type="text" v-model="pharmacist.address" id="adresa"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>City: </td>
	 	    				<td><input type="text" v-model="pharmacist.city" id="grad"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Country: </td>
	 	    				<td><input type="text" v-model="pharmacist.country" id="drzava"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Number: </td>
	 	    				<td><input type="text" v-model="pharmacist.number" id="broj"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Role will be pharmacist. </td>	 	    				
	 	    			</tr>
						
						<tr>
	 	    				<td>Start Hours: </td>
	 	    				<td><input type="text" v-model="employment.startHours" id="start"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>End Hours: </td>
	 	    				<td><input type="text" v-model="employment.endHours" id="end"></td>
	 	    			</tr>

	 	    			<br> </br>
						<label>Select pharmacist's new workplace: </label>
						<br> </br>

						<div style="overflow-y: scroll;">
						<table>
							<tr><th>Pharmacy Name</th><th></th>
							<tr v-for="pharma in listaApoteka">
							<td>{{pharma.name}}</td><td><button type="button" v-on:click="sub(pharma.id, pharma.name)">Works</button></td>
							</tr>
						</table>
						</div>
					<div>
                		<button type = "button" v-on:click="submitForm" class="but">Register</button>
            		</div>
					<div>
                		<button type = "button" v-on:click="back" class="back">Back</button>
            		</div>
					</table>
	 	    	</form>
		 </div>	
		 <div id="dialog" title="Notification">
	    	<p id="dialogMes"></p>
	     </div>			
	 </div>		  
	 `,
    methods: {
		isInt: function(value) {
			return !isNaN(value) && 
					parseInt(Number(value)) == value && 
					!isNaN(parseInt(value, 10));
		},		
		sub : function(id, name){
			this.apotekaID = id;
			$('#dialogMes').html('Dermatologist will work in pharmacy with name: ' + name);
			$('#dialog').dialog("open");
		},
        submitForm: function() {
				var bool = false
				var ime = $('#ime').val();
				var prezime = $('#prezime').val();
				var mail = $('#mail').val();
				var sifra = $('#sifra').val();
				var adresa = $('#adresa').val();
				var grad = $('#grad').val();
				var drzava = $('#drzava').val();
				var broj = $('#broj').val();
				var start = $('#start').val();
				var end = $('#end').val();
				
				if(ime==''){
					$('#dialogMes').html('Empty name field!');
					$('#dialog').dialog("open");
					return;
				}
				if(prezime==''){
					$('#dialogMes').html('Empty surname field!');
					$('#dialog').dialog("open");
					return;
				}
				if(mail==''){
					$('#dialogMes').html('Empty email field!');
					$('#dialog').dialog("open");
					return;
				}
				if(sifra==''){
					$('#dialogMes').html('Empty password field!');
					$('#dialog').dialog("open");
					return;
				}
				if(adresa==''){
					$('#dialogMes').html('Empty address field!');
					$('#dialog').dialog("open");
					return;
				}
				if(grad==''){
					$('#dialogMes').html('Empty city field!');
					$('#dialog').dialog("open");
					return;
				}
				if(drzava==''){
					$('#dialogMes').html('Empty country field!');
					$('#dialog').dialog("open");
					return;
				}
				if(broj==''){
					$('#dialogMes').html('Empty number field!');
					$('#dialog').dialog("open");
					return;
				}
				if(start==''){
					$('#dialogMes').html('Empty start hours field!');
					$('#dialog').dialog("open");
					return;
				}
				if(end==''){
					$('#dialogMes').html('Empty end hours field!');
					$('#dialog').dialog("open");
					return;
				}
				if(!broj === this.isInt(broj)){
					$('#dialogMes').html('Number field input must be number!');
					$('#dialog').dialog("open");
					return;
				}
				if(!start === this.isInt(start)){
					$('#dialogMes').html('Start hours field input must be number!');
					$('#dialog').dialog("open");
					return;
				}
				if(!end === this.isInt(end)){
					$('#dialogMes').html('End hours field input must be number!');
					$('#dialog').dialog("open");
					return;
				}

				if(end < 0 || end > 24 || start < 0 || start > 24){
					$('#dialogMes').html('Start and End hours must be between 00h and 24h!');
					$('#dialog').dialog("open");
					return;
				}

				if(this.apotekaID === ""){
					$('#dialogMes').html('You must select pharmacy where will new dermatologist work!');
					$('#dialog').dialog("open");
					return;
				}

            axios
                .post("/admin/registerPharmacist/" + this.apotekaID + "/" + this.employment.startHours + "/" + this.employment.endHours, this.pharmacist)
				.then(response => {
					//console.log(this.response)
					this.bool = response.data
					if(!this.bool){
						$('#dialogMes').html('Cannot add new pharmacist. Check details and try again');
		    			$('#dialog').dialog("open");
					}else{
						$('#dialogMes').html('Successfully added new pharmacist!');
		    			$('#dialog').dialog("open");
						window.location.reload()
					}

				})
			},
			back : function(){
				this.user = JSON.parse(localStorage.getItem('user'))
				if(this.user.adminType === "SYSTEM"){
					this.$router.push("/systemAdminHome")
				}else{
					this.$router.push("/pharmaAdminHome")
				}			
			},
			getAllPharmacies : function()
			{
				axios
				.get("/pharma/getAllPharmacies")
				.then(response => {	
					this.listaApoteka = response.data;		
				})
			},
    },
	mounted(){

		try{
			this.user = JSON.parse(localStorage.getItem('user'));
			
			if(this.user.role != "ADMIN"){
				if(this.user.role === "PATIENT"){
					this.$router.push("/patientHome")
				}
				if(this.user.role === "SUPPLY"){
					this.$router.push("/supplierHome")
				}
				if(this.user.role === "PHARMA"){
					this.$router.push("/employeeHome")
				}
				if(this.user.role === "DERMA"){
					this.$router.push("/employeeHome")
				}
			}
		}
		catch{
			this.$router.push("/")
		}

		var dialog
			dialog = $('#dialog').dialog({
				autoOpen: false,
				resizable: false,
				draggable: false,
				height: 200,
				width: 250,
				modal: true,
				buttons: {
				Ok: function(){
					dialog.dialog("close");
				},	
				}});


		this.getAllPharmacies();
	}

});