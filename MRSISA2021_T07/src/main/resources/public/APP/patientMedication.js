Vue.component("PatientMedication", {
    data: function() {
        return {
	    	listaLekova:[],
	    	listaNealergicnih: [],
	    	listaAlergija: [],
	    	listaApoteka: [],
	    	listaNarudzbina: [],
			sviLekovi: [],
	    	
	    	drugAmount : 0,
	    	drugPrice: 0,
	    	pharmacyDTO : null,
	    	currentOrder: null,

			srcDrugName: "",
			srcDrugShape: "",
			srcDrugType: "",
			srcContradiction: "",
			srcIngredients: "",
			srcInstruction: "",
			srcDose: "",
			srcCode: "",
	    	
	    	resDrug: "",
			resPharmacy: "",
			resQuantity: "",
			resDate: "",
			resPrice: "",
	    	
	    	shpDrug: "",
	    	shpType: "",
	    	shpShape: "",
	    	shpPharma: "",
	    	shpPrice: "",
	    	shpQuantity: "",
	    	shpDate: "",
	    	shpFinishDate: "",
	    	prikazanShippment: null,
        }
    },

    template: `
	    <div id="medi-main">
	    	<link rel="stylesheet" href="CSS/patientMedication.css" type="text/css"> 
    		<div id="medi-opcije">
				<button class="medi-shippingBtn"  type="submit" v-on:click="drugSearchNovi()">Search Medication</button>
    			<button class="medi-searchBtn"  type="submit" v-on:click="searchDrugs()">Reserve Medication</button>
				<button class="medi-shippingBtn"  type="submit" v-on:click="drugShipping()">Shipping Status</button>
				<button class="medi-allergyBtn"  type="submit" v-on:click="allergySpec()">Allergy Specification</button>
				<button class="medi-homeBtn"  type="submit" v-on:click="goHome()">Home Page</button>
    		</div>
			<div id="medi-search">
				<h1 id="medi-shipping-naslov"> Medication Search </h1>
				</br>
    			<div id="medi-shipping-edge3">
					<div v-for="lek in listaLekova" v-on:click="viewSelectedDrug(lek)" :class="[lek.selected ? 'medi-medicSrc' : 'medi-medicSrc1']">
						<div class = "medi-shippingImage" style="background-image: url(RES/IMG/drug.png)"></div>
							<div class= searchPharma-text>
								<ul>
									<li> Drug Name : {{lek.name}} </li>
									<li> Drug Type : {{lek.type}} </li>
									<li> Drug Shape : {{lek.shape}} </li>
									<li v-if="lek.rating === 0"> No Ratings Yet ! </li>
									<li v-else>Rating: {{lek.rating.toFixed(2)}}</li>
								</ul>
							</div>
					</div >
    			</div>
    			</br>
				</br>
    			<h1 id="medi-shipping-naslov3"> Medication Information </h1>
    			
    			<div id="medi-shipping-desnoLevi1">
    				<h2> Drug Name </h2>
	    			<input type="text" v-model="srcDrugName" class="shipping-input" readonly/>
	    			<h2> Drug Type </h2>
	    			<input type="text" v-model="srcDrugType" class="shipping-input" readonly/>
	    			<h2> Ingredients </h2>
	    			<input type="text" v-model="srcIngredients" class="shipping-input" readonly/>
	    			<h2> Taking Dose </h2>
	    			<input type="text" v-model="srcDose" class="shipping-input" readonly/>
    			</div>
    			
    			<div id="medi-shipping-desnoDesni1">
    				<h2> Drug Shape </h2>
	    			<input type="text" v-model="srcDrugShape" class="shipping-input" readonly/>
	    			<h2> Contradiction </h2>
	    			<input type="text" v-model="srcContradiction" class="shipping-input" readonly/>
	    			<h2> Instruction </h2>
	    			<input type="text" v-model="srcInstruction" class="shipping-input" readonly/>
	    			<h2> Drug Code </h2>
	    			<input type="text" v-model="srcCode" class="shipping-input" readonly/>
    			</div>
			</div>
    		<div id="medi-rez">
    			<h1 id="medi-naslovSrc1"> Drug Search </h1>
				</br>
				</br>
    			<div id="medi-drugEdge">
    			
    				<div v-for="lek in listaNealergicnih" v-on:click="selectDrug(lek)" :class="[lek.selected ? 'medicationPharma-item2' : 'medicationPharma-item']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/drug.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>Name: {{lek.name}}</li>
		    						<li>Type: {{lek.types}}</li>
		    						<li>Shape: {{lek.shape}}</li>
		    					</ul>
    						</div>
					</div >
					
					<div v-for="lek in listaAlergija" v-on:click="selectDrug(lek)" :class="[lek.selected ? 'medicationPharma-itemAlergija2' : 'medicationPharma-itemAlergija']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/drug.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>Name: {{lek.name}}</li>
		    						<li>Type: {{lek.types}}</li>
		    						<li>Shape: {{lek.shape}}</li>
		    					</ul>
    					</div>
					</div >
				</div>
				</br>
    			<h1 id="medi-naslovSrc2"> Pharmacy Search </h1>
				</br>
				</br>
    			
    			<div id="medi-pharmaEdge">
    				<div v-for="apoteka in listaApoteka" v-on:click="selectPharmacy(apoteka)" :class="[apoteka.selected ? 'medicationPharma-item2' : 'medicationPharma-item']">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/pharmacy.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>Name: {{apoteka.pharmacyName}}</li>
		    						<li>Address: {{apoteka.address}}</li>
		    					</ul>
	    					</div>
						</div >
    			</div>
    		
    			<h1 id="medi-drugRez"> Reservation Info </h1>
    			<div id="medi-rezEdge">
    				<h2 id="medi-drugName"> Drug Name </h2>
    				<input type="text" id="medi-drugInput" v-model="resDrug" readonly/>
    				<h2 id="medi-pharmaName"> Pharmacy Name </h2>
    				<input type="text" id="medi-pharmaInput" v-model="resPharmacy" readonly/>
    				<h2 id="medi-quantityName"> Enter Quantity</h2>
    				<input type="number" id="medi-kolicinaInput" v-model="resQuantity" @keyup="proveraStanja" readonly/>
    				<h2 id="medi-recieveName"> Recieving Date </h2>
    				<input type="date" id="medi-dateInput" v-model="resDate"/>
    				<h2 id="medi-priceName"> Price </h2>
    				<input type="text" id="medi-priceInput" v-model="resPrice" readonly/>
    				</br>
    				<button class="medi-finishBtn"  type="submit" v-on:click="orderMedicine()">Order Medicine</button>
    			</div>
    			
    		</div>
    		<div id="medi-shipping">
    			<h1 id="medi-shipping-naslov"> Current Orders </h1>
    			<div id="medi-shipping-edge">
    				<div v-for="narudzbina in listaNarudzbina" v-on:click="viewShippment(narudzbina)" :class="[narudzbina.selected ? 'medi-shippintItem2' : 'medi-shippintItem']">
		    			<div class = "medi-shippingImage" style="background-image: url(RES/IMG/shipment.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li> Drug Name : {{narudzbina.drugName}} </li>
		    						<li> Pharmacy: {{narudzbina.pharmacyName}} </li>
		    						<li> Price : {{narudzbina.price}} $</li>
		    						<li> Quantity : {{narudzbina.quantity}}</li>
		    						<li> Reciving Date : {{narudzbina.recivingDate}}</li>
		    					</ul>
	    					</div>
					</div >
    			</div>
    			
    			<h1 id="medi-shipping-naslov2"> Shippment Information </h1>
    			
    			<div id="medi-shipping-desnoLevi">
    				<h2> Drug Name </h2>
	    			<input type="text" v-model="shpDrug" class="shipping-input" readonly/>
	    			<h2> Drug Type </h2>
	    			<input type="text" v-model="shpType" class="shipping-input" readonly/>
	    			<h2> Price </h2>
	    			<input type="text" v-model="shpPrice" class="shipping-input" readonly/>
	    			<h2> Order Date </h2>
	    			<input type="text" v-model="shpDate" class="shipping-input" readonly/>
    			</div>
    			
    			<div id="medi-shipping-desnoDesni">
    				<h2> Drug Shape </h2>
	    			<input type="text" v-model="shpShape" class="shipping-input" readonly/>
	    			<h2> Pharmacy Name </h2>
	    			<input type="text" v-model="shpPharma" class="shipping-input" readonly/>
	    			<h2> Quantity </h2>
	    			<input type="text" v-model="shpQuantity" class="shipping-input" readonly/>
	    			<h2> Reciving Date </h2>
	    			<input type="text" v-model="shpFinishDate" class="shipping-input" readonly/>
    			</div>
    			
    			<button class="medi-cancelShipping"  type="submit" v-on:click="cancelShippment()">Cancel Shippiment</button>
    			
    		</div>
    		<div id="medi-alergije">
    			<h1 id="medi-alergije-naslov"> Drug Search </h1>
    			<div id="medi-drugEdge2">
    				<div class = "medicationPharma-item" v-for="lek in listaNealergicnih">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/drug.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>Name: {{lek.name}}</li>
		    						<li>Type: {{lek.types}}</li>
		    						<li><button v-on:click="addAlergy(lek)">Add Allergy</button></li>
		    					</ul>
	    					</div>
						</div >
				</div>
				
				</br>
				</br>
				</br>
				<div id="medi-mojeAlergije">
    				<h1 id="medi-mojeAlergijeNaslov"> My Allergies </h1>
    				<div id="medi-drugEdge2">
    				<div class = "medicationPharma-itemAlergija" v-for="lek in listaAlergija">
		    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/drug.png)"></div>
	    					<div class= searchPharma-text>
			    				<ul>
		    						<li>Name: {{lek.name}}</li>
		    						<li>Type: {{lek.types}}</li>
		    						<li><button v-on:click="removeAllergy(lek)">Remove Allergy</button></li>
		    					</ul>
    					</div>
					</div >
				</div>
				</div>
    		</div>
	    </div>
`,
    methods: {
		viewSelectedDrug: function(lek)
		{
			for(let i = 0 ; i < this.listaLekova.length; i++)
			{
				this.listaLekova[i].selected = false;
			}
			lek.selected = true;
			this.srcDrugName = lek.name;
			this.srcDrugShape = lek.shape;
			this.srcDrugType = lek.type;
			this.srcContradiction = lek.contradiction;
			this.srcIngredients = lek.ingredients;
			this.srcInstruction = lek.instruction;
			this.srcDose = lek.takingDose;
			this.srcCode = lek.drugCode;

		},
    	unselectDrugs: function(drug)
		{
			for(let i = 0 ; i < this.listaAlergija.length; i++)
			{
				if(this.listaAlergija[i].name != drug.name)
				{
					this.listaAlergija[i].selected = false;
				}
			}
			for(let i = 0 ; i < this.listaNealergicnih.length; i++)
			{
				if(this.listaNealergicnih[i].id != drug.id)
				{
					this.listaNealergicnih[i].selected = false;
				}
			}
		},
		unselectPharmacies: function(pharmacy)
		{
			for(let i = 0 ; i < this.listaApoteka.length; i++)
			{
				if(this.listaApoteka[i].pharmacyName != pharmacy.pharmacyName)
				{
					this.listaApoteka[i].selected = false;
				}
			}
		},
    	viewShippment: function(item)
    	{
			for(let i = 0 ; i < this.listaNarudzbina.length ; i++)
			{
				this.listaNarudzbina[i].selected = false;
			}
			item.selected = true;
    		this.currentOrder = item;
    		this.prikazanShippment = item;
    		this.shpDrug = item.drugName;
	    	this.shpType = item.drugType;
	    	this.shpShape = item.drugShape;
	    	this.shpPharma = item.pharmacyName;
	    	this.shpPrice = item.price + " $";
	    	this.shpQuantity = item.quantity;
	    	this.shpDate = item.startDate;
	    	this.shpFinishDate = item.recivingDate;
    	},
    	cancelShippment: function()
    	{
			if(this.currentOrder == null)
			{
				swal("Warning!", "First choose a shippment to cancel !", "warning");
			}
			else
			{
				axios
				.put("/patientOrder/cancelCurrentOrder/",this.currentOrder)
				.then(response => {
					if(response.data)
					{
						swal({
							title: "Success!",
							text: "Shipment Succssfully Canceled !",
							type: "success"
						}).then(function() {
							window.location.reload();	
						});
					}
					else
					{
						swal("Warning!", "Shippment must be canceled at least 24 hours before arrival !", "warning");
						return;				
					}
				});
			}
    	},
    	
    	getMyAllergies: function()			//DONE
    	{
    		axios
			.get("/PATIENT/getMyAllergies/"+this.email)
			.then(response => {
				this.listaAlergija = response.data;
				this.getAllDrugs();
			});
    	},
    	
    	removeAllergy: function(lek)		//DONE
    	{
    		if (confirm("Are you sure you want to remove "+lek.name+" from your Allergies ?"))
    		{
    			this.listaAlergija = this.listaAlergija.filter(item => item.name !== lek.name);
    			this.listaNealergicnih.push(lek);
    			axios
    			.put("/PATIENT/removeAllergie/"+this.email,lek)
    			swal({
					title: "Success!",
					text: "Drug Successfully Removed from Allergies !",
					type: "success"
				})
    		} 
    		else 
    		{
    			return;
    		}
    	},
    	
    	addAlergy: function(lek)
    	{
    		if (confirm("Are you sure you are allergic to drug: "+lek.name+" ?"))
    		{
    			this.listaNealergicnih = this.listaNealergicnih.filter(item => item.name !== lek.name);
    			this.listaAlergija.push(lek);
    			console.log(lek);
    			axios
    			.put("/PATIENT/addAllergie/"+this.email,lek)
    			.then(response => {
					swal({
						title: "Success!",
						text: "Drug Successfully Added to Allergies",
						type: "success"
					})
    			});
    			
    		} 
    		else 
    		{
    			return;
    		}
    	},
    	
    	getAllDrugs: function()
    	{
    		axios
			.get("/drug/getAllDrugsTebra")
			.then(response => {
				this.listaLekova = response.data;
				for(let i = 0; i < this.listaLekova.length; i++)
				{
					let found = false;
					for(let j = 0 ; j < this.listaAlergija.length; j++)
					{
						if(this.listaLekova[i].name === this.listaAlergija[j].name)
						{
							found = true;
						}
					}
					if(!found)
					{
						this.listaNealergicnih.push(this.listaLekova[i]);
					}
				}
			});
    	},
    	
		drugSearchNovi:function()
		{
			document.getElementById("medi-shipping").style.display = 'none';
        	document.getElementById("medi-rez").style.display = 'none';
        	document.getElementById("medi-alergije").style.display = 'none';
        	document.getElementById("medi-search").style.display = 'block';
		},
    	searchDrugs: function()
    	{
        	document.getElementById("medi-shipping").style.display = 'none';
        	document.getElementById("medi-rez").style.display = 'block';
        	document.getElementById("medi-alergije").style.display = 'none';
			document.getElementById("medi-search").style.display = 'none';
    	},
    	drugShipping: function()
    	{
    		document.getElementById("medi-shipping").style.display = 'block';
        	document.getElementById("medi-alergije").style.display = 'none';
    		document.getElementById("medi-rez").style.display = 'none';
			document.getElementById("medi-search").style.display = 'none';
    	},
    	allergySpec: function()
    	{
    		document.getElementById("medi-shipping").style.display = 'none';
        	document.getElementById("medi-alergije").style.display = 'block';
    		document.getElementById("medi-rez").style.display = 'none';
			document.getElementById("medi-search").style.display = 'none';
    	},
    
    	selectDrug: function(drug)
    	{
    		this.listaApoteka = [];
    		this.unselectDrugs(drug);
    		
    		axios
			.get("/drugPharma/getPharmaDrugsTebra")
			.then(response => {
				let apoteke = response.data;
				for(let i = 0 ; i < apoteke.length ; i++)
				{
					if(apoteke[i].drugName === drug.name)
					{
						this.listaApoteka.push(apoteke[i]);
					}
				}
				
				document.getElementById("medi-kolicinaInput").readOnly = true;
				document.getElementById("medi-dateInput").readOnly = true;
				this.pharmacyDTO = null;
				
				if(this.listaApoteka.length === 0)
				{
					swal("Warning!", "There is no medication in any Pharmacy !", "warning");
			    	this.resDrug = "";
					this.resPharmacy = "";
					this.resQuantity = "";
					this.resDate = "";
					this.resPrice = "";
				}
				else
				{
					drug.selected = true;
					this.resDrug = drug.name;
					this.resPharmacy = "";
					this.resQuantity = "";
					this.resDate = "";
					this.resPrice = "";
				}
			});
    	},
    	
    	selectPharmacy: function(pharmacy) 			//DONE
    	{
    		this.resQuantity = "";
			this.resDate = "";
			this.resPrice = "";
    	
    		this.unselectPharmacies(pharmacy);
    		this.pharmacyDTO = pharmacy;
    		pharmacy.selected = true;
    		
    		this.drugAmount = pharmacy.amount;
    		this.drugPrice = pharmacy.price;
    		this.resPharmacy = pharmacy.pharmacyName;
    		
			document.getElementById("medi-kolicinaInput").readOnly = false;
			document.getElementById("medi-dateInput").readOnly = false;
    	},
    	
    	orderMedicine: function()
    	{
    		if(this.resDrug === "" || this.resPharmacy === "" || this.resQuantity === "" || this.resDate === "" || this.resPrice === "")
    		{
    			swal("Warning!", "Enter all fields to Order !", "warning");
    			return;
    		}
			var today = new Date();
			var Datum = new Date(this.resDate);
			if(today > Datum)
			{
				swal("Warning!", "Minimum Order Date is from Tomorrow on !", "warning");
				return;
			}
    		this.pharmacyDTO.amount -= this.resQuantity;
    		
    		axios
			.put("/drugPharma/updateDrugQuantity", this.pharmacyDTO)
			.then(response => {
			
				let order = new Object();
				order.drugID = this.pharmacyDTO.drugID;
				order.pharmacyID = this.pharmacyDTO.pharmacyID;
				order.quantity = this.resQuantity;
				order.price = this.resPrice;
				order.patientEmail = this.email;
				order.recivingDate = this.resDate;
				
				axios
				.post("/patientOrder/createDrugOrder",order)
				.then(response => {
					swal({
						title: "Success!",
						text: "Shipment Succssfully Ordered !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				});
				
			});
    	},
    	
    	proveraStanja: function()
    	{
    		this.resPrice = "";
    		this.resPrice += this.resQuantity*this.drugPrice;
    		if(this.resQuantity > this.drugAmount)
    		{
    			swal("Warning!", "Not enough Medication in storage. Order less !", "warning");
    			this.resQuantity = "";
    			this.resPrice = "";
    			this.resDate = "";
    		}
    	},
    	getMyShipments: function()
    	{
    		axios
			.get("/patientOrder/getMyCurrentOrders/"+this.email)
			.then(response => {
				this.listaNarudzbina = response.data;
			});
    	},
        goHome: function()
        {
        	this.$router.push("/patientHome")
        }
    },
	mounted(){
    	let user = JSON.parse(localStorage.getItem('user'))
		this.email = user.email;
    	this.getMyAllergies();
    	this.getMyShipments();
	},
});