Vue.component("PatientSubscriptions",{
	data: function () {
	    return {
	      appsDisplay: null,
		  search: "",
          user: {

            }
	    }
       
	},
	    
	    template : ` 
<div>
	    	<h1>Your subscribed pharmacies</h1>
	    	<div style="overflow-y: scroll;">
	    		<table id="appstable" width="1000px">
					<tr><th>Pharmacy Name</th><th></th>
					<tr v-for="ap in appsDisplay">
					<td>{{ap.name}}</td><td><button v-on:click="unsubscribe(ap.id, ap.name)" class="table-btn">Unsubscribe</button></td>
					</tr>
	    		</table>
	    	</div>
			<br> </br>
			<div>
            <button v-on:click="goBack()" class="table-back">Back</button>
            </div>
	    	

</div>
`
	,
	methods : {
		
		unsubscribe : function(id, name){
			this.user = JSON.parse(localStorage.getItem('user'))
			axios
				.post("/PATIENT/unsubscribe/" + this.user.email + "/" + id)
				.then(response => (this.appsDisplay = response.data))
				alert("Successfully unsubscribed from " + name)
				window.location.reload()


		},

		load : async function(){
			this.user = JSON.parse(localStorage.getItem('user'))
			await axios
				.get("/PATIENT/getSubs/" + this.user.email)
				.then(response => (this.appsDisplay = response.data))

		},

		goBack: function(){
            this.$router.push("/viewProfile")
        },
		
	},
	
	mounted(){
        
		this.load();
		
	},
	
});