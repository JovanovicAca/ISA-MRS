Vue.component("AddDrug", {
    data: function() {
        return {
			bool: "",
			user:{

			},
            drug: {
                id: "",
				drugCode: "", // Kod leka
                name: "",
				instruction: "",
				type: "", // Tip leka
				shape: "", // Oblik leka, pr. prasak
				ingredients: "", // Sastav/Sastojci
				contradiction: "", // Kontradikcije
				takingDose: "", // Preporucen unos
				
            },
			replacementDrugs: "", // Zamenski lek/lekovi
        }
    },


    template: ` 
		<div>
		<div id="form">
		<link rel="stylesheet" href="CSS/adminregistrations.css" type="text/css">
		<h1> Add Drug </h1>
		<form>
	
			 <table id="tabela">
							
	 	    			<tr>
	 	    				<td>Name: </td>
	 	    				<td><input type="text" name="ime" v-model="drug.name" id="ajdi"></td>
	 	    			</tr>
						<tr>
	 	    				<td>Drug Code: </td>
	 	    				<td><input type="text" v-model="drug.drugCode" id="kod"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Drug Instruction: </td>
	 	    				<td><input type="text" v-model="drug.instruction" id="ins"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Drug Type: </td>
	 	    				<td><input type="text" v-model="drug.type" id="tip"></td>
	 	    			</tr> 
						<tr>
	 	    				<td>Drug Shape: </td>
	 	    				<td><input type="text" v-model="drug.shape" id="oblik"></td>
	 	    			</tr> 
						<tr>
							<td>Drug Ingredients: </td>
							<td><input type="text" v-model="drug.ingredients" id="sastojci"></td>
					 	</tr> 
						<tr>
							<td>Drug Contradictions: </td>
							<td><input type="text" v-model="drug.contradiction" id="contra"></td>
					    </tr>	
						<tr>
							<td>Drug Recommended Daily Doses: </td>
							<td><input type="text" v-model="drug.takingDose" id="tak"></td>
					 	</tr>
						 <tr>
							<td>Replacement Drug(s) (Use drug codes): </td>
							<td><input type="text" v-model="replacementDrugs" id="rep" placeholder="Format: Drug1, Drug2..."></td>
					  	</tr>   	   	    			
						<div>
                		<button type = "submit" v-on:click="post" class="but">Add</button>
            			</div>
						<div>
                		<button type = "submit" v-on:click="back" class="back">Back</button>
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
		back : function(){
			this.$router.push("/systemAdminHome")
		},
		isInt: function(value) {
			return !isNaN(value) && 
					parseInt(Number(value)) == value && 
					!isNaN(parseInt(value, 10));
		},
        post: function() {

			var ajdi = $('#ajdi').val();
			var ins = $('#ins').val();
			var tip = $('#tip').val();
			var oblik = $('#oblik').val();
			var sastojci = $('#sastojci').val();
			var contra = $('#contra').val();
			var tak = $('#tak').val();
			var rep = $('#rep').val();
			var kod = $('#kod').val();

            if(ajdi==''){
				$('#dialogMes').html('Empty name field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(kod==''){
				$('#dialogMes').html('Empty code field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(ins==''){
				$('#dialogMes').html('Empty instruction field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(tip==''){
				$('#dialogMes').html('Empty type field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(oblik==''){
				$('#dialogMes').html('Empty shape field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(sastojci==''){
				$('#dialogMes').html('Empty ingredients field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(contra==''){
				$('#dialogMes').html('Empty contradiction field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(tak==''){
				$('#dialogMes').html('Empty taking dose field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(!tak === this.isInt(tak)){
				$('#dialogMes').html('Taking dose field input must be number!');
				$('#dialog').dialog("open");
				return;
			}
			if(this.replacementDrugs == ""){
				this.replacementDrugs = "No drugs"
			}
            axios
                .post("/admin/addDrug/" + this.replacementDrugs, this.drug)
				.then(response => {
					console.log(this.response)
					this.bool = response.data
					if(!this.bool){
						$('#dialogMes').html('Error adding drug');
		    			$('#dialog').dialog("open");
					}else{
						$('#dialogMes').html('Drug added successfully');
		    			$('#dialog').dialog("open");
						window.location.reload()
					}
					
				})
        	}
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