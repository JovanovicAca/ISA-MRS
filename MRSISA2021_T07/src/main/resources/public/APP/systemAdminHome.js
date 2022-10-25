Vue.component("SystemAdminHome", {
    data: function() {
        return {

        }
    },

    template: `
	    <div> 
            <div class="header">
                <a href="" class="welcome">Welcome</a>	
                <div class="header-options">
                </div>
            </div>	
            <div id="emp-home-mainSYS">
	    		<h1 id="emp-home-h1">System Admin</h1>
	    		<div v-on:click="registerAdmin()" class = "sys-home-item">
	    		
				<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/admin.png)">
	    			
	    			</div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>Register new Admin</li>
    				</ul>
	    			</div>
	    		</div >
	    		<div v-on:click="registerDerma()" class = "sys-home-item">
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/dermatologist.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>Register new Dermatologist</li>
    				</ul>
	    			</div>
	    		</div>
	    		<div v-on:click="registerPharmacy()" class = "sys-home-item">
				<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/pharmacy.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">
		    			<ul>
	    					<li>Register new Pharmacy</li>
	    				</ul>
	    			</div>
	    		</div>
	    		<div v-on:click="registerPharmacist()" class = "sys-home-item">
				<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/pharmacist.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">
		    			<ul>
	    					<li>Register new Pharmacist</li>
	    				</ul>
	    			</div>
	    		</div>
	    		<div v-on:click="registerSupplier()" class = "sys-home-item">
				<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/supplier.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">
		    			<ul>
	    					<li>Register new Supplier</li>
	    				</ul>
	    			</div>
	    		</div>
	    		<div v-on:click="addDrug()" class = "sys-home-item">
				<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/drug.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">
		    			<ul>
	    					<li>Add new drugs to the system</li>
	    				</ul>
	    			</div>
	    		</div>
				<div v-on:click="addRank()" class = "sys-home-item">
				<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/crown.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">
		    			<ul>
	    					<li>Add new ranks for loyalty system</li>
	    				</ul>
	    			</div>
	    		</div>
				<div v-on:click="reply()" class = "sys-home-item">
				<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/paper.jpg)">
	    			</div>
	    			<div class= "emp-home-item-c3">
		    			<ul>
	    					<li>Reply to the complaints</li>
	    				</ul>
	    			</div>
	    		</div>
				<div v-on:click="logout()" class = "sys-home-item">
	    		
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/exit.png)"></div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>Logout from the system</li>
    				</ul>
	    			</div>
	    		</div >

	    	</div>		
	    </div>
`,
    methods: {
        registerAdmin: function() {
            this.$router.push("/registerPharmacyAdmin")
        },
        registerDerma: function() {
            this.$router.push("/registerDermatologist")
        },
        registerPharmacist: function() {
            this.$router.push("/registerPharmacist")
        },
        registerSupplier: function() {
            this.$router.push("/registerSupplier")
        },
        registerPharmacy: function() {
            this.$router.push("/registerPharmacy")
        },
		addDrug: function() {
            this.$router.push("/addDrug")
        },
		addRank: function() {
            this.$router.push("/addRank")
        },
		reply: function() {
            this.$router.push("/adminReply")
        },
		logout: function()
        {
        	this.$router.push("/logout")
        }

    }
});