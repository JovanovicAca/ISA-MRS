Vue.component("PharmaAdminHome", {
    data: function() {
        return {

        }
    },

    template: `
		<div> 
		<div id="patient-home-main">
			<h1 id="patient-home-h1">Pharmacy admin</h1>
			<div v-on:click="edit()" class = "patient-home-item">
			
				<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/info.png)"></div>
				<div class= "patient-home-item-c3">
				<ul>
					<li>Keep pharmacy updated</li>
					<li>Edit information</li>
					<li>Reports</li>
				</ul>
				</div>
			</div >
			
			<div v-on:click="add()" class = "patient-home-item">
			
				<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/drug.png)"></div>
				<div class= "patient-home-item-c3">
				<ul>
					<li>Add and edit Drugs</li>
					<li>See all pharmacy drugs</li>
					<li>Make promotion</li>
					<li>Make price list for drugs</li>
					<li>Inquiries</li>
				</ul>
				</div>
			</div >
			
			<div v-on:click="regDerma()" class = "patient-home-item">
			
				<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/dermatologist.png)"></div>
				<div class= "patient-home-item-c3">
				<ul>
					
					<li>Register new Dermatologist</li>
					<li>Register new Pharmacist</li>
					
				</ul>
				</div>
			</div >
			
			<div v-on:click="viewEmployees()" class = "patient-home-item">
			
				<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/search.png)"></div>
				<div class= "patient-home-item-c3">
				<ul>
					<li>Search for Pharmacists</li>
					<li>Search for Dermatologists</li>
					<li>View their grades</li>
				</ul>
				</div>
			</div >
			
			<div v-on:click="newAppointmentDerma()" class = "patient-home-item">
			
				<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/newAppointment.png)"></div>
				<div class= "patient-home-item-c3">
				<ul>
					<li>Make appointment for dermatologist</li>
				</ul>
				</div>
			</div >
	
			<div v-on:click="order()" class = "patient-home-item">
			
				<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/order.png)"></div>
				<div class= "patient-home-item-c3">
				<ul>
					<li>Make order for medications</li>
					<li>All made purchase orders</li>
					<li>Accepting offers</li>
				</ul>
				</div>
			</div >
			
			<div v-on:click="absence()" class = "patient-home-item">
			
				<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/absence.jpg)"></div>
				<div class= "patient-home-item-c3">
				<ul>
					<li>Approve and disapprove absences</li>
				</ul>
				</div>
			</div >

			<div v-on:click="logout()" class = "patient-home-item">
			
				<div class = "patient-home-item-c2" style="background-image: url(RES/IMG/exit.png)"></div>
				<div class= "patient-home-item-c3">
				<ul>
					<li>Logout</li>
				</ul>
				</div>
			</div >
			
		</div>		  
	</div>
`,
    methods: {
        edit: function() {
            this.$router.push("/changePharmacy")
        },
        add: function() {
            this.$router.push("/editDrugsHome")
        },
        regDerma: function() {
            this.$router.push("/registrationDermaPharma")
        },
        viewEmployees: function() {
            this.$router.push("/employeeGrades")
        },
        newAppointmentDerma: function() {
            this.$router.push("/newAppointmentDerma")
        },
        logout: function() {
            this.$router.push("/logout")
        },
        priceList: function() {
            this.$router.push("/priceList")
        },
        order: function() {
            this.$router.push("/orderDrugsHome")
        },
        absence: function() {
            this.$router.push("/absenceApprove")
        }
    },
    beforeMount() {
        this.user = JSON.parse(localStorage.getItem('user'))
        try {
            if (this.user.role != "ADMIN") {
                if (this.user.role === "SUPPLY") {
                    this.$router.push("/supplierHome")
                }
                if (this.user.role === "PATIENT") {
                    this.$router.push("/patientHome")

                }
                if (this.user.role === "PHARMA") {
                    this.$router.push("/employeeHome")
                }
                if (this.user.role === "DERMA") {
                    this.$router.push("/employeeHome")
                }
            } else {
                if (this.user.adminType === "SYSTEM") {
                    console.log('aa')
                    this.$router.push("/systemAdminHome")
                }
            }
        } catch {
            this.$router.push("/")
        }
    },

});