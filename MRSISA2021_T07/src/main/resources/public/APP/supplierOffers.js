Vue.component("SupplierOffers",{
	data: function () {
	    return {
	      appsDisplay: null,
		  resDTO: null,
		  search: "",
          user: {

            }
	    }
       
	},
	    
	    template : ` 
<div>
	    		<h1>Your past offers</h1>
	    	<div>
	    	<button v-on:click = "searchName()">Search by drug names</button><input v-model="search" id="search" type="text">
	    	</div>
	    	<div style="overflow-y: scroll;">
	    		<table id="appstable" width="1000px">
					<tr><th>ID</th><th>Price</th><th>Order</th><th>Status</th></tr>
					<tr v-for="ap in appsDisplay">
					<td>{{ap.id}}</td>{{ap.price}}<td>{{ap.drugs}}</td><td>{{ap.approved}}</td></td>
					</tr>
	    		</table>
	    	</div>
			<div>
            <button v-on:click="goBack()" class="table-back2">Back</button>
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

		load : async function(){
			this.user = JSON.parse(localStorage.getItem('user'))
			this.appsDisplay = new Array();
			await axios
				.get("/supplier/getPastOffers/" + this.user.email)
				.then(response => (this.resDTO = response.data))
				
				this.appsDisplay = this.resDTO.slice();

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