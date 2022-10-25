Vue.component("PatientHome", {
    data: function() {
        return {

        }
    },

    template: `
	    <div> 
	    	<div id="patient-home-main">
	    		<h1 id="patient-home-h1">Welcome</h1>
	    		<div v-on:click="search()" class = "patient-home-item">
	    		
	    			<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/search.png)"></div>
	    			<div class= "patient-home-item-c3">
	    			<ul>
    					<li>Search Pharmacies</li>
    					<li>View Pharmacy Information</li>
    				</ul>
	    			</div>
	    		</div >
	    		
	    		<div v-on:click="reserve()" class = "patient-home-item">
	    		
	    			<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/appointment.png)"></div>
	    			<div class= "patient-home-item-c3">
	    			<ul>
    					<li>Reserve Consultations</li>
    					<li>Cancel Consultations</li>
    					<li>Reserve Appointments</li>
    					<li>Cancel Appointments</li>
    					<li>View Calendar</li>
    				</ul>
	    			</div>
	    		</div >
	    		
	    		<div v-on:click="medication()" class = "patient-home-item">
	    		
	    			<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/drug.png)"></div>
	    			<div class= "patient-home-item-c3">
	    			<ul>
    					<li>Search for Medication</li>
    					<li>Reserve Medication</li>
    					<li>Shipment Information</li>
    					<li>Specify Allergies</li>
    				</ul>
	    			</div>
	    		</div >
	    		
	    		<div v-on:click="subscribe()" class = "patient-home-item">
	    		
	    			<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/subscription.png)"></div>
	    			<div class= "patient-home-item-c3">
	    			<ul>
    					<li>Subscribe to pharmacy offers</li>
    				</ul>
	    			</div>
	    		</div >
	    		
	    		<div v-on:click="patientHistory()" class = "patient-home-item">
	    		
	    			<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/history.png)"></div>
	    			<div class= "patient-home-item-c3">
	    			<ul>
    					<li>Consultation History</li>
    					<li>Appointment History</li>
    					<li>Drug Purchase History </li>
    				</ul>
	    			</div>
	    		</div >
	    		
	    		<div v-on:click="viewProfile()" class = "patient-home-item">
	    		
	    			<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/info.png)"></div>
	    			<div class= "patient-home-item-c3">
	    			<ul>
    					<li>View/Edit Information</li>
    					<li>View Loyalty Status</li>
    					<li>View Penalty Status</li>
    					<li>Change password</li>
    				</ul>
	    			</div>
	    		</div >
	    		
	    		
	    		<div v-on:click="rating()" class = "patient-home-item">
	    		
	    			<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/rating.png)"></div>
	    			<div class= "patient-home-item-c3">
	    			<ul>
    					<li>Rate Employees</li>
    					<li>Rate Pharmacy</li>
    					<li>Rate Drugs</li>
    					<li>Write Complaint</li>
						<li>Upload QR</li>
    				</ul>
	    			</div>
	    		</div >
	    		
				<div v-on:click="logout()" class = "patient-home-item">
	    		
	    			<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/exit.png)"></div>
	    			<div class= "patient-home-item-c3">
	    			<ul>
    					<li>Logout from the system</li>
    				</ul>
	    			</div>
	    		</div >
	    		
	    	</div>		  
	    </div>
`,
    methods: {
    	viewProfile: function()
    	{
    		this.$router.push("/viewProfile")
    	},
    	medication: function()
    	{
    		this.$router.push("/patientMedication")
    	},
        search: function() 
        {
            this.$router.push("/pharmacySearch")
        },
        rating: function()
        {
        	this.$router.push("/rateEmployee")
        },
        specifyAllergies: function()
        {
        	this.$router.push("/specifyAllergies")
        },
		patientHistory: function()
		{
			this.$router.push("/patientHistory")
		},
        cancel: function()
        {
        	this.$router.push("/cancelConsultation")
        },
        reserve: function()
        {
        	this.$router.push("/reservePharmacist")
        },
		subscribe: function()
        {
        	this.$router.push("/subscribe")
        },
		logout: function()
        {
        	this.$router.push("/logout")
        }
    }
});