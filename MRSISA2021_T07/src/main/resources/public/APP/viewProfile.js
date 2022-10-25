Vue.component("ViewProfile", {
    data: function() {
        return {
        	name: "",
        	address: "",
        	email: "",
        	city: "",
        	country: "",
        	phone: "",
        	user : null,
        	password: "",
        	newPassword : "",
        	verifyPassword: "",
        }
    },

    template: `
	    <div id="vp-main">
	    <link rel="stylesheet" href="CSS/viewProfile.css" type="text/css"> 
    		<div id="vp-levi">
    			<div id="vp-profil">
    				<div id="vp-profileImg" style="background-image: url(RES/IMG/profile.png)"></div>
    				<h1 id="vp-name">Ime Prezime</h1>
    			</div>
    			<div id="vp-opcije">
    				<button class="vp-profileBtn"  type="submit" v-on:click="editProfile()">Edit Profile</button>
    				<button class="vp-statusBtn"  type="submit" v-on:click="viewStatus()">View Loyalty Status</button>
    				<button class="vp-passBtn"  type="submit" v-on:click="changePassword()">Change Password</button>
					<button class="vp-subBtn"  type="submit" v-on:click="checkSubs()">Subscribed Pharmacies</button>
    				<button class="vp-homeBtn"  type="submit" v-on:click="goHome()">Home Page</button>
    			</div>
    		</div>
    		<div id="vp-desni">
    			<div id="vp-profil-info">
    				<h1 id="vp-glavniNaslov"> Edit Profile </h1>
    				<div id="vp-profil-info-levi">
    					<h2 id="vp-naslov">Ime Prezime </h2>
	    				<input type="text" id="vp-infoBar" v-model="name" />
	    				
	    				<h2 id="vp-adresa">Adresa </h2>
	    				<input type="text" id="vp-infoBar" v-model="address" />
	    				
	    				<h2 id="vp-mejl">Email </h2>
	    				<input type="text" id="vp-infoBar" v-model="email" readonly/>
    				</div>
    				<div id="vp-profil-info-desni">
    					<h2 id="vp-grad">Grad </h2>
	    				<input type="text" id="vp-infoBar" v-model="city" />
	    				
	    				<h2 id="vp-drzava">Drzava </h2>
	    				<input type="text" id="vp-infoBar" v-model="country" />
	    				
	    				<h2 id="vp-fon">Broj Telefona </h2>
	    				<input type="text" id="vp-infoBar" v-model="phone" readonly/>
    				</div>
    				<button class="vp-applyBtn"  type="submit" v-on:click="applyChanges()">Apply Changes</button>
    				<button class="vp-cancelBtn"  type="submit" v-on:click="cancelChanges()">Cancel</button>
				</div>
    		</div>
    		<div id="vp-sifra">
    			<h1> Change Password </h1>
    			
    			<h2 id="vp-stariPass">Old Password </h2>
				<input type="password" id="vp-infoBar" class="vp-stariPass" v-model="password" readonly/>
				
				<h2 id="vp-noviPass">New Password </h2>
				<input type="password" id="vp-infoBar" class="vp-noviPass" v-model="newPassword" />
				
				<h2 id="vp-proveraPass">Repeat New Password </h2>
				<input type="password" id="vp-infoBar" class="vp-proferaPass" v-model="verifyPassword" />
				
				<button class="vp-changeBtn"  type="submit" v-on:click="changePasswordFun()">Change Password</button>
    		</div>
	    </div>
`,

    methods: {
    	editProfile: function()
        {
    		document.getElementById("vp-desni").style.display = 'block';
    		document.getElementById("vp-sifra").style.display = 'none';
        },
		checkSubs: function()
        {
    		this.$router.push("/patientSubscriptions")
        },
        changePassword: function()
        {
        	document.getElementById("vp-desni").style.display = 'none';
    		document.getElementById("vp-sifra").style.display = 'block';
        },
        viewStatus: function()
        {
        	document.getElementById("vp-desni").style.display = 'none';
    		document.getElementById("vp-sifra").style.display = 'none';
        },
        changePasswordFun: function()
        {
        	if(this.password === this.newPassword)
    		{
        		swal("Warning!", "New and Old password must be the same !", "warning");
        		return;
    		}
        	if(this.newPassword != this.verifyPassword)
    		{
        		swal("Warning!", "New Passwords must match !", "warning");
        		return;
    		}
        	if(this.newPassword.length < 6)
        	{
        		swal("Warning!", "Password must have at least 6 characters !", "warning");
        		return;
        	}
        	let info = new Object();
        	info.email = this.email;
        	info.password = this.newPassword;
        	axios
			.put("/PATIENT/changePassword",info)
			.then(response => {
				swal({
					title: "Success!",
					text: "Password Succssfully Changed !",
					type: "success"
				}).then(function() {
					window.location.reload();	
				});
			});
        },
        applyChanges: function()
        {
        	let info = new Object();
        	info.name = this.name;
        	info.address = this.address;
        	info.city = this.city;
        	info.country = this.country;
        	info.email = this.email;
        	axios
			.put("/PATIENT/updatePatient",info)
			.then(response => {
				document.getElementById("vp-name").innerHTML = info.name;
				swal({
					title: "Success!",
					text: "Patient Successfully Updated !",
					type: "success"
				}).then(function() {
					window.location.reload();	
				});
			});
        },
        cancelChanges: function()
        {
        	this.getData();
        },
        getData: function()
        {
        	axios
			.get("/PATIENT/getPatients")
			.then(response => {
				let allPatients = response.data;
				for(let i = 0; i < allPatients.length ; i++)
				{
					if(allPatients[i].email === this.email)
					{
						this.name = allPatients[i].name + " " + allPatients[i].surname;
						this.email = allPatients[i].email;
						this.address = allPatients[i].address;
						this.city = allPatients[i].city;
						this.country = allPatients[i].country;
						this.phone = "+381 " + allPatients[i].number;
						this.password = allPatients[i].password;
						document.getElementById("vp-name").innerHTML = this.name;
					}
				}
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
			this.getData();
		},
});