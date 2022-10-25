Vue.component("Home", {
    data: function() {
        return {
            email: "",
            password: "",
            user: [],
            authenticated: null,
            name: "",
            drug: "",
            listaApoteka: [],
            stalnaListaApoteka: [],
            searchData: "",
            searchDrugData: "",
            listaLekova: [],
            stalnaListaLekova: [],
        }
    },

    template: ` 
	  <div id="mainHome-div">
	    	<div id="mainHome-search">
				<button class="mainHome-pharmacyBtn"  type="submit" v-on:click="viewPharmacy()">Search Pharmacies</button>
				<button class="mainHome-drugBtn"  type="submit" v-on:click="viewDrugs()">Search Drugs</button>
	    	</div>
	    	<div id="mainHome-user">
	    		<h1 id="mainHome-naslov"> Login </h1>
	    		
	    		<h3 id="mainHome-h3"> Email Address </h3>
	    		<input type="text" id="vp-infoBar" v-model="email" />
	    		
	    		<h3 id="mainHome-h3"> Password </h3>
	    		<input type="password" id="vp-infoBar" v-model="password" />
	    		
	    		<p>You are new to this application?</p>
	    		<a id="mainHome-link" href="#" v-on:click="goToRegister()"> Register Here</a>
	    		
	    		<button class="mainHome-loginBtn"  type="submit" v-on:click="checkAlert()">Login</button>
	    	</div>
	    	<div id="mainHome-pharmacy">
		    	<h1 id="mainHome-pharmaTitle">Search Pharmacies</h1>
				<input type="text" class="mainHome-pharmaSearch" v-model="name" @keyup="getLetter"  placeholder="Search pharmacies by Name/Address"/>
    			<div class="main-searchBoxInfo" id="searchBoxInfoID" >
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
	    	<div id="mainHome-drugs">
	    		<h1 id="mainHome-drugsTitle">Search Drugs</h1>
				<input type="text" class="mainHome-drugSearch" v-model="drug" @keyup="getLetterDrug"  placeholder="Search Drugs by Name/Type/Shape"/>
    			<div class="main-searchBoxInfo" id="searchBoxInfoID1">
                    <div class="searchPharma-item" v-for="lek in listaLekova">
                        <div class = "searchPharma-image" style="background-image: url(RES/IMG/drug.png)"></div>
                        <div class= searchPharma-text>
                            <ul>
                                <li>Drug Name: {{lek.name}}</li>
                                <li>Drug Shape: {{lek.shape}}</li>
                                <li>Drug Type: {{lek.type}}</li>
                                <li v-if="lek.rating === 0"> No Ratings Yet ! </li>
                                <li v-else>Rating: {{lek.rating.toFixed(2)}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
	    	</div>
	  </div>
`,
    methods: {
        viewDrugs: function() {
            document.getElementById("mainHome-pharmacy").style.display = 'none';
            document.getElementById("mainHome-drugs").style.display = 'block';
        },
        viewPharmacy: function() {
            document.getElementById("mainHome-pharmacy").style.display = 'block';
            document.getElementById("mainHome-drugs").style.display = 'none';
        },
        getAuthenticated: function() {
            let info = {
                params: {
                    "email": this.email
                }
            }
            axios
                .get("/registration/isAuthenticated", info)
                .then(response => {
                    this.authenticated = response.data;
                })
        },
        checkAlert: async function() {
            await axios
                .get("/login/" + this.email + "/" + this.password)
                .then(response => {
                    this.getAuthenticated();
                    localStorage.setItem('user', JSON.stringify(response.data))
                    this.user = JSON.parse(localStorage.getItem('user'))
                    if (this.user.role === "PATIENT") {
                        if (this.authenticated == null) {

                        } else {
                            if (this.authenticated) {
                                this.$router.push("/patientHome")
                            } else {
                                this.$router.push("/emailVerification")
                            }
                        }
                    } else if (this.user.role === "DERMA") {
                    	if(this.user.firstLogin){
                        	this.$router.push("/firstLogin")	
                        	}
                        	else{
                            this.$router.push("/employeeHome")
                        	}
                    } else if (this.user.role === "PHARMA") {
                    	
                    	if(this.user.firstLogin){
                    	this.$router.push("/firstLogin")	
                    	}
                    	else{
                        this.$router.push("/employeeHome")
                    	}
                    } else if (this.user.role === "SUPPLY") {
                        if(this.user.firstLogin){
                            this.$router.push("/firstLogin")	
                            }
                            else{
                            this.$router.push("/supplierHome")
                            }                       
                    } else if (this.user.role === "ADMIN") {
                        if (this.user.works == 1) {

                            console.log(JSON.parse(localStorage.getItem('user')).id)
                            if(this.user.firstLogin){
                                this.$router.push("/firstLogin")	
                                }
                                else{
                                this.$router.push("/pharmaAdminHome")
                                }   

                        } else {
                            if(this.user.firstLogin){
                                this.$router.push("/firstLogin")	
                                }
                                else{
                                    this.$router.push("/systemAdminHome")
                                }            
                        }
                    } else if (this.user === "") {
                        alert("Pogresni podaci! Probajte ponovo.");
                        return;
                    }
                })
                .catch(error => {
                    alert("Pogresni podaci! Probajte ponovo.");
                    return;
                })
        },
        goToRegister: function() {
            this.$router.push("/register");
        },
        search: function() {

            if (this.searchData == "") {
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

        getLetter: function(event) {
            if (event.keyCode == 8) {
                this.searchData = this.searchData.slice(0, -1);
                if (this.name == "") {
                    this.searchData = "";
                }
            } else if (event.keyCode < 47 || event.keyCode > 91) {
                if (event.keyCode == 32) {
                    this.searchData += event.key
                }
                return;
            } else {
                this.searchData += event.key
            }
            this.search();
        },

        viewSearch: function(apoteke) {
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

        getAllPharmacies: function() {
            axios
                .get("/pharma/getAllPharmacies")
                .then(response => {
                    this.listaApoteka = response.data;
                    this.stalnaListaApoteka = this.listaApoteka;
                })
        },
        getAllDrugs: function() {
            axios
                .get("/drug/getAllDrugsTebra")
                .then(response => {
                    this.listaLekova = response.data;
                    this.stalnaListaLekova = this.listaLekova;
                });
        },
        viewDrug: function(lekovi) {
            this.listaLekova = [];
            for(let i = 0 ; i < lekovi.length ; i++)
            {
                lekovi[i].name = lekovi[i].name.charAt(0).toUpperCase() + lekovi[i].name.slice(1);
                lekovi[i].types = lekovi[i].types.charAt(0).toUpperCase() + lekovi[i].types.slice(1);
                lekovi[i].shape = lekovi[i].shape.charAt(0).toUpperCase() + lekovi[i].shape.slice(1);
                this.listaLekova.push(lekovi[i]);
            }
        },
        searchDrug: function() {

            if (this.searchDrugData == "") {
                this.getAllDrugs();
                return;
            }

            let validDrug = [];

            this.searchDrugData = this.searchDrugData.toLowerCase();
            for (let i = 0; i < this.stalnaListaLekova.length; i++) {
                this.stalnaListaLekova[i].name = this.stalnaListaLekova[i].name.toLowerCase();
                this.stalnaListaLekova[i].types = this.stalnaListaLekova[i].types.toLowerCase();
                this.stalnaListaLekova[i].shape = this.stalnaListaLekova[i].shape.toLowerCase();
                if (this.stalnaListaLekova[i].name.substring(0, this.searchDrugData.length) == this.searchDrugData ||
                    this.stalnaListaLekova[i].types.substring(0, this.searchDrugData.length) == this.searchDrugData ||
                    this.stalnaListaLekova[i].shape.substring(0, this.searchDrugData.length) == this.searchDrugData) {
                    validDrug.push(this.stalnaListaLekova[i]);
                }
            }
            this.viewDrug(validDrug);
        },
        getLetterDrug: function(event) {
            if (event.keyCode == 8) {
                this.searchDrugData = this.searchDrugData.slice(0, -1);
                if (this.drug == "") {
                    this.searchDrugData = "";
                }
            } else if (event.keyCode < 47 || event.keyCode > 91) {
                if (event.keyCode == 32) {
                    this.searchDrugData += event.key
                }
                return;
            } else {
                this.searchDrugData += event.key
            }
            this.searchDrug();
        },
        formRatings: function()
        {
            axios
			.get("/rate/formDrugRating");
            axios
			.get("/rate/formPharmacyRating");
            axios
			.get("/rate/formPharmacistRating");
            axios
			.get("/rate/formDermatologistRating");
        },
    },
    mounted() {
        this.formRatings();
        this.getAllPharmacies();
        this.getAllDrugs();
    }
});