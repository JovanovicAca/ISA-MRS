Vue.component("RegisterSupplier", {
    data: function() {
        return {
            supplier: {
                name: "",
                surname: "",
                email: "",
                password: "",
                address: "",
                city: "",
                country: "",
                number: "",
                role: "SUPPLY"
            }
        }
    },


    template: ` 
		<div>
		<div id="form">
		<link rel="stylesheet" href="CSS/adminregistrations.css" type="text/css">
		<h1> Register Supplier </h1>
		<form>
	
			 <table id="tabela">
	 	    			<tr>
	 	    				<td>Name: </td>
	 	    				<td><input type="text" name="ime" v-model="supplier.name" id="ime"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Surname: </td>
	 	    				<td><input type="text" v-model="supplier.surname" id="prezime"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Email: </td>
	 	    				<td><input type="text" v-model="supplier.email" id="mail"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Password: </td>
	 	    				<td><input type="text" v-model="supplier.password" id="sifra"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Address: </td>
	 	    				<td><input type="text" v-model="supplier.address" id="adresa"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>City: </td>
	 	    				<td><input type="text" v-model="supplier.city" id="grad"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Country: </td>
	 	    				<td><input type="text" v-model="supplier.country" id="drzava"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Number: </td>
	 	    				<td><input type="text" v-model="supplier.number" id="broj"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Role will be supplier. </td>	 	    				
	 	    			</tr>
	 	    		
					<div>
                		<button type = "button"  v-on:click="submitForm" class="but">Register</button>
            		</div>
					<div>
                		<button type = "button"  v-on:click="back" class="back">Back</button>
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
        submitForm: function() {

			var ime = $('#ime').val();
			var prezime = $('#prezime').val();
			var mail = $('#mail').val();
			var sifra = $('#sifra').val();
			var adresa = $('#adresa').val();
			var grad = $('#grad').val();
			var drzava = $('#drzava').val();
			var broj = $('#broj').val();
            
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
            axios // Prob sa refreshovanjem kod polja name -> resenje type="button"
                .post("/admin/registerSupplier", this.supplier)
				.then(response => {
					console.log(this.response)
					this.bool = response.data
					if(!this.bool){
						$('#dialogMes').html('Cannot add new user. Check details and try again');
		    			$('#dialog').dialog("open");
					}else{
						$('#dialogMes').html('Admin added successfully');
		    			$('#dialog').dialog("open");
						window.location.reload()
					}
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