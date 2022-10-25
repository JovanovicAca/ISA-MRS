Vue.component("RegisterPharmacy", {
    data: function() {
        return {
            pharmacy: {

            }
        }
    },

    template: ` 

	<div>
	<div id="form">
	<link rel="stylesheet" href="CSS/adminregistrations.css" type="text/css">
	<h1> Register Pharmacy </h1>
	<form>

		 <table id="tabela">
	    			<tr>
	    				<td>Name: </td>
	    				<td><input type="text" name="ime" v-model="pharmacy.name" id="ime"></td>
	    			</tr>
	    			<tr>
	    				<td>Address: </td>
	    				<td><input type="text" v-model="pharmacy.address" id="adresa"></td>
	    			</tr>
                    <div>
                		<button type = "submit"  v-on:click="submit" class="but">Submit</button>
            		</div>
                    <div>
                		<button type = "submit"  v-on:click="back" class="but">Back</button>
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
        submit: function() {

			var ime = $('#ime').val();
			var adresa = $('#adresa').val();
			if(ime==''){
				$('#dialogMes').html('Empty name field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(adresa==''){
				bool = response.data
					if(!bool){
						$('#dialogMes').html('Error adding pharmacy!');
						$('#dialog').dialog("open");
					}else{
						$('#dialogMes').html('Successfully added pharmacy!');
						$('#dialog').dialog("open");
						return;
					}
				
			}
            axios
                .post("/admin/registerPharmacy", this.pharmacy)
                .then(response => {
					$('#dialogMes').html('Pharmacy successfully added!');
					$('#dialog').dialog("open");
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