Vue.component("AddRank", {
    data: function() {
        return {
            appsDisplay: null,
            loyaltyRule: {
                lowPoints: "",
                highPoints: "",
                discount: "",
                rank: "",
            }
        }
    },


    template: ` 
		<div>
		<div id="form">
		<link rel="stylesheet" href="CSS/adminregistrations.css" type="text/css">
		<h1> Add new rank </h1>
		<form>
	
			 <table id="tabela">
							
	 	    			<tr>
	 	    				<td>Rank Name: </td>
	 	    				<td><input type="text" name="ime" v-model="loyaltyRule.rank" id="rankovi"></td>
	 	    			</tr>
						 <tr>
	 	    				<td>Min points for rank: </td>
	 	    				<td><input type="text" name="ime" v-model="loyaltyRule.lowPoints" id="dpoen"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Max points for rank: </td>
	 	    				<td><input type="text" v-model="loyaltyRule.highPoints" id="gpoen"></td>
	 	    			</tr>
	 	    			<tr>
	 	    				<td>Discount for rank: </td>
	 	    				<td><input type="text" v-model="loyaltyRule.discount" id="snizenje"></td>
	 	    			</tr> 
					   	    			
						<div>
                		<button type = "submit" v-on:click="post" class="but">Add Rank</button>
            			</div>
						<div>
                		<button type = "submit" v-on:click="back" class="back">Back</button>
            			</div>
	 	    		</table>
	 	    	</form>
			</div>	
           
            <div>
            <h1>All avaliable ranks in the system</h1>
	    	<div style="overflow-y: scroll;">
	    		<table id="appstable" width="1000px">
					<tr><th>Rank</th><th>Low Points<th>High Points</th><th>Discount</th><th></th>
					<tr v-for="ap in appsDisplay">
					<td>{{ap.rank}}</td><td>{{ap.lowPoints}}</td><td>{{ap.highPoints}}</td><td>{{ap.discount}}</td><td><button v-on:click="del(ap.id, ap.rank)" class="table-btn">Delete Rank</button></td>
					</tr>
	    		</table>
	    	</div>
            </div>
			<div id="dialog" title="Notification">
	    	<p id="dialogMes"></p>
	    	</div>
		 </div>		  
	 `,

    methods: {	
        del : function(id, name){
			axios
				.post("/loyal/delete/" + id)
				.then(response => (this.appsDisplay = response.data))
				$('#dialogMes').html('Successfully deleted rank ' + name);
	    		$('#dialog').dialog("open");
				window.location.reload()

		},
		isInt: function(value) {
			return !isNaN(value) && 
					parseInt(Number(value)) == value && 
					!isNaN(parseInt(value, 10));
		},		
		back : function(){
			this.$router.push("/systemAdminHome")
		},
        post: function() {

			var rankovi = $('#rankovi').val();
			var dpoen = $('#dpoen').val();
			var gpoen = $('#dpoen').val();
			var snizenje = $('#snizenje').val();

			if(rankovi==''){
				$('#dialogMes').html('Empty rank field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(dpoen==''){
				$('#dialogMes').html('Empty min points field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(gpoen==''){
				$('#dialogMes').html('Empty max points field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(snizenje==''){
				$('#dialogMes').html('Empty discount field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(!dpoen === this.isInt(dpoen)){
				$('#dialogMes').html('Minimal points field must be number!');
				$('#dialog').dialog("open");
				return;
			}
			if(!gpoen === this.isInt(gpoen)){
				$('#dialogMes').html('Maximal points field must be number!');
				$('#dialog').dialog("open");
				return;
			}
            axios
                .post("/admin/addRank", this.loyaltyRule)
				.then(response => {
					console.log(this.response)
					this.bool = response.data
					if(!this.bool){
						$('#dialogMes').html('Cannot add new rank. Check details and try again');
		    			$('#dialog').dialog("open");
					}else{
						$('#dialogMes').html('New rank added successfully');
		    			$('#dialog').dialog("open");
					    rankovi = ''
						dpoen = ''
						gpoen = ''
						snizenje = ''
					}
				})
        },
        load : async function(){
			//this.user = JSON.parse(localStorage.getItem('user'))
			await axios
				.get("/loyal/getRanks")
				.then(response => (this.appsDisplay = response.data))

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

		this.load();
		
	},


});