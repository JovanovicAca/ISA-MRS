Vue.component("SupplierAcceptingOffers",{
	data: function () {
	    return {
	      appsDisplay: null,
		  res: null,
          user: {

            }
	    }
       
	},
	    
	    template : ` 
<div>
	    		<h1>Active pharmacy requests</h1>
	    	<div>
	    	<button v-on:click = "searchName()">Search</button><input id="search" v-model="searchName" type="text">
	    	</div>
	    	<div style="overflow-y: scroll;">
	    		<table id="appstable" width="1000px">
					<tr><th>Drugs</th><th>End Time</th><th> </th></tr>
					<tr v-for="ap in appsDisplay">
					<td>{{ap.drugs}}</td><td>{{ap.endTime}}</td><td><button v-on:click="makeOffer(ap.id)" class="table-btn">Offer</button></td></td>
					</tr>
	    		</table>
	    	</div>
	    	<div>
            <button v-on:click="goBack()" class="table-back">Back</button>
            </div>

</div>
`
	,
	methods : {

		searchName: function(){
			if(this.search != ""){
				return this.appsDisplay.filter((item) => {
					return this.search && this.search.toLowerCase().split(' ').every(i => ap.drugs.toLowerCase().includes(i))
				})
			}else{
				return this.appsDisplay;
			}
		},

        makeOffer: function(id){
			localStorage.setItem('offerID', JSON.stringify(id))
			this.$router.push("/supplierOffer")
		},

		load : async function(){
			this.appsDisplay = new Array();
			await axios
				.get("/supplier/showPharmacyOffers/")
				.then(response => (this.res = response.data))
				
				this.appsDisplay = this.res.slice();

		},

		goBack: function(){
            this.$router.push("/supplierHome")
        },
		
	},
	filters: {
    	
   	},

	mounted(){
        
		this.load();
		
	},
	
});