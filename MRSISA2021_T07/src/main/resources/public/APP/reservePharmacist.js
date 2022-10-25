Vue.component("ReservePharmacist",{
	data: function () {
	    return {
	    	pharmacies : [],
	    	appointments: [],
	    	pendingAppointments: [],
	    	currentAppointment: null,
	    	currentConsultation: null,
			availablePharmacists: [],
			currentPharmacy: null,
			currentApotekar : null,
			pendingConsultations: [],
			
	    	email : "",
	    	date : "",
	    	startTime : "",
	    	finishTime : "",
			pharmacySearch: "",	 
			   	
			checkDate : "",

	    	pharmaName: "",
	    	pharmacyName: "",
	    	pharmacyAddress: "",
	    	consultDate: "",
	    	consultStartTime: "",
	    	consultEndTime: "",
	    	consultPrice: "",
	    	
	    	appoDoctor: "",
			appoAddress: "",
			appoDate: "",
			appoEnd: "",
			appoPharmacy: "",
			appoPrice: "",
			appoStart: "",
	    }
	},
	    
	    template : ` 
	    
    		<div id="reservePharma-div">
	    		<link rel="stylesheet" href="CSS/regPharmacyAdmin.css" type="text/css">
		    	<div id="reserve-dugmici">
	    			<button class="rezerveConsultBtn"  type="submit" v-on:click="reserveConsultation()">Reserve Consultation</button>
					<button class="cancelConsultBtn"  type="submit" v-on:click="cancelConsultation()">Current Consultations</button>
					<button class="rezerveAppoBtn"  type="submit" v-on:click="reserveAppointment()">Reserve Appointment</button>
					<button class="cancelAppoBtn"  type="submit" v-on:click="cancelAppointment()">Current Appointments</button>
					<button class="reserve-homeBtn"  type="submit" v-on:click="goHome()">Home Page</button>
		    	</div>
	
		    	<div id="reserve-desno">
		    		<div id="reserve-konsultacija">
		    			<div id="reserve-konsultacijaLevo">
		    				<h1> Consultation Date and Time </h1>
			    			<input type="date" class="reserve-datum" v-model="date" @keyup="abortRez"/>
							</br>
							<input type="text" class="reserve-sati" v-model="startTime" placeholder="Start HH:MM" @keyup="abortRez"/>
							<input type="text" class="reserve-sati" v-model="finishTime" placeholder="End HH:MM" @keyup="abortRez"/>
			    			<h1> Select a Pharmacy </h1>
			    			
			    			<div id="reserve-pharmaPrikaz">
									<div v-for="pharmacy1 in pharmacies" v-on:click="prikaziApoteku(pharmacy1)" :class="[pharmacy1.selected ? 'reserveClick-item1' : 'reserveClick-item']">
						    			<div class = "searchPharma-image" style="background-image: url(RES/IMG/pharmacyLogo.png)"></div>
					    					<div class= searchPharma-text>
							    				<ul>
						    						<li>Name: {{pharmacy1.name}}</li>
						    						<li>Street: {{pharmacy1.address}}</li>
													<li v-if="pharmacy1.rating === 0"> No Ratings Yet ! </li>
													<li v-else>Rating: {{pharmacy1.rating.toFixed(2)}}</li>
						    					</ul>
				    						</div>
									</div >	    			
			    			</div>
			    			
		    			</div>
		    			<div id="reserve-konsultacijaDesno">

		    				<h1> Available Pharmacists </h1>
		    				<div id="reserve-pharmacistPrikaz">
								<div v-for="apotekar in availablePharmacists" v-on:click="prikaziApotekara(apotekar)" :class="[apotekar.selected ? 'pharmacistItem01-selected' : 'pharmacistItem01']">
									<div class = "searchPharma-image" style="background-image: url(RES/IMG/pharmacist.png)"></div>
										<div class= searchPharma-text>
											<ul>
												<li>Name: {{apotekar.name + " " + apotekar.surname}}</li>
												<li>Email: {{apotekar.email}}</li>
												<li v-if="apotekar.rating === 0"> No Ratings Yet ! </li>
												<li v-else>Rating: {{apotekar.rating.toFixed(2)}}</li>
											</ul>
										</div>
								</div >	   				
		    				</div>
		    				
		    				<button class="reserve-newConsultationBtn"  type="submit" v-on:click="rezervisiConsult()">Reserve Consultation</button>
		    				
		    			</div>
			    	</div>
			    	
			    	<div id="reserve-cancelKonsultacija">
			    	
		    			<div id="reserve-cancelKonsultacijaLevo">
		    				<h1>Pending Consultations </h1>
		    				<div id="prikazAktuelnihKonsultacija">
								<div v-for="consult in pendingConsultations" v-on:click="viewConsultation(consult)" :class="[consult.selected ? 'appointmentClick2-item' : 'appointmentClick-item']">
									<div class = "resAppo-image" style="background-image: url(RES/IMG/pharmacist.png)"></div>
										<div class= searchPharma-text>
											<ul>
												<li>Date: {{consult.date}}</li>
												<li>Pharmacist: {{consult.doctor}}</li>
												<li>Pharmacy: {{consult.pharmacyName}} </li>
												<li>Address : {{consult.pharmacyAddress}} </li>
											</ul>
										</div>
								</div >
		    				</div>
		    			</div>
		    			
		    			<div id="reserve-cancelKonsultacijaDesno">
		    				<h1> Consultation Information </h1>
		    				
		    				<div id="reserve-cancelKonsultacijaDesnoLevi">
							    <h2> Pharmacist </h2>
		    					<input type="text" class="consult-input" v-model="pharmaName" readonly/>
								<h2> Pharmacy Address </h2>
		    					<input type="text" class="consult-input" v-model="pharmacyAddress" readonly/>
								<h2> Starting Time </h2>
		    					<input type="text" class="consult-input" v-model="consultStartTime" readonly/>
		    				</div>
		    				
		    				<div id="reserve-cancelKonsultacijaDesnoDesni">
		    					<h2> Pharmacy Name </h2>
		    					<input type="text" class="consult-input" v-model="pharmacyName" readonly/>
								<h2> Consultation Date </h2>
		    					<input type="text" class="consult-input" v-model="consultDate" readonly/>
								<h2> Ending Time </h2>
		    					<input type="text" class="consult-input" v-model="consultEndTime" readonly/>
		    				</div>
		    				
		    				<button class="cancel-consultBtn"  type="submit" v-on:click="cancelConsultBtn()">Cancel Consultation</button>
		    			</div>
			    	</div>
			    	
			    	<div id="reserve-appointment">
		    			<div id="reserve-appointmentLevo">
		    				<h1> Select an Appointment </h1>
							</br>
		    				<div id="reserve-appoBox">
		    					<div v-for="appointment in appointments" v-on:click="viewAppointment(appointment)" :class="[appointment.selected ? 'appointmentClick2-item' : 'appointmentClick-item']">
						    			<div class = "resAppo-image" style="background-image: url(RES/IMG/calendar.png)"></div>
					    					<div class= searchPharma-text>
							    				<ul>
						    						<li>Dermatologist: {{appointment.doctor}}</li>
						    						<li>Date: {{appointment.datum}}</li>
						    						<li>Duration: {{appointment.trajanje}}h</li>
						    						<li>Price: {{appointment.price}} $</li>
						    					</ul>
			    							</div>
								</div >	
		    				</div>
		    			</div>

		    			<div id="reserve-appointmentDesno">
		    				<h1> Appointment Information </h1>
		    				<div id="reserve-appointmentDesnoLevi">
		    					<h2> Doctor </h2>
		    					<input type="text" class="consult-input" v-model="appoDoctor" readonly/>
		    					<h2> Pharmacy Address </h2>
		    					<input type="text" class="consult-input" v-model="appoAddress" readonly/>		    					
		    					<h2> Date </h2>
		    					<input type="text" class="consult-input" v-model="appoDate" readonly/>		    					
		    					<h2> Ending Time </h2>
		    					<input type="text" class="consult-input" v-model="appoEnd" readonly/>
		    				</div>
		    				
		    				<div id="reserve-appointmentDesnoDesni">
								<h2> Pharmacy Name </h2>
		    					<input type="text" class="consult-input" v-model="appoPharmacy" readonly/>		    					
		    					<h2> Price </h2>
		    					<input type="text" class="consult-input" v-model="appoPrice" readonly/>		    					
		    					<h2> Starting Time </h2>
		    					<input type="text" class="consult-input" v-model="appoStart" readonly/>
		    				</div>
		    				
		    				<button class="cancel-consultBtn"  type="submit" v-on:click="createAppointment()">Reserve Appointment</button>
		    			</div>
		    			
			    	</div>
			    	
			    	<div id="reserve-cancelAppointment">
		    			<div id="reserve-cancelAppointmentLevo">
		    				<h1> Pending Appointments </h1>
							</br>
		    				<div id="reserve-appoBox">
		    					<div v-for="appointment in pendingAppointments" v-on:click="viewAppointment(appointment)" :class="[appointment.selected ? 'appointmentClick2-item' : 'appointmentClick-item']">
						    			<div class = "resAppo-image" style="background-image: url(RES/IMG/calendar.png)"></div>
					    					<div class= searchPharma-text>
							    				<ul>
						    						<li>Dermatologist: {{appointment.doctor}}</li>
						    						<li>Date: {{appointment.datum}}</li>
						    						<li>Duration: {{appointment.trajanje}}h</li>
						    						<li>Price: {{appointment.price}} $</li>
						    					</ul>
			    							</div>
								</div >	
		    				</div>
		    			</div>
		    			<div id="reserve-cancelAppointmentDesno">
		    				<h1> Appointment Information </h1>
		    				<div id="reserve-appointmentDesnoLevi">
		    					<h2> Doctor </h2>
		    					<input type="text" class="consult-input" v-model="appoDoctor" readonly/>		    					
		    					<h2> Pharmacy Address </h2>
		    					<input type="text" class="consult-input" v-model="appoAddress" readonly/>		    					
		    					<h2> Date </h2>
		    					<input type="text" class="consult-input" v-model="appoDate" readonly/>		    					
		    					<h2> Ending Time </h2>
		    					<input type="text" class="consult-input" v-model="appoEnd" readonly/>
		    				</div>
		    				
		    				<div id="reserve-appointmentDesnoDesni">
								<h2> Pharmacy Name </h2>
		    					<input type="text" class="consult-input" v-model="appoPharmacy" readonly/>		    					
		    					<h2> Price </h2>
		    					<input type="text" class="consult-input" v-model="appoPrice" readonly/>		    					
		    					<h2> Starting Time </h2>
		    					<input type="text" class="consult-input" v-model="appoStart" readonly/>
		    				</div>
		    				<button class="cancel-consultBtn"  type="submit" v-on:click="deleteAppointment()">Cancel Appointment</button>
		    			</div>
			    	</div>
			    	
			    	<div id="reserve-kalendar">
		    			<div id="reserve-kalendarLevo">
		    			
		    			</div>
		    			<div id="reserve-kalendarDesno">
		    			
		    			</div>
			    	</div>
		    	</div>
			</div>    	
`
	,
	
	methods : {
		hideDivs: function()
		{
			document.getElementById("reserve-konsultacija").style.display = "none";
			document.getElementById("reserve-cancelKonsultacija").style.display = "none";
			document.getElementById("reserve-appointment").style.display = "none";
			document.getElementById("reserve-cancelAppointment").style.display = "none";
			document.getElementById("reserve-kalendar").style.display = "none";
			this.currentAppointment = null;
	    	this.currentConsultation = null;
	    	this.appoDoctor = "";
			this.appoAddress = "";
			this.appoDate = "";
			this.appoEnd = "";
			this.appoPharmacy = "";
			this.appoPrice = "";
			this.appoStart = "";
			this.pharmaName= "";
	    	this.pharmacyName= "";
	    	this.pharmacyAddress= "";
	    	this.consultDate= "";
	    	this.consultStartTime= "";
	    	this.consultEndTime= "";
	    	this.consultPrice= "";
			for(let i = 0 ; i < this.pendingConsultations.length; i++)
			{
				this.pendingConsultations[i].selected = false;
			}
			
			let fake = new Object();
			fake.id = -1;
			this.unselectAppointments(fake);
		},
		reserveConsultation: function()
		{
			this.hideDivs();
			document.getElementById("reserve-konsultacija").style.display = "block";
		},
		cancelConsultation: function()
		{
			this.hideDivs();
			document.getElementById("reserve-cancelKonsultacija").style.display = "block";
		},
		reserveAppointment: function()
		{
			this.hideDivs();
			document.getElementById("reserve-appointment").style.display = "block";
		},
		cancelAppointment: function()
		{
			this.hideDivs();
			document.getElementById("reserve-cancelAppointment").style.display = "block";
		},
		viewCalendar: function()
		{
			this.hideDivs();
			document.getElementById("reserve-kalendar").style.display = "block";
		},
		abortRez: function()
		{
			for(let i = 0 ; i < this.pharmacies.length; i++)
			{
				this.pharmacies[i].selected = false;
			}
			this.availablePharmacists = [];	
		},
		rezervisiConsult: function()
		{
			if(this.checkDate != this.date)
			{
				swal("Warning!", "Can't change date ! Try again.", "warning");
				for(let i = 0 ; i < this.pharmacies.length; i++)
				{
				this.pharmacies[i].selected = false;
				}
				this.availablePharmacists = [];	
				return;
			}
			if(this.currentPharmacy == null)
			{
				swal("Warning!", "Choose a Pharmacy !", "warning");
				return;
			}
			if(this.currentApotekar == null)
			{
				swal("Warning!", "Choose a Pharmacist", "warning");
				return;
			}
			let appointment = new Object();
			appointment.startTime = new Date(this.date + " " + this.startTime+":00");
			appointment.endTime = new Date(this.date + " " + this.finishTime+":00");
			appointment.doctorID = this.currentApotekar.id;
			appointment.pharmacyID = this.currentPharmacy.id;
			axios
			.post("/appointment/createConsultation/"+this.email,appointment)
			.then(response => {
				if(response.data)
				{
					swal({
						title: "Success!",
						text: "Successfully Created Consultation!",
						type: "success"
					}).then(function() {
						window.location.reload();
					});
				}
				else
				{
					swal("Warning!", "Can't create Consultation. Try again later !", "warning");
				}
			});

		},
		cancelConsultBtn: function()
		{	
			if(this.currentConsultation == null)
			{
				swal("Warning!", "Choose Consultation to Cancel!", "warning");
				return;
			}
			axios
			.put("/appointment/cancelConsultation/"+this.currentConsultation.consultationID)
			.then(response => {
				if(response.data)
				{
					swal({
						title: "Success!",
						text: "Successfully Canceled Consultation!",
						type: "success"
					}).then(function() {
						window.location.reload();
					});
				}
				else
				{
					swal("Warning!", "Minimum Cancel time is 24 hours!", "warning");
					return;
				}
			});
			
			
		},
		prikaziApoteku: function(pharmacy)
		{
			this.availablePharmacists = [];
			this.currentApotekar = null;
			for(let i = 0 ; i < this.pharmacies.length; i++)
			{
				this.pharmacies[i].selected = false;
			}
			if(this.date == "")
			{
				swal("Warning!", "Choose a Date !", "warning");
				return;
			}
			if(this.startTime == "")
			{
				swal("Warning!", "Choose Start Time !", "warning");
				return;
			}
			if(this.startTime.length != 5 || this.startTime[2] != ":")
			{
				swal("Warning!", "Time format is 'HH:MM' !", "warning");
				return;
			}
			if(this.finishTime == "")
			{
				swal("Warning!", "Choose End Time !", "warning");
				return;
			}
			if(this.finishTime.length != 5 || this.finishTime[2] != ":")
			{
				swal("Warning!", "Time format is 'HH:MM' !", "warning");
				return;
			}
			var today = new Date();
			var Datum = new Date(this.date + " " + this.startTime+":00")

			if(today > Datum)
			{
				swal("Warning!", "Invalid Date. Try today or after !", "warning");
				return;
			}
			pharmacy.selected = true;

			axios
			.get("/pharma/getPharmacyEmployees/"+pharmacy.id)
			.then(response => {
				if(response.data.length == 0)
				{
					for(let i = 0 ; i < this.pharmacies.length; i++)
					{
						this.pharmacies[i].selected = false;
					}
					swal("Warning!", "No Pharmacists in that chosen Pharmacy !", "warning");
					this.currentPharmacy = null;
					return;
				}
				for(let i = 0; i < response.data.length ; i++)
				{
					let pocetnoVreme = new Date(this.date + " " + this.startTime+":00");
					let krajnjeVreme = new Date(this.date + " " + this.finishTime+":00");
					if (isNaN(pocetnoVreme) == true || isNaN(krajnjeVreme) == true)
					{
						for(let i = 0 ; i < this.pharmacies.length; i++)
						{
						this.pharmacies[i].selected = false;
						}
						swal("Warning!", "Invalid Date !", "warning");
						this.currentPharmacy = null;
						return;
					}
					if(pocetnoVreme >= krajnjeVreme)
					{
						for(let i = 0 ; i < this.pharmacies.length; i++)
						{
						this.pharmacies[i].selected = false;
						}
						this.currentPharmacy = null;
						swal("Warning!", "End Time must be after Begin Time !", "warning");
						return;
					}
					let appointment = new Object();
					appointment.startTime = pocetnoVreme;
					appointment.endTime = krajnjeVreme;
					appointment.pharmacyID = pharmacy.id;
					appointment.doctorID = response.data[i].id;

					axios
					.put("/appointment/isPharmacistAvailable",appointment)
					.then(response1 => {
						if(response1.data)
						{
							this.availablePharmacists.push(response.data[i]);
						}
					});

					this.checkDate = this.date;
					this.currentPharmacy = pharmacy;
				}
			});

		},
		prikaziApotekara: function(apotekar)
		{
			for(let i = 0 ; i < this.availablePharmacists.length; i++)
			{
				this.availablePharmacists[i].selected = false;
			}
			apotekar.selected = true;
			this.currentApotekar = apotekar;
		},
		unselectAppointments: function(appointment)
		{
			for(let i = 0 ; i < this.appointments.length; i++)
			{
				if(this.appointments[i].id != appointment.id)
				{
					this.appointments[i].selected = false;
				}
			}
			for(let i = 0 ; i < this.pendingAppointments.length; i++)
			{
				if(this.pendingAppointments[i].id != appointment.id)
				{
					this.pendingAppointments[i].selected = false;
				}
			}
		},
		viewAppointment: function(appointment)
		{	
			this.unselectAppointments(appointment);
			
			appointment.selected = true;
			this.currentAppointment = appointment;
			this.appoDoctor	= appointment.doctor;
			this.appoAddress = appointment.address;
			this.appoDate = appointment.datum;
			this.appoEnd = appointment.krajVremena+"h";
			this.appoPharmacy = appointment.pharmacyName;
			this.appoPrice = appointment.price;
			this.appoStart = appointment.pocetakVremena+"h";
		},
		viewConsultation: function(consultation)
		{
			for(let i = 0 ; i < this.pendingConsultations.length; i++)
			{
				this.pendingConsultations[i].selected = false;
			}
			consultation.selected = true;
			this.currentConsultation = consultation;
			this.pharmaName = consultation.doctor;
			this.pharmacyName = consultation.pharmacyName;
			this.pharmacyAddress = consultation.pharmacyAddress;
			this.consultDate = consultation.date;
			this.consultStartTime = consultation.startTime.substring(11,16) + " h";
			this.consultEndTime = consultation.endTime.substring(11,16) + " h";
		},
		viewConsult: function()
		{

		},
		createAppointment: function()
		{
			axios
			.put("/appointment/reserveAppointment/"+this.email,this.currentAppointment)
			.then(response => {
				let appoIndex = this.appointments.indexOf(this.currentAppointment);
					if (appoIndex > -1) 
					{
						this.appointments.splice(appoIndex, 1);
					}
				swal({
					title: "Success!",
					text: "Appointment Succssfully Reserved! Check price for discounts.",
					type: "success"
				})
				.then(function() {
					
					window.location.reload();
				});
			});
		},
		deleteAppointment: function()
		{
			axios
			.put("/appointment/cancelAppointment/"+this.email,this.currentAppointment)
			.then(response => {
				let isTrue = response.data;
				if(isTrue)
				{
					let appoIndex = this.pendingAppointments.indexOf(this.currentAppointment);
						if (appoIndex > -1) 
						{
						this.pendingAppointments.splice(appoIndex, 1);
						}
					swal({
						title: "Success!",
						text: "Appointment Succssfully Canceled !",
						type: "success"
					}).then(function() {
						window.location.reload();	
					});
				}
				else
				{
					swal("Warning!", "Minimum Cancel time is 24h !", "warning");
					return;
				}
			});
		},
		getAllAppointments: function()
		{
			axios
			.get("/appointment/getFreeAppointments")
			.then(response => {
				this.appointments = response.data;
			});
		},
		getPendingAppointments: function()
		{
			axios
			.get("/appointment/getPendingAppointments/"+this.email)
			.then(response => {
				this.pendingAppointments = response.data;
			});
		},
		getAllPharmacies: function()
		{
			axios
			.get("/pharma/getAllPharmacies")
			.then(response => {
				this.pharmacies = response.data;
			});
		},
		goHome: function()
		{
			this.$router.push("/patientHome")
		},
		getPendingConsultations: function()
		{
			axios
			.get("/appointment/getPendingConsultations/"+this.email)
			.then(response => {
				this.pendingConsultations = response.data;
			});
		},
	},
	
	mounted(){
			let user = JSON.parse(localStorage.getItem('user'))
			this.email = user.email;
			this.getAllPharmacies();
			this.getAllAppointments();
			this.getPendingAppointments();
			this.getPendingConsultations();
		}, 
		components: {
	      	vuejsDatepicker
	    },
	
});