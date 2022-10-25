Vue.component("SupplyProfile",{
	data: function () {
	    return {
	    	user: {
	    		
	    	}
	    }
	},
	    
	    template : ` 
<div>


	    	<link rel="stylesheet" href="CSS/profile.css" type="text/css">
	   <form>
	   
	    	<h1 id="h1-profile">Profile</h1>
	    		<table id="profile-table">
	    			<tr>
	    				<td>Name: </td>
	    				<td><input type="text" name="ime" v-model="user.name" id="ime"></td>
	    			</tr>
	    			<tr>
	    				<td>Surname: </td>
	    				<td><input type="text" v-model="user.surname" id="prezime"></td>
	    			</tr>
	    			<tr>
	    				<td>Email: </td>
	    				<td><input v-model="user.email" type="text" disabled></td>
	    			</tr>
	    			<tr>
	    				<td>Password: </td>
	    				<td><input type="text" v-model="user.password" id="sifra"></td>
	    			</tr>
	    			<tr>
	    				<td>Adress: </td>
	    				<td><input type="text" v-model="user.address" id="adresa"></td>
	    			</tr>
	    			<tr>
	    				<td>City: </td>
	    				<td><input type="text" v-model="user.city" id="grad"></td>
	    			</tr>
	    			<tr>
	    				<td>Country: </td>
	    				<td><input type="text" v-model="user.country" id="drzava"></td>
	    			</tr>
	    			<tr>
	    				<td><button v-on:click="goBack()">Home</button></td>
          				<td><button v-on:click="edit()" type="button">Edit</button></td>
	    			</tr>
	    		</table>
	    	</form>
			<div id="dialog" title="Notification">
	    	<p id="dialogMes"></p>
	        </div>		
</div>		  
`
	,
	methods : {
		isInt: function(value) {
			return !isNaN(value) && 
					parseInt(Number(value)) == value && 
					!isNaN(parseInt(value, 10));
		},		
		edit : function(){
            bool: false
			var ime = $('#ime').val();
			var prezime = $('#prezime').val();
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

			axios
			.put("/supplier/updateSupplier", this.user)
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data))
                if(response.data === null){
                    $('#dialogMes').html('Error updating credentials. Check details and try again');
		    		$('#dialog').dialog("open");
                }else{
                    $('#dialogMes').html('Successful edit of a profile.');
		    		$('#dialog').dialog("open");
					window.location.reload()
                }
                window.location.reload()
            })

		},
		goBack : function(){
			this.$router.push("/supplierHome")
		}
	},
	mounted(){
        this.user = JSON.parse(localStorage.getItem('user'))
		try{
			if(this.user.role != "SUPPLY"){
				if(this.user.role === "PATIENT"){
					this.$router.push("/patientHome")
				}
				if(this.user.role === "ADMIN"){
                    if(this.user.adminType === "SYSTEM"){
                        this.$router.push("/systemAdminHome")
                    }else{
                        this.$router.push("/pharmaAdminHome")
                    }			
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

		axios   
			.get("/supplier/getSupplier", this.user.email)
			.then(response => (this.user = response.data))
	},
	
	
});