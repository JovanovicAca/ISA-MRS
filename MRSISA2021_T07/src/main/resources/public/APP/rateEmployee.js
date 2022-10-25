Vue.component("RateEmployee", {
    data: function() {
        return {
        	dermatologist: [],
			unratedDermatologists: [],

			pharmacists: [],
			unratedPharmacists: [],
		
        	pharmacies: [],
			unratedPharmacies: [],

        	drugs: [],
			unratedDrugs: [],
			
			currentDrug : null,
			currentPharmacy: null,
			currentPharmacist: null,
			currentDermatologist: null,

			pharmacistName: "",
			pharmacistEmail: "",
			pharmacistPharmacy: "",
			pharmacistPhAddress: "",
			pharmacistAverageRating: "",
			pharmacistMyRating: "",
			pharmacistRatingDate: "",

			drugName: "",
			drugType: "",
			drugShape: "",
			intruction: "",
			takingDose: "",
			averageRating: "",
			myRating: "",
			ratingDate: "",

			pharmaName: "",
			pharmaAddress: "",
			pharmaGrade: "",
			pharmaMyGrade: "",
			pharmaDate: "",

			currentEmail: "",
        	imePrezime: "",
        	email: "",
        	imeApoteke: "",
        	adresaApoteke: "",
        	prosecnaOcena: "",
        	imeLeka: "",
        	tipLeka: "",
        	oblikLeka: "",
        }
    },

    template: `
    <div id="rate-div">
    	<link rel="stylesheet" href="CSS/rateEmployee.css" type="text/css">
    	<div id="rate-buttons">
    		<button class="rate-drug"  type="submit" v-on:click="rateDrug()">Rate Medication</button>
			<button class="rate-pharmacy"  type="submit" v-on:click="ratePharmacy()">Rate Pharmacy</button>
			<button class="rate-pharmacist"  type="submit" v-on:click="ratePharmacist()">Rate Pharmacist</button>
			<button class="rate-dermatologist"  type="submit" v-on:click="rateDermatologist()">Rate Dermatologist</button>
			<button class="rate-complaint"  type="submit" v-on:click="writeComplaint()">Write Complaint</button>
			<button class="rate-complaint"  type="submit" v-on:click="uploadQR()">Upload QR</button>
			<button class="rate-homeBtn"  type="submit" v-on:click="goHome()">Home Page</button>
    	</div>
    	<div id="rateDermatologist">
    		<div id="rate-dermatologist-levo">
    			<h1 id="rate-dermaNaslov"> Rate Dermatologist </h1>
    			<input type="text" id="rate-dermaInput" placeholder="Search for Dermatologists by Name/Surname"/>
    			<div id="rate-tabela">
				<div v-for="dermatolog in unratedDermatologists" v-on:click="viewDermatologist(dermatolog)" :class="[dermatolog.selected ? 'rateClick-item2' : 'rateClick-item']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/dermatologist.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>{{dermatolog.dermatologistName}}</li>
		    						<li>Email: {{dermatolog.dermatologistEmail}}</li>
									<li v-if="dermatolog.rating === 0"> No Ratings Yet ! </li>
									<li v-else>Rating: {{dermatolog.rating.toFixed(2)}}</li>
		    					</ul>
    						</div>
					</div >
				<div v-for="dermatolog in dermatologist" v-on:click="viewDermatologist(dermatolog)"  :class="[dermatolog.selected ? 'rateClick-item4' : 'rateClick-item3']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/dermatologist.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
									<li>{{dermatolog.dermatologistName}}</li>
									<li>Email: {{dermatolog.dermatologistEmail}}</li>
									<li v-if="dermatolog.rating === 0"> No Ratings Yet ! </li>
									<li v-else>Rating: {{dermatolog.rating.toFixed(2)}}</li>
		    					</ul>
    						</div>
					</div >
				
    			</div>
    		</div>
    		<div id="rate-drug-desno">
    			<h1 id="rate-dermaPodaci"> Dermatologist Information </h1>
    			</br>
    			<div id="rate-dermatologist-desnoLevi">
					<h2> Dermatologist </h2>
					<input type="text" v-model="pharmacistName" readonly class="rate-infoInput"/>
					<h2> Average Rating </h2>
					<input type="text" v-model="pharmacistAverageRating" readonly class="rate-infoInput"/>
					<h2> Last Rating Date </h2>
					<input type="text" v-model="pharmacistRatingDate" readonly class="rate-infoInput"/>
				</div>
    			<div id="rate-dermatologist-desnoDesni">
					<h2> Email Address </h2>
					<input type="text" v-model="pharmacistEmail" readonly class="rate-infoInput"/>
					<h2> My Rating </h2>
					<input type="text" v-model="pharmacistMyRating" class="rate-infoInput"/>
    			</div>
				<button class="rate-button"  type="submit" v-on:click="rateDermaFun()">Rate Dermatologist</button>
    		</div>
    	</div>
    	<div id="ratePharmacist">
    		<div id="rate-pharmacist-levo">
    			<h1 id="rate-pharmacistNaslov"> Rate Pharmacist </h1>
    			<input type="text" id="rate-pharmacistInput" placeholder="Search for Pharmacists by Name/Surname"/>
    			<div id="rate-tabela">
					<div v-for="farmaceut in unratedPharmacists" v-on:click="viewPharmacist(farmaceut)" :class="[farmaceut.selected ? 'rateClick-item2' : 'rateClick-item']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/pharmacist.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>{{farmaceut.pharmacistName}}</li>
		    						<li>Pharmacy: {{farmaceut.pharmacyName}}</li>
									<li v-if="farmaceut.rating === 0"> No Ratings Yet ! </li>
									<li v-else>Rating: {{farmaceut.rating.toFixed(2)}}</li>
		    					</ul>
    						</div>
					</div >
    				<div v-for="farmaceut in pharmacists" v-on:click="viewPharmacist(farmaceut)" :class="[farmaceut.selected ? 'rateClick-item4' : 'rateClick-item3']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/pharmacist.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>{{farmaceut.pharmacistName}}</li>
		    						<li>Pharmacy: {{farmaceut.pharmacyName}}</li>
									<li v-if="farmaceut.rating === 0"> No Ratings Yet ! </li>
									<li v-else>Rating: {{farmaceut.rating.toFixed(2)}}</li>
		    					</ul>
    						</div>
					</div >
    			</div>
    		</div>
    		<div id="rate-drug-desno">
    			<h1 id="rate-dermaPodaci"> Pharmacist Information </h1>
    			</br>
    			<div id="rate-dermatologist-desnoLevi">
	    			<h2> Pharmacist </h2>
	    			<input type="text" v-model="pharmacistName" readonly class="rate-infoInput"/>
	    			<h2> Pharmacy Name </h2>
	    			<input type="text" v-model="pharmacistPharmacy" readonly class="rate-infoInput"/>
	    			<h2> Average Rating </h2>
	    			<input type="text" v-model="pharmacistAverageRating" readonly class="rate-infoInput"/>
					<h2> Last Rating Date </h2>
	    			<input type="text" v-model="pharmacistRatingDate" readonly class="rate-infoInput"/>
    			</div>
    			<div id="rate-dermatologist-desnoDesni">
    				<h2> Email Address </h2>
	    			<input type="text" v-model="pharmacistEmail" readonly class="rate-infoInput"/>
					<h2> Pharmacy Address </h2>
	    			<input type="text" v-model="pharmacistPhAddress" readonly class="rate-infoInput"/>
					<h2> My Rating </h2>
	    			<input type="text" v-model="pharmacistMyRating"  class="rate-infoInput"/>
    			</div>
				<button class="rate-button"  type="submit" v-on:click="ratePharmacistFun()">Rate Pharmacist</button>
    		</div>
    	</div>
    	<div id="ratePharmacy">
    		<div id="rate-pharmacy-levo">
    			<h1 id="rate-pharmacyNaslov"> Rate Pharmacy </h1>
    			<input type="text" id="rate-pharmacyInput" placeholder="Search for pharmacy by Name/Address"/>
    			<div id="rate-tabela">
				<div v-for="pharmacy in unratedPharmacies" v-on:click="viewPharmacy(pharmacy)" :class="[pharmacy.selected ? 'rateClick-item2' : 'rateClick-item']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/pharmacy.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>Name: {{pharmacy.pharmacyName}}</li>
		    						<li>Address: {{pharmacy.pharmacyAddress}}</li>									
									<li v-if="pharmacy.rating === 0"> No Ratings Yet ! </li>
									<li v-else>Rating: {{pharmacy.rating.toFixed(2)}}</li>
		    					</ul>
    						</div>
					</div >
    				<div v-for="pharmacy in pharmacies" v-on:click="viewPharmacy(pharmacy)" :class="[pharmacy.selected ? 'rateClick-item4' : 'rateClick-item3']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/pharmacy.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>Name: {{pharmacy.pharmacyName}}</li>
		    						<li>Address: {{pharmacy.pharmacyAddress}}</li>
									<li>Rating: {{pharmacy.rating.toFixed(2)}}</li>
		    					</ul>
    						</div>
					</div >
    			</div>
    		</div>
    		<div id="rate-drug-desno">
    			<h1 id="rate-pharmacyPodaci"> Pharmacy Information </h1>
    			</br>
    			<div id="rate-dermatologist-desnoLevi">
	    			<h2> Pharmacy Name </h2>
	    			<input type="text" v-model="pharmaName" readonly class="rate-infoInput"/>
	    			<h2> Average Rating </h2>
	    			<input type="text" v-model="pharmaGrade" readonly class="rate-infoInput"/>
	    			<h2> Last Rating Date </h2>
	    			<input type="text" v-model="pharmaDate" readonly class="rate-infoInput"/>
    			</div>
    			<div id="rate-dermatologist-desnoDesni">
    				<h2> Pharmacy Address </h2>
	    			<input type="text" v-model="pharmaAddress" readonly class="rate-infoInput"/>
					<h2> My Rating </h2>
	    			<input type="text" v-model="pharmaMyGrade" class="rate-infoInput"/>
    			</div>
				<button class="rate-button"  type="submit" v-on:click="ratePharmacyFun()">Rate Pharmacy</button>
    		</div>
    	</div>
    	<div id="rateDrug">
    		<div id="rate-drug-levo">
    			<h1 id="rate-drugNaslov"> Rate Medication </h1>
    			<input type="text" id="rate-drugInput" placeholder="Search for drug by Name/Shape/Type"/>
    			<div id="rate-tabela">
					<div v-for="lek in unratedDrugs" v-on:click="viewDrug(lek)" :class="[lek.selected ? 'rateClick-item2' : 'rateClick-item']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/drug.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>Drug Name: {{lek.drugName}}</li>
									<li>Drug Shape: {{lek.drugShape}}</li>
									<li>Drug Type: {{lek.drugType}}</li>
									<li v-if="lek.rating === 0"> No Ratings Yet ! </li>
									<li v-else>Rating: {{lek.rating.toFixed(2)}}</li>
		    					</ul>
    						</div>
					</div >
    				<div v-for="lek in drugs" v-on:click="viewDrug(lek)" :class="[lek.selected ? 'rateClick-item4' : 'rateClick-item3']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/drug.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>Drug Name: {{lek.drugName}}</li>
									<li>Drug Shape: {{lek.drugShape}}</li>
									<li>Drug Type: {{lek.drugType}}</li>
									<li>Rating: {{lek.rating.toFixed(2)}}</li>
		    					</ul>
    						</div>
					</div >
    			</div>
    		</div>
    		<div id="rate-drug-desno">
    			<h1 id="rate-drugPodaci"> Drug Information </h1>
    			</br>
    			<div id="rate-dermatologist-desnoLevi">
	    			<h2> Drug Name </h2>
	    			<input type="text" v-model="drugName" readonly class="rate-infoInput"/>
	    			<h2> Drug Shape </h2>
	    			<input type="text" v-model="drugShape" readonly class="rate-infoInput"/>
	    			<h2> Instruction </h2>
	    			<input type="text" v-model="intruction" readonly class="rate-infoInput"/>
					<h2> My Rating </h2>
	    			<input type="text" v-model="myRating" class="rate-infoInput"/>
    			</div>
    			<div id="rate-dermatologist-desnoDesni">
    				<h2> Drug Type </h2>
	    			<input type="text" v-model="drugType" readonly class="rate-infoInput"/>
					<h2> Taking Dose </h2>
	    			<input type="text" v-model="takingDose" readonly class="rate-infoInput"/>
					<h2> Average Rating </h2>
	    			<input type="text" v-model="averageRating" readonly class="rate-infoInput"/>
					<h2> Last Rating Date </h2>
	    			<input type="text" v-model="ratingDate" readonly class="rate-infoInput"/>
    			</div>
				<button class="rate-button"  type="submit" v-on:click="rateDrugFun()">Rate Medication</button>
    		</div>
    	</div>
    	<div id="rateComplaint">
    	</div>
    </div>
`,
    methods: {
    	hideDivs: function()
    	{
    		document.getElementById("rateDermatologist").style.display = 'none';
        	document.getElementById("ratePharmacist").style.display = 'none';
    		document.getElementById("ratePharmacy").style.display = 'none';
    		document.getElementById("rateDrug").style.display = 'none';
    		document.getElementById("rateComplaint").style.display = 'none';
        	this.imePrezime = "";
        	this.email = "";
        	this.imeApoteke = "";
        	this.adresaApoteke = "";
        	this.prosecnaOcena = "";
        	this.imeLeka = "";
        	this.tipLeka = "";
        	this.oblikLeka = "";
			this.pharmacistName= "";
			this.pharmacistEmail= "";
			this.pharmacistPharmacy= "";
			this.pharmacistPhAddress= "";
			this.pharmacistAverageRating= "";
			this.pharmacistMyRating= "";
			this.pharmacistRatingDate= "";
			for(let i = 0 ; i < this.pharmacists.length; i++)
			{
				this.pharmacists[i].selected = false;
			}
			for(let i = 0 ; i < this.unratedPharmacists.length; i++)
			{
				this.unratedPharmacists[i].selected = false;
			}
			for(let i = 0 ; i < this.dermatologist.length; i++)
			{
				this.dermatologist[i].selected = false;
			}
			for(let i = 0 ; i < this.unratedDermatologists.length; i++)
			{
				this.unratedDermatologists[i].selected = false;
			}
    	},
    	ratePharmacy: function()
		{
    		this.hideDivs();
    		document.getElementById("ratePharmacy").style.display = 'block';
		},
    	ratePharmacist: function()
		{
    		this.hideDivs();
    		document.getElementById("ratePharmacist").style.display = 'block';
		},
		rateDermatologist: function()
		{
			this.hideDivs();
			document.getElementById("rateDermatologist").style.display = 'block';
		},
		rateDrug: function()
		{
			this.hideDivs();
			document.getElementById("rateDrug").style.display = 'block';
		},
		writeComplaint: function()
		{
			this.hideDivs();
			//document.getElementById("rate-complaint").style.display = 'block';
			this.$router.push("/writeComplaint")
		},
		uploadQR: function()
		{
			this.hideDivs();
			//document.getElementById("rate-complaint").style.display = 'block';
			this.$router.push("/qr")
		},
    	goHome: function()
		{
			this.$router.push("/patientHome")
		},
		unselectAll: function()
		{
			for(let i = 0 ; i < this.unratedDrugs.length; i++)
			{
				this.unratedDrugs[i].selected = false;
			}
			for(let i = 0 ; i < this.drugs.length; i++)
			{
				this.drugs[i].selected = false;
			}
			for(let i = 0 ; i < this.unratedPharmacies.length; i++)
			{
				this.unratedPharmacies[i].selected = false;
			}
			for(let i = 0 ; i < this.pharmacies.length; i++)
			{
				this.pharmacies[i].selected = false;
			}
		},
		viewDrug: function(drug)
		{
			this.unselectAll();
			this.currentDrug = drug;

			drug.selected = true;
			this.drugName = drug.drugName;
			this.drugType = drug.drugType;
			this.drugShape = drug.drugShape;
			this.intruction = drug.instruction;
			this.takingDose = drug.takingDose;
			if(drug.rating >= 1 && drug.rating <= 5)
			{
				this.averageRating = drug.rating.toFixed(2);
			}
			else
			{
				this.averageRating = "No Ratings Yet !";
			}
			if(drug.myRating === 0)
			{
				this.myRating = "Not Rated !";
				this.ratingDate = "Not Rated !";
			}
			else
			{
				this.myRating = drug.myRating.toFixed(2);
				this.ratingDate = drug.ratingDate;
			}
		},
		viewPharmacy: function(pharmacy)
		{
			this.unselectAll();
			this.currentPharmacy = pharmacy;
			
			pharmacy.selected = true;
			this.pharmaName = pharmacy.pharmacyName;
			this.pharmaAddress = pharmacy.pharmacyAddress;
			console.log(pharmacy);
			if(pharmacy.rating >= 1 && pharmacy.rating <= 5)
			{
				this.pharmaGrade = pharmacy.rating.toFixed(2);
			}
			else
			{
				this.pharmaGrade = "No Ratings Yet !";
			}

			if(pharmacy.myRating === 0)
			{
				this.pharmaMyGrade = "Not Rated !";
				this.pharmaDate = "Not Rated !";
			}
			else
			{
				this.pharmaMyGrade = pharmacy.myRating.toFixed(2);;
				this.pharmaDate = pharmacy.ratingDate;
			}
		},
		viewDermatologist: function(dermatolog)
		{
			for(let i = 0 ; i < this.dermatologist.length; i++)
			{
				this.dermatologist[i].selected = false;
			}
			for(let i = 0 ; i < this.unratedDermatologists.length; i++)
			{
				this.unratedDermatologists[i].selected = false;
			}
			dermatolog.selected = true;
			this.currentDermatologist = dermatolog;
			this.pharmacistName = dermatolog.dermatologistName;
			this.pharmacistEmail = dermatolog.dermatologistEmail;
			if(dermatolog.rating >= 1 && dermatolog.rating <= 5)
			{
				this.pharmacistAverageRating = dermatolog.rating.toFixed(2);
			}
			else
			{
				this.pharmacistAverageRating = "No Ratings Yet !";
			}
			if(dermatolog.myRating == 0)
			{
				this.pharmacistMyRating = "Not Rated !";
				this.pharmacistRatingDate = "Not Rated !";
			}
			else
			{
				this.pharmacistMyRating = dermatolog.myRating.toFixed(2);;
				this.pharmacistRatingDate = dermatolog.ratingDate;
			}
		},
		viewPharmacist: function(farmaceut)
		{
			for(let i = 0 ; i < this.pharmacists.length; i++)
			{
				this.pharmacists[i].selected = false;
			}
			for(let i = 0 ; i < this.unratedPharmacists.length; i++)
			{
				this.unratedPharmacists[i].selected = false;
			}
			this.currentPharmacist = farmaceut;
			farmaceut.selected = true;
			this.pharmacistName = farmaceut.pharmacistName;
			this.pharmacistEmail = farmaceut.pharmacistEmail;
			this.pharmacistPharmacy = farmaceut.pharmacyName;
			this.pharmacistPhAddress = farmaceut.pharmacyAddress;
			if(farmaceut.rating >= 1 && farmaceut.rating <= 5)
			{
				this.pharmacistAverageRating = farmaceut.rating.toFixed(2);
			}
			else
			{
				this.pharmacistAverageRating = "No Ratings Yet !";
			}
			if(farmaceut.myRating == 0)
			{
				this.pharmacistMyRating = "Not Rated !";
				this.pharmacistRatingDate = "Not Rated !";
			}
			else
			{
				this.pharmacistMyRating = farmaceut.myRating.toFixed(2);;
				this.pharmacistRatingDate = farmaceut.ratingDate;
			}
		},

		rateDrugFun: function()
		{
			if(this.myRating != 1 && this.myRating != 2 && this.myRating != 3 && this.myRating != 4 && this.myRating != 5 )
			{
				swal("Warning!", "Invalid Rating[1 - 5]. Try Again !", "warning");
				return;
			}
			else
			{
				this.currentDrug.myRating = this.myRating;
				if(this.currentDrug.ratingDate == null)
				{
					axios
					.post("/rate/rateDrug/"+this.currentEmail,this.currentDrug);
					swal({
						title: "Success!",
						text: "Rating Succssfully Created !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				}
				else
				{
					axios
					.put("/rate/changeRating/"+this.currentEmail,this.currentDrug);
					swal({
						title: "Success!",
						text: "Rating Succssfully Updated !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				}
			}
		},
		ratePharmacyFun: function()
		{
			if(this.pharmaMyGrade != 1 && this.pharmaMyGrade != 2 && this.pharmaMyGrade != 3 && this.pharmaMyGrade != 4 && this.pharmaMyGrade != 5 )
			{
				swal("Warning!", "Invalid Rating[1 - 5]. Try Again !", "warning");
				return;
			}
			else
			{
				this.currentPharmacy.myRating = this.pharmaMyGrade;
				if(this.currentPharmacy.ratingDate == null)
				{
					axios
					.post("/rate/ratePharmacy/"+this.currentEmail,this.currentPharmacy);
					swal({
						title: "Success!",
						text: "Rating Succssfully Created !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				}
				else
				{
					axios
					.put("/rate/changePharmacyRating/"+this.currentEmail,this.currentPharmacy);
					swal({
						title: "Success!",
						text: "Rating Succssfully Updated !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				}
			}
		},
		ratePharmacistFun: function()
		{
			if(this.pharmacistMyRating != 1 && this.pharmacistMyRating != 2 && this.pharmacistMyRating != 3 && this.pharmacistMyRating != 4 && this.pharmacistMyRating != 5 )
			{
				swal("Warning!", "Invalid Rating[1 - 5]. Try Again !", "warning");
				return;
			}
			else
			{
				this.currentPharmacist.myRating = this.pharmacistMyRating;
				if(this.currentPharmacist.ratingDate == null)
				{
					axios
					.post("/rate/ratePharmacist/"+this.currentEmail,this.currentPharmacist);
					swal({
						title: "Success!",
						text: "Rating Succssfully Created !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				}
				else
				{
					axios
					.put("/rate/changePharmaRating/"+this.currentEmail,this.currentPharmacist);
					swal({
						title: "Success!",
						text: "Rating Succssfully Updated !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				}
			}
		},
		rateDermaFun: function()
		{
			if(this.pharmacistMyRating != 1 && this.pharmacistMyRating != 2 && this.pharmacistMyRating != 3 && this.pharmacistMyRating != 4 && this.pharmacistMyRating != 5 )
			{
				swal("Warning!", "Invalid Rating[1 - 5]. Try Again !", "warning");
				return;
			}
			else
			{
				this.currentDermatologist.myRating = this.pharmacistMyRating;
				if(this.currentDermatologist.ratingDate == null)
				{
					axios
					.post("/rate/rateDermatologist/"+this.currentEmail,this.currentDermatologist);
					swal({
						title: "Success!",
						text: "Rating Succssfully Created !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				}
				else
				{
					axios
					.put("/rate/changeDermaRating/"+this.currentEmail,this.currentDermatologist);
					swal({
						title: "Success!",
						text: "Rating Succssfully Updated !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				}
			}
		},
		getData: function()
		{
			axios
			.get("/rate/getMyRatedPharmacies/"+this.currentEmail)
			.then(response => {
				this.pharmacies = response.data;
			});

			axios
			.get("/rate/getUnratedPharmacies/"+this.currentEmail)
			.then(response => {
				this.unratedPharmacies = response.data;
				
			});
			
			axios
			.get("/rate/getMyRatedPharmacists/"+this.currentEmail)
			.then(response => {
				this.pharmacists = response.data;
			});
			
			axios
			.get("/rate/getUnratedPharmacists/"+this.currentEmail)
			.then(response => {
				this.unratedPharmacists = response.data;
				
			});

			axios
			.get("/rate/getMyRatedDrugs/"+this.currentEmail)
			.then(response => {
				this.drugs = response.data;
			});

			axios
			.get("/rate/getUnratedDrugs/"+this.currentEmail)
			.then(response => {
				this.unratedDrugs = response.data;
			});
			
			axios
			.get("/rate/getMyRatedDermatologists/"+this.currentEmail)
			.then(response => {
				this.dermatologist = response.data;
			});

			axios
			.get("/rate/getUnratedDermatologists/"+this.currentEmail)
			.then(response => {
				this.unratedDermatologists = response.data;
			});
		},
		refresh: function()
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
    mounted(){
    	let user = JSON.parse(localStorage.getItem('user'))
		this.currentEmail = user.email;
		this.refresh();
		this.getData();
	},
});