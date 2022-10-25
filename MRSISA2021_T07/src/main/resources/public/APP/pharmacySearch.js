Vue.component("PharmacySearch",{
	data: function () {
	    return {
	    	name : "",
	    	listaApoteka:[],
	    	searchData : "",
			stalnaListaApoteka: [],
	    	
	    }
	},
	    
	    template : ` 
    		<div id="search-div">
	    		<link rel="stylesheet" href="CSS/pharmacySearch.css" type="text/css">
		    	<h1 id="h1-search">Search Pharmacies</h1>
		    		
				<input type="text" class="pharmaSearch-src" v-model="name" @keyup="getLetter"  placeholder="Search pharmacies by name/address..."/>

	    		<h2>Search Results</h2>
	    		<div class="searchBoxEdge">
	    			<div class="searchBoxInfo" id="searchBoxInfoID">
					<div class="searchPharma-item" v-for="apoteka in listaApoteka">
                    <div class = "searchPharma-image" style="background-image: url(RES/IMG/pharmacyLogo.png)"></div>
                        <div class= searchPharma-text>
                            <ul>
                                <li>Name: {{apoteka.name}}</li>
                                <li>Address: {{apoteka.address}}</li>
                                <li v-if="apoteka.rating === 0"> No Ratings Yet ! </li>
                                <li v-else>Rating: {{apoteka.rating.toFixed(2)}}</li>
                            </ul>
                        </div>
                    </div>
		    		</div>
	    		</div>
	    		<button id="homeBtnSearch" type="submit" v-on:click="goHome">Home Page</button>
    		</div>		  
`
	,
	methods : {
		search : function(){
			
			if(this.searchData == "")
			{
				this.getAllPharmacies();
				return;
			}
		
			let validApoteke = [];

            this.searchData = this.searchData.toLowerCase();
            for (let i = 0; i < this.stalnaListaApoteka.length; i++) {
                this.stalnaListaApoteka[i].name = this.stalnaListaApoteka[i].name.toLowerCase();
                this.stalnaListaApoteka[i].address = this.stalnaListaApoteka[i].address.toLowerCase();
                if (this.stalnaListaApoteka[i].name.substring(0, this.searchData.length) == this.searchData || this.stalnaListaApoteka[i].address.substring(0, this.searchData.length) == this.searchData) {
                    validApoteke.push(this.stalnaListaApoteka[i]);
                }
            }
            this.viewSearch(validApoteke);
		},
		
		getLetter: function(event)
		{
			if(event.keyCode == 8)
			{
				this.searchData = this.searchData.slice(0,-1);
				if(this.name == "")
				{
					this.searchData = "";
				}
			}
			else if(event.keyCode < 47 || event.keyCode > 91)
			{
				if(event.keyCode == 32)
				{
					this.searchData += event.key 
				}
				return;
			}
			else
			{
				this.searchData += event.key 
			}
			this.search();
		},
		
		viewSearch: function(apoteke)
		{
			this.listaApoteka = [];
            for(let i = 0 ; i < apoteke.length ; i++)
            {
                let name = apoteke[i].name.split(" ")[0].charAt(0).toUpperCase() + apoteke[i].name.split(" ")[0].slice(1);
                let surname = apoteke[i].name.split(" ")[1].charAt(0).toUpperCase() + apoteke[i].name.split(" ")[1].slice(1);
                apoteke[i].name = name + " " + surname;

                let address0 = apoteke[i].address.split(" ")[0].charAt(0).toUpperCase() + apoteke[i].address.split(" ")[0].slice(1);
                let address1 = apoteke[i].address.split(" ")[1].charAt(0).toUpperCase() + apoteke[i].address.split(" ")[1].slice(1) + " " + apoteke[i].address.split(" ")[2];
                apoteke[i].address = address0 + " " + address1;

                this.listaApoteka.push(apoteke[i]);
            }
		},
		
		goHome: function()
		{
			this.$router.push("/patientHome")
		},
		
		getAllPharmacies : function()
		{
			axios
			.get("/pharma/getAllPharmacies")
			.then(response => {
				this.listaApoteka = response.data;
				this.stalnaListaApoteka = this.listaApoteka;
			})
		},
	},
	mounted(){
		this.getAllPharmacies();
	}
});