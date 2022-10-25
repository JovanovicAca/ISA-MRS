Vue.component("RegisterPharmacyAdmin", {
    data: function() {
        return {
            admin: {
                name: "",
                surname: "",
                email: "",
                password: "",
                address: "",
                city: "",
                country: "",
                number: "",
                role: "ADMIN",
                adminType: ""
            },
            listaApoteka:[],
        }
    },

    template: ` 
	    	<div>
			<div id="form">
			<link rel="stylesheet" href="CSS/adminregistrations.css" type="text/css">
			<h1> Register Admin </h1>
			<form>
			
	 	    		<table id="tabela">
	 	    			
	 	    			<tr>
	 	    				<td>Name: </td>
	 	    				<td><input type="text" name="ime" v-model="admin.name" id="ime"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Surname: </td>
	 	    				<td><input type="text" v-model="admin.surname" id="prezime"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Email: </td>
	 	    				<td><input type="text" v-model="admin.email" id="mail"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Password: </td>
	 	    				<td><input type="text" v-model="admin.password" id="sifra"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Address: </td>
	 	    				<td><input type="text" v-model="admin.address" id="adresa"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>City: </td>
	 	    				<td><input type="text" v-model="admin.city" id="grad"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Country: </td>
	 	    				<td><input type="text" v-model="admin.country" id="drzava"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Number: </td>
	 	    				<td><input type="text" v-model="admin.number" id="broj"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Role will be admin. </td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>AdminType: </td>
	 	    				<td>
								<select id="types">
									<option value="Pharmacy Admin"> Pharmacy Admin </option>
									<option value="System Admin"> System Admin </option>
								</select> 
							</td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Pharmacy ID (If new admin is a Pharmacy Admin): </td>
	 	    				<td><input type="text" v-model="admin.works" id="ajdi"></td>
	 	    			</tr>
						<div>
                		<button type = "button" v-on:click="post" class="but">Register</button>
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
        post: function() {
            
			var ajdi = $('#ajdi').val();
			var ime = $('#ime').val();
			var prezime = $('#prezime').val();
			var mail = $('#mail').val();
			var sifra = $('#sifra').val();
			var adresa = $('#adresa').val();
			var grad = $('#grad').val();
			var drzava = $('#drzava').val();
			var broj = $('#broj').val();

			var sel = document.getElementById("types").value
			console.log(sel)
            
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
			if(!broj === this.isInt(broj)){
				$('#dialogMes').html('Number field input must be number!');
				$('#dialog').dialog("open");
				return;
			}
			if (sel === "Pharmacy Admin") {
                this.admin.adminType = "PHARMA"
				if(ajdi==''){
					$('#dialogMes').html('Pharmacy admins id cannot be empty!');
					$('#dialog').dialog("open");
					return;
				}
            } else if (sel === "System Admin") {
                this.admin.adminType = "SYSTEM"
            } else {
                this.admin.adminType = "EMPTY"
            }
			console.log(this.admin.adminType)
            axios
                .post("/admin/registerAdmin", this.admin)
				.then(response => {
					console.log(this.response)
					bool = response.data
					if(!bool){
						$('#dialogMes').html('Cannot add new user. Check details and try again');
		    			$('#dialog').dialog("open");
					}else{
						$('#dialogMes').html('Admin added successfully');
		    			$('#dialog').dialog("open");
						window.location.reload()
					}
					window.location.reload()
				})
        },
		back : function(){
			this.$router.push("/systemAdminHome")
			
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

	},

});