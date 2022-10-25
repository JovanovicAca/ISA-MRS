Vue.component("Subscribe",{
	data: function () {
	    return {
	    	email: "",
            password: "",
            user: [],
            name : "",
	    	listaApoteka:[],
	    	searchData : "",
	    }
	},
	    
	    template : ` 

        <div id="subMain">
		
		<h1> Choose Pharmacy To Subscribe </h1>

			<link rel="stylesheet" href="CSS/subscribe.css" type="text/css">
            <div id="pharmaList">
				<div id="help" v-for="pharma in listaApoteka">
					<div class = "searchPharma-item">
                        <div id = "img" style="background-image: url(RES/IMG/drug.png)"></div>
                            <div class= searchPharma-text>
                                <ul>
                                    <li>Name: {{pharma.name}}</li>
                                    <li><button id="but" v-on:click="sub(pharma.id, pharma.name)">Subscribe to pharmacy</button></li>
                                </ul>
                        	</div>
						</div>
                    </div>
				</div>
				<div>
				<button id="button-sub" v-on:click="goBack()">Back</button>
				</div>
        </div>
		
`
	,
	methods : {
		
		sub : function(id, name){
			
			this.user = JSON.parse(localStorage.getItem('user'))
			this.appsDisplay = new Array();
			
			axios
			.put("/PATIENT/subscribe/" + id, this.user)
                .then(response => {
					alert("Subscribed to " + name)
					window.location.reload()
				})

		},

		goBack: function(){
            this.$router.push("/patientHome")
        },

		search : function(){
			
			if(this.searchData == "")
			{
				this.getAllPharmacies();
				return;
			}
			
			let validApoteke = [];
			
			this.searchData = this.searchData.toLowerCase();
			for(let i = 0 ; i < this.listaApoteka.length; i++)
			{
				this.listaApoteka[i].name = this.listaApoteka[i].name.toLowerCase();
				this.listaApoteka[i].address = this.listaApoteka[i].address.toLowerCase();
				if(this.listaApoteka[i].name.substring(0,this.searchData.length) == this.searchData || this.listaApoteka[i].address.substring(0,this.searchData.length) == this.searchData)
				{
					validApoteke.push(this.listaApoteka[i]);
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
			document.getElementById('pharmaList').innerHTML = "";
			for(let i = 0 ; i < apoteke.length; i++)
			{
				let name = apoteke[i].name.split(" ")[0].charAt(0).toUpperCase() + apoteke[i].name.split(" ")[0].slice(1);
				let surname = apoteke[i].name.split(" ")[1].charAt(0).toUpperCase() + apoteke[i].name.split(" ")[1].slice(1);
				
				let address0 = apoteke[i].address.split(" ")[0].charAt(0).toUpperCase() + apoteke[i].address.split(" ")[0].slice(1);
				let address1 = apoteke[i].address.split(" ")[1].charAt(0).toUpperCase() + apoteke[i].address.split(" ")[1].slice(1) + " " + apoteke[i].address.split(" ")[2];
				
				apoteke[i].name = name + " " + surname;
				apoteke[i].address = address0 + " " + address1;

				document.getElementById('pharmaList').innerHTML += 
					'<div class = "searchPharma-item">'+
	    			'<div class = "searchPharma-image" style="background-image: url(RES/IMG/pharmacyLogo.png)"></div>'+
    					'<div class= searchPharma-text>'+
		    				'<ul>'+
	    						'<li>Name:  ' + apoteke[i].name+'</li>'+
	    						'<li>Address:  ' + apoteke[i].address+'</li>'+
	    					'</ul>'+
    					'</div>'+
					'</div >';
			}
		},
		
		getAllPharmacies : function()
		{
			axios
			.get("/pharma/getAllPharmacies")
			.then(response => {	
				this.listaApoteka = response.data;		
			})
		}
	},
	mounted(){
		this.user = JSON.parse(localStorage.getItem('user'))
		try{
			if(this.user.role != "PATIENT"){
				if(this.user.role === "SUPPLY"){
					this.$router.push("/supplierHome")
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

		this.getAllPharmacies();
	}
});